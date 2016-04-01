import {Client} from 'elasticsearch';

import Rx from 'rx';
import config from '../config';

/** Elasticsearch client **/
const es = new Client({
  host: config.es.host,
  log: config.es.log
});

export function search(searchKeyword) {
  return Rx.Observable.fromPromise(es.search({
      index: 'pulseactive',
      type : 'events',
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
