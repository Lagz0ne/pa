import Rx from 'rx';
import _ from 'lodash';
import es from './es';

export function search(searchKeyword) {
  return Rx.Observable.fromPromise(es.search({
      index: 'pulseactive',
      type : 'events',
      size : 50,
      sort: [
        // {"pickedUp": {"missing": "_first"}},
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

  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray)
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


export function addOrder(ids, orderId) {
  const updatedArray = _.map(ids, id => {
    return [
      { update: {'_index': 'pulseactive', '_type': 'events', _id: id} },
      { doc: { orderId: orderId }}
    ]
  });

  return Rx.Observable.fromPromise(es.bulk({
      body: _.flattenDeep(updatedArray),
      fields: ['id', 'tShirt']
    }));
}
