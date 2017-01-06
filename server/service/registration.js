import Rx from 'rx';
import _ from 'lodash';
import es from './es';
import { orderCollection } from './orderService';

export function search(searchKeyword) {
  return Rx.Observable.fromPromise(es.search({
      index: 'pulseactive',
      type : 'events',
      size : 50,
      // sort: [
      //   // {"pickedUp": {"missing": "_first"}},
      //   "name"
      // ],
      body: {
        "query" : {
          "query_string": {
            "default_operator": "AND",
            "query": searchKeyword
          }
        }
      }
    }))
    .map(original => original.hits.hits.map(result => result._source))
    .doOnNext(hits => {
      _.forEach(hits, hit => {
        if (hit.orderId) {
          hit.order = orderCollection().findOne({orderId: hit.orderId});
        }
      })
    })
    .doOnError(console.log);
}

export function update(ids, content) {
  const updatedArray = _.map(ids, id => {
    return [
      { update: {'_index': 'pulseactive', '_type': 'events', _id: id} },
      { doc: content }
    ]
  });

  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray),
      fields: ['id', 'tShirt', 'orderId']
    }));
}

export function removeField(ids, field) {
  const updatedArray = _.map(ids, id => {
    return [
      { update: {'_index': 'pulseactive', '_type': 'events', _id: id} },
      { script: `ctx._source.remove("${field}")` }
    ]
  });

  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray),
      fields: ['id', 'tShirt', 'orderId']
    }));
}

export function checked(ids, orderId, actor) {
  const updatedArray = _.map(ids, id => {
    return [
      { update: {'_index': 'pulseactive', '_type': 'events', _id: id} },
      { doc: {
        checked: true,
        checkedBy: actor,
        orderId: orderId
      }}
    ]
  });

  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray),
      fields: ['id', 'tShirt', 'orderId']
    }));
}
