import fs from 'fs';
import csv from 'fast-csv';
import process from 'process';

import {Client} from 'elasticsearch';
import Rx from 'rx';

const stream = fs.createReadStream('./files/data.csv');

/** Elasticsearch client **/
const es = new Client({
  host: 'http://pu1se.work:9200/',
  log: 'debug'
});

/** check if we have indices, otherwise, create new **/

const indexIsReady = new Rx.AsyncSubject();

Rx.Observable.fromPromise(es.indices.exists({index: 'pulseactive'}))
  .filter(exists => exists)
  .doOnNext(console.log('Creating index'))
  .flatMap(() => Rx.Observable.fromPromise(es.indices.create({
    index: 'pulseactive',
    mappings: {
      'events': {
        properties: {
          'registrationDate': {type: 'date', format: 'yyyy-M-d'},
          'birthDate': {type: 'date', format: 'yyyy-M-d'}
        }
      }
    }
  })))
  .subscribe(
    undefined,
    err  => console.log(err.stack),
    () => {
      indexIsReady.onNext(true);
      indexIsReady.onCompleted();
    }
  );

/** Insert / update functionalities **/
const importRegistration = (id, _event) => {
  console.log(_event);
  indexIsReady.flatMapLatest(es.create({
      index  : 'pulseactive',
      type   : 'events',
      id     : id,
      body   : _event
    }))
    .subscribe(
      resp => console.log(resp),
      err  => console.log(err)
    );
}

/** Actual import **/
let dockingRegistrationNumber = '';
const csvStreamer = csv()
 .on("data", function(data){
    const [_index, eventName, regDate, regMonth, regYear,
      regId,
      lastName, middleName, firstName, birthDate, birthMonth, birthYear, gender,
      tShirt, nationality, district, phone, email,
      regFee, regChannel
    ] = data;

    const id = `${lastName}-${middleName}-${firstName}:${birthYear}${birthMonth}${birthDate}`;

    let effectiveRegNo;
    if (regId !== '') {
      dockingRegistrationNumber = regId;
      effectiveRegNo = regId;
    } else {
      effectiveRegNo = dockingRegistrationNumber;
    }

    const eventId = `${id}-${eventName}-${regYear}${regMonth}${regDate}`;

    const customer = {
      name: `${lastName} ${middleName === '' ? '' : middleName + ' '}${firstName}`,
      birthDate: `${birthYear}-${birthMonth}-${birthDate}`,
      gender,
      nationality, district, phone, email
    };

    const eventObj = {
      id: eventId,
      registrationNumber: effectiveRegNo,
      eventName, tShirt, regFee, regChannel,
      registrationDate: `${regYear}-${regMonth}-${regDate}`
    };

    importRegistration(eventId, Object.assign({}, customer, eventObj));
 })
 .on("end", function() {
  //  stream.close();
   console.log("done");
  //  process.exit();
 });

stream.pipe(csvStreamer);
