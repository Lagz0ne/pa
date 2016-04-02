import {Client} from 'elasticsearch';

import Rx from 'rx';
import config from '../config';

import _ from 'lodash';

/** Elasticsearch client **/
const es = new Client({
  host: config.es.host,
  log: config.es.log
});

export function search(searchKeyword) {
  return Rx.Observable.fromPromise(es.search({
      index: 'pulseactive',
      type : 'events',
      size : 20,
      sort: [
        "pickedUp",
        "name"
      ],
      body: {
        "query" : {
          "query_string": {
            "default_operator": "AND",
            "query": searchKeyword
          }
        }
      }
    }))
    .map(original => original.hits.hits.map(result => result._source));
}

export function pickup(id) {
  return Rx.Observable.fromPromise(es.update({
      index: 'pulseactive',
      type : 'events',
      id   : id,
      body : {
        doc: {
          pickedUp: true
        }
      }
    }));
}

export function pickupAll(ids) {
  const updatedArray = _.map(ids, id => {
    return [
      { update: {'_index': 'pulseactive', '_type': 'events', _id: id} },
      { doc: { pickedUp: true }}
    ]
  });
  console.log(_.flattenDeep(updatedArray));
  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray)
    }));
}
