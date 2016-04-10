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

export function packed(orderId) {
  const order = orders().find({orderId})[0];
  order.packed = true;
  order.packedAt = new Date().getTime();
  orders().update(order);
}

export function packedAndTakeNext(orderId) {
  packed(orderId);
  return getNextPackingOrder();
}

export function picked(orderId) {
  const order = orders().find({orderId})[0];
  order.picked = true;
  order.pickedAt = new Date().getTime();
  orders().update(order);
}

export function getNextPackingOrder() {
  return orders()
    .chain()
    .find({
      '$and': [
        {checked: true},
        {packed: false},
        {picked: false}
      ]})
    .simplesort('checkedAt')
    .data()[0] || {};
}

export function getNextPickingOrder() {
  return orders()
    .chain()
    .find({
      '$and': [
        {checked: true},
        {packed: true},
        {picked: false}
      ]})
    .simplesort('packedAt')
    .data()[0] || {};
}

export function pickedAndTakeNext(orderId) {
  picked(orderId);
  return getNextPickingOrder();
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
        S: 0, M: 0, L: 0, XL: 0, XXL: 0,
        checked: false,
        packed: false,
        picked: false
      }

      _.forEach(result, item => {
        order[item.tShirt] += 1;
      });

      return order;
    })
    .map(order => {
      order.checked = true;
      order.checkedAt = new Date().getTime();
      orders().insert(order);
      return {
        order,
        nextOrderId: affinity + nextToken(affinity)
      }
    })
    .doOnError(console.log);
}
