import fs from 'fs';
import csv from 'fast-csv';
import process from 'process';

import {Client} from 'elasticsearch';
import Rx from 'rx';
import fecha from 'fecha';
import _ from 'lodash';

import r from 'random-js';
const random = r();

import Diacritics from 'diacritic';

import config from '../server/config';

const stream = fs.createReadStream(config.import.file, {encoding: 'utf8'});
stream.setEncoding('UTF8');

console.log("Importing from " + config.import.file);

/** Elasticsearch client **/
const es = new Client({
  host: config.import.host,
  log: config.import.log
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
          'birthDate': {type: 'date', format: 'yyyy-MM-dd'}
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
  .bufferWithCount(1000)
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

}

const convertDate = (_date) => {
  try {
    const convertedDate = fecha.parse(_date, 'YYYY-M-D');
    return fecha.format(convertedDate, 'YYYY-MM-DD');
  } catch(e) {
    return "1900-01-01";
  }
}

/** Actual import **/
let dockingRegistrationNumber = '';
const csvStreamer = csv()
  .on("data", function(data) {
    const [_index, eventName, regDate, regMonth, regYear, regChannel,
      regId,
      type,
      bib,
      lastName, middleName, firstName,
      //wholeBirthDate,
      birthDate, birthMonth, birthYear, gender,
      tShirt, nationality, country, countryCode, phone, email
    ] = data;

    if (regDate == "0" || _.isEmpty(regDate)) return;

    const convertedRegistrationDate = convertDate(`${regYear}-${regMonth}-${regDate}`);
    const convertedBirthDate = convertDate(`${birthYear}-${birthMonth}-${birthDate}`);

    const _type = _.lowerCase(type) === 'extra' ? 's kit' : _.lowerCase(type);
    const _lastName = _.trim(lastName) === '' ? 'UNKNOWN' + random.string(4) : _.capitalize(Diacritics.clean(lastName));
    const _middleName = _.trim(middleName) === '' ? '' : _.capitalize(Diacritics.clean(middleName));
    const _firstName = _.trim(firstName) === '' ? 'UNKNOWN' + random.string(4) : _.capitalize(Diacritics.clean(firstName));
    const _tShirt = tShirt === '' ? 'UNKNOWN' : _.upperCase(tShirt);

    const id = `${_lastName}-${_middleName}-${_firstName}:${convertedBirthDate}-${random.string(2)}`;

    let effectiveRegNo;
    if (regId !== '') {
      dockingRegistrationNumber = regId;
      effectiveRegNo = regId;
    } else {
      effectiveRegNo = dockingRegistrationNumber;
    }

    const eventId = `${id}-${eventName}-${effectiveRegNo}`;
    if (_tShirt === 'UNKNOWN') console.log("EEEEEEEEEEEE there's an unknown T-shirt " + eventId);

    const customer = {
      name: `${lastName} ${middleName === '' ? '' : middleName + ' '}${firstName}`,
      cleanedName: `${_lastName} ${_middleName === '' ? '' : _middleName + ' '}${_firstName}`,
      birthDate: convertedBirthDate,
      gender,
      nationality, phone, email, bib
    };

    const eventObj = {
      id: eventId,
      type: _type,
      registrationNumber: `G${effectiveRegNo}`,
      eventName,
      tShirt: _tShirt, regChannel,
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
