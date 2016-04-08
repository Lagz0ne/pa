import request from 'superagent';

import * as globalActions from './globalActions';
import * as eventActions from './eventActions';

const serverUrl = '';
const orderUrl = `${serverUrl}/order`;

const ACTIONS = {
  ADD_TO_ORDER: 'ADD_TO_ORDER',
  REMOVE_FROM_ORDER: 'REMOVE_FROM_ORDER',
  CLEAR_PREVIOUS_ORDER: 'CLEAR_PREVIOUS_ORDER',

  CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_REQUEST_SUCCESS: 'CREATE_ORDER_REQUEST_SUCCESS',
  CREATE_ORDER_REQUEST_FAILURE: 'CREATE_ORDER_REQUEST_FAILURE',

  NEXT_PACK_REQUEST: 'NEXT_PACK_REQUEST',
  NEXT_PACK_REQUEST_SUCCESS: 'NEXT_PACK_REQUEST_SUCCESS',
  NEXT_PACK_REQUEST_FAILURE: 'NEXT_PACK_REQUEST_FAILURE',

  PACKED_REQUEST: 'PACKED_REQUEST',
  PACKED_REQUEST_SUCCESS: 'PACKED_REQUEST_SUCCESS',
  PACKED_REQUEST_FAILURE: 'PACKED_REQUEST_FAILURE',

  NEXT_PICK_REQUEST: 'NEXT_PICK_REQUEST',
  NEXT_PICK_REQUEST_SUCCESS: 'NEXT_PICK_REQUEST_SUCCESS',
  NEXT_PICK_REQUEST_FAILURE: 'NEXT_PICK_REQUEST_FAILURE',

  PACKED_AND_TAKE_NEXT_REQUEST: 'PACKED_AND_TAKE_NEXT_REQUEST',
  PACKED_AND_TAKE_NEXT_REQUEST_SUCCESS: 'PACKED_AND_TAKE_NEXT_REQUEST_SUCCESS',
  PACKED_AND_TAKE_NEXT_REQUEST_FAILURE: 'PACKED_AND_TAKE_NEXT_REQUEST_FAILURE',

  PICKED_AND_TAKE_NEXT_REQUEST: 'PICKED_AND_TAKE_NEXT_REQUEST',
  PICKED_AND_TAKE_NEXT_REQUEST_SUCCESS: 'PICKED_AND_TAKE_NEXT_REQUEST_SUCCESS',
  PICKED_AND_TAKE_NEXT_REQUEST_FAILURE: 'PICKED_AND_TAKE_NEXT_REQUEST_FAILURE'
}

/** Add to order **/
export function addToOrder(registration) {
  return {
    type: ACTIONS.ADD_TO_ORDER,
    registration
  }
}

export function removeFromOrder(registration) {
  return {
    type: ACTIONS.REMOVE_FROM_ORDER,
    registration
  }
}

export function clearPreviousOrder() {
  return {
    type: ACTIONS.CLEAR_PREVIOUS_ORDER
  }
}

/** order and check **/
export function createOrderRequest(affinity, ids) {
  return {
    type: ACTIONS.CREATE_ORDER_REQUEST,
    ids,
    affinity
  }
}

export function createOrderRequestSuccess(order) {
  return {
    type: ACTIONS.CREATE_ORDER_REQUEST_SUCCESS,
    order
  }
}

export function createOrderRequestFailure(affinity, ids) {
  return {
    type: ACTIONS.CREATE_ORDER_REQUEST_FAILURE,
    ids,
    affinity
  }
}

export function createOrder(affinity, ids) {
  return dispatch => {
    dispatch(createOrderRequest(affinity, ids));
    return request
      .post(`${orderUrl}/`)
      .send({
        affinity,
        ids
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(createOrderRequestFailure(err, affinity, ids));
        } else {
          const result = res.body;
          dispatch(globalActions.announce(`Order is saved successfully as order ${result.order.orderId}`));
          dispatch(createOrderRequestSuccess(res.body));

          // Reset page
          dispatch(globalActions.persistSearchForm(''));
          dispatch(eventActions.clearSearchResult());
        }
      });
  };
}

/** pack **/
export function packed(orderId) {
  return dispatch => {
    dispatch(packedRequest());
    return request
      .post(`${orderUrl}/packed`)
      .send({orderId})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(packedRequestFailure(err));
        } else {
          dispatch(packedRequestSuccess(res.body));
          dispatch(globalActions.announce(`Order ${orderId} is packed`));
        }
      });
  };
}

function packedRequest() {
  return {
    type: ACTIONS.PACKED_REQUEST
  }
}

function packedRequestSuccess(order) {
  return {
    type: ACTIONS.PACKED_REQUEST_SUCCESS,
    order
  }
}

function packedRequestFailure(err) {
  return {
    type: ACTIONS.PACKED_REQUEST_FAILURE,
    error: err
  }
}

/** Next pack **/
export function getNextPackOrder() {
  return dispatch => {
    dispatch(getNextPackOrderRequest());
    return request
      .get(`${orderUrl}/next/pack`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(getNextPackOrderRequestFailure(err));
        } else {
          dispatch(getNextPackOrderRequestSuccess(res.body));
          if (_.isEmpty(res.body)) {
            dispatch(globalActions.announce(`No order is ready to pack at the moment`));
          }
        }
      });
  };
}

function getNextPackOrderRequest() {
  return {
    type: ACTIONS.NEXT_PACK_REQUEST
  }
}

function getNextPackOrderRequestSuccess(order) {
  return {
    type: ACTIONS.NEXT_PACK_REQUEST_SUCCESS,
    order
  }
}

function getNextPackOrderRequestFailure(err) {
  return {
    type: ACTIONS.NEXT_PACK_REQUEST_FAILURE,
    error: err
  }
}
/** Picked **/
export function picked(orderId) {
  return dispatch => {
    dispatch(pickedRequest());
    return request
      .post(`${orderUrl}/picked`)
      .send({orderId})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(pickedRequestFailure(err));
        } else {
          dispatch(pickedRequestSuccess(res.body));
          dispatch(globalActions.announce(`Order ${orderId} is picked`));
        }
      });
  };
}

function pickedRequest() {
  return {
    type: ACTIONS.PICKED_REQUEST
  }
}

function pickedRequestSuccess(order) {
  return {
    type: ACTIONS.PICKED_REQUEST_SUCCESS,
    order
  }
}

function pickedRequestFailure(err) {
  return {
    type: ACTIONS.PICKED_REQUEST_FAILURE,
    error: err
  }
}

/** Next pick **/
export function getNextPickOrder() {

  return dispatch => {
    dispatch(getNextPickOrderRequest());
    return request
      .get(`${orderUrl}/next/pick`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(getNextPickOrderRequestFailure(err));
        } else {
          dispatch(getNextPickOrderRequestSuccess(res.body));
          if (_.isEmpty(res.body)) {
            dispatch(globalActions.announce(`No order is ready to pick at the moment`));
          }
        }
      });
  };
}


function getNextPickOrderRequest() {
  return {
    type: ACTIONS.NEXT_PICK_REQUEST
  }
}

function getNextPickOrderRequestSuccess(order) {
  return {
    type: ACTIONS.NEXT_PICK_REQUEST_SUCCESS,
    order
  }
}

function getNextPickOrderRequestFailure() {
  return {
    type: ACTIONS.NEXT_PICK_REQUEST_FAILURE,
    order
  }
}

/** Packed and take next **/
export function packedAndTakeNext(orderId) {
  return dispatch => {
    dispatch(packedAndTakeNextRequest());
    return request
      .post(`${orderUrl}/packedAndTakeNext`)
      .send({orderId})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(packedAndTakeNextRequestFailure(err));
        } else {
          if (_.isEmpty(res.body)) {
            dispatch(globalActions.announce(`Order ${orderId} is packed. No more package to pack`));
          } else {
            dispatch(globalActions.announce(`Order ${orderId} is packed`));
          }
          dispatch(packedAndTakeNextRequestSuccess(res.body));
        }
      });
  };
}

function packedAndTakeNextRequest() {
  return {
    type: ACTIONS.PACKED_AND_TAKE_NEXT_REQUEST
  }
}

function packedAndTakeNextRequestSuccess(order) {
  return {
    type: ACTIONS.PACKED_AND_TAKE_NEXT_REQUEST_SUCCESS,
    order
  }
}

function packedAndTakeNextRequestFailure(err) {
  return {
    type: ACTIONS.PACKED_AND_TAKE_NEXT_REQUEST_FAILURE,
    error: err
  }
}

/** Picked and take next **/
export function pickedAndTakeNext(orderId) {
  return dispatch => {
    dispatch(pickedAndTakeNextRequest());
    return request
      .post(`${orderUrl}/pickedAndTakeNext`)
      .send({orderId})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(pickedAndTakeNextRequestFailure(err));
        } else {
          dispatch(pickedAndTakeNextRequestSuccess(res.body));
          dispatch(globalActions.announce(`Order ${orderId} is picked`));
        }
      });
  };
}

function pickedAndTakeNextRequest() {
  return {
    type: ACTIONS.PICKED_AND_TAKE_NEXT_REQUEST
  }
}

function pickedAndTakeNextRequestSuccess(order) {
  return {
    type: ACTIONS.PICKED_AND_TAKE_NEXT_REQUEST_SUCCESS,
    order
  }
}

function pickedAndTakeNextRequestFailure(err) {
  return {
    type: ACTIONS.PICKED_AND_TAKE_NEXT_REQUEST_FAILURE,
    error: err
  }
}

export const actions = ACTIONS;
