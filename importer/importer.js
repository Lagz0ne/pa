import fs from 'fs';
import csv from 'fast-csv';
import process from 'process';

import {Client} from 'elasticsearch';
import Rx from 'rx';
import fecha from 'fecha';
import _ from 'lodash';

const stream = fs.createReadStream('./files/data.csv');

/** Elasticsearch client **/
const es = new Client({
  host: 'http://e.pu1se.work:9200/',
  log: 'debug'
});

/** check if we have indices, otherwise, create new **/

const indexIsReady = new Rx.AsyncSubject();

Rx.Observable.fromPromise(es.indices.exists({index: 'pulseactive'}))
  .filter(exists => !exists)
  .doOnNext(console.log('Creating index'))
  .flatMap(() => Rx.Observable.fromPromise(es.indices.create({
    index: 'pulseactive',
    mappings: {
      'events': {
        properties: {
          'registrationDate': {type: 'date', format: 'yyyy-MM-dd'},
          'birthDate': {type: 'date', format: 'yyyy-MM-dd'},
          'pickedUp': {type: 'boolean'}
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
let dockingGroupNumber = '';
let dockingGroupArray = [];

const batchStream = new Rx.Subject();
batchStream
  .map(persons => {
    if (persons.length === 1) {
      return persons;
    } else {
      return persons.map(person => Object.assign({}, person, {isInGroup: true}));
    }
  })
  .bufferWithCount(10)
  .doOnNext(() => console.log('Every ten'))
  .flatMap(bufferedGroups => {
    const flattened = _.flattenDeep(bufferedGroups);
    const indexList = _.reduce(flattened, (acc, person) => {
      acc.push({
        index: {
          _index: 'pulseactive', _type: 'events', _id: person.id
        }
      });
      acc.push(person);
      return acc;
    }, []);
    return Rx.Observable.just(indexList);
  })
  .subscribe(next => {
    es.bulk({body: next});
  });

const importRegistration = (_event) => {

  if (_event.registrationNumber === dockingGroupNumber) {
    dockingGroupArray.push(_event);
  } else if (dockingGroupNumber === '') { // First entry
    dockingGroupNumber = _event.registrationNumber;
    dockingGroupArray.push(_event);
  } else {
    dockingGroupNumber = _event.registrationNumber;
    batchStream.onNext(dockingGroupArray); // Late submission

    dockingGroupArray = [];
    dockingGroupArray.push(_event);
  }

  if (!!!_event.registrationNumber) {
    dockingGroupArray = [];
  }
  // indexIsReady.flatMapLatest(es.create({
  //     index  : 'pulseactive',
  //     type   : 'events',
  //     id     : id,
  //     body   : _event
  //   }))
  //   .subscribe(
  //     resp => console.log(resp),
  //     err  => console.log(err)
  //   );
}

const convertDate = (_date) => {
  const convertedDate = fecha.parse(_date, 'YYYY-M-D');
  return fecha.format(convertedDate, 'YYYY-MM-DD');
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

    const convertedRegistrationDate = convertDate(`${regYear}-${regMonth}-${regDate}`);
    const convertedBirthDate = convertDate(`${birthYear}-${birthMonth}-${birthDate}`);

    const id = `${lastName}-${middleName}-${firstName}:${convertedBirthDate}`;

    let effectiveRegNo;
    if (regId !== '') {
      dockingRegistrationNumber = regId;
      effectiveRegNo = regId;
    } else {
      effectiveRegNo = dockingRegistrationNumber;
    }

    const eventId = `${id}-${eventName}-${convertedRegistrationDate}`;

    const customer = {
      name: `${lastName} ${middleName === '' ? '' : middleName + ' '}${firstName}`,
      birthDate: convertedBirthDate,
      gender,
      nationality, district, phone, email
    };

    const eventObj = {
      id: eventId,
      registrationNumber: effectiveRegNo,
      eventName, tShirt, regFee, regChannel,
      registrationDate: convertedRegistrationDate
    };

    importRegistration(Object.assign({}, customer, eventObj));
 })
 .on("end", function() {
  // Make sure the last one got called as well
  batchStream.onNext(dockingGroupArray);
  batchStream.onCompleted();
  console.log("done");
  //  process.exit();
 });

stream.pipe(csvStreamer);
