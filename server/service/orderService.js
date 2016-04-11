import * as registrationStore from './registration';

import Rx from 'rx';
import lokiDB from 'lokijs';
import _ from 'lodash';
import config from '../config';

const loadHandler = (result) => {
  const orderStats = orderDB.getCollection('stats');
  if (orderStats == null) {
    console.log("Adding stats");
    orderDB.addCollection('stats');
    orderDB.getCollection('stats').insert({stat: true});
  }

  const orders = orderDB.getCollection('orders');
  if (orders == null) {
    console.log("Adding orders");
    orderDB.addCollection('orders');
  }
}

const orderDB = new lokiDB(config.loki.orders, {
  autosave: true,
  autoload: true,
  autoloadCallback: loadHandler
});

const orderStats = () => orderDB.getCollection('stats');
const orders = () => orderDB.getCollection('orders');

export const orderCollection = orders;

const getNextToken = (affinity) => {
  const stat = orderStats().find()[0];
  const currentToken = stat[affinity] || 0;
  const token = currentToken + 1;
  return token;
}

const nextToken = (affinity) => {
  const stat = orderStats().find()[0];
  const token = getNextToken(affinity);
  stat[affinity] = token;
  orderStats().update(stat);

  return token;
}

export function getOpenningOrders(user) {
  return orders()
    .chain()
    .find()
    // .find({picked: false})
    .simplesort('checkedAt')
    .data();
}

export function getCheckingOutOrders() {
  return orders()
    .chain()
    .find({
      '$and': [
        { isPickingBy: {'$ne': ''} },
        { picked: false }
      ]
    })
    .simplesort('packedAt')
    .data();
}


export function packed(orderId, user) {
  const order = orders().find({orderId})[0];
  order.packed = true;
  order.packedAt = new Date().getTime();
  order.packedBy = user.displayname;
  orders().update(order);
  return order;
}

export function packedAndTakeNext(orderId, user) {
  packed(orderId, user);
  return getNextPackingOrder(user);
}

export function picked(orderId, user) {
  const order = orders().find({orderId})[0];
  order.picked = true;
  order.pickedAt = new Date().getTime();
  order.pickedBy = user.displayname;
  orders().update(order);
  return order;
}

export function pickedAndTakeNext(orderId, user) {
  picked(orderId, user);
  return getNextPickingOrder(user);
}

export function getNextPackingOrder(user) {
  const nextOrder = orders()
    .chain()
    .find({
      '$and': [
        {checked: true},
        {packed: false},
        {picked: false},
        {
          '$or': [
            {isPackingBy: ''},
            {isPackingBy: user.displayname}
          ]
        }
      ]})
    .simplesort('checkedAt')
    .data()[0];
  if (!nextOrder) {
    return {};
  } else {
    nextOrder.isPackingBy = user.displayname;
    orders().update(nextOrder);
    return nextOrder;
  }
}

export function getNextPickingOrder(user) {
  const nextOrder = orders()
    .chain()
    .find({
      '$and': [
        {checked: true},
        {packed: true},
        {picked: false},
        {
          '$or': [
            {isPickingBy: ''},
            {isPickingBy: user.displayname}
          ]
        }
      ]})
    .simplesort('packedAt')
    .data()[0];

  if (!nextOrder) {
    return {};
  } else {
    nextOrder.isPickingBy = user.displayname;
    orders().update(nextOrder);
    return nextOrder;
  }
}

/** Reset an order **/
export const resetOrder = (type, orderId, user) => {
  const currentOrder = orders().findOne({orderId});
  if (type === 'packing' || type === 'checkout') {
    currentOrder.picked = false;
    currentOrder.isPickingBy = '';
    currentOrder.pickedBy = '';
    currentOrder.pickedAt = '';

    if (type === 'packing') {
      currentOrder.packed = false;
      currentOrder.isPackingBy = '';
      currentOrder.packedBy = '';
      currentOrder.packedAt = '';
    }

    orders().update(currentOrder);
    return Rx.Observable.just(orderId);
  } else if (type === 'checkin'){
    const ids = currentOrder.ids;
    orders().remove(currentOrder);
    return registrationStore.removeField(ids, "orderId");
  }


}

/** Return order **/
export const createOrderAndCheck = (affinity, ids, actor) => {
  const orderId = affinity + nextToken(affinity);

  return registrationStore
    .checked(ids, orderId, actor)
    .map(updated => {
      const result = _.map(updated.items, item => item.update.get.fields);
      const order = {
        orderId,
        ids,
        S: 0, M: 0, L: 0, XL: 0, XXL: 0,
        checked: false,
        checkedBy: '',
        checkedAt: '',
        packed: false,
        isPackingBy: '',
        packedBy: '',
        packedAt: '',
        picked: false,
        isPickingBy: '',
        pickedBy: '',
        pickedAt: ''
      }

      _.forEach(result, item => {
        order[item.tShirt] += 1;
      });

      return order;
    })
    .map(order => {
      order.checked = true;
      order.checkedAt = new Date().getTime();
      order.checkedBy = actor.displayname;
      orders().insert(order);
      return { order }
    })
    .doOnError(console.log);
}
