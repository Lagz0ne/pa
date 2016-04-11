import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as orderActions } from 'actions/orderActions';

import _ from 'lodash';

const DEFAULT_STATE = {
  registrations: [],
  previousOrder: undefined,
  nextOrderId: undefined
}

export default function orderReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case orderActions.ADD_TO_ORDER:
      const registrations = Array.from(state.registrations);
      const toBeAdded = action.registration;

      if (_.isArray(toBeAdded)) {
        const merged = registrations.concat(toBeAdded);
        return Object.assign({}, state, {registrations: _.uniqBy(merged, 'id')});
      } else {
        registrations.push(action.registration);
        return Object.assign({}, state, {registrations: _.uniqBy(registrations, 'id')});
      }

    case orderActions.REMOVE_FROM_ORDER:
      const registration = action.registration;
      const currentRegistrations = state.registrations;

      const removed = _.remove(currentRegistrations, item => item.id !== registration.id);
      return Object.assign({}, state, {registrations: removed});

    case orderActions.CLEAR_PREVIOUS_ORDER:
      return Object.assign({}, state, {previousOrder: undefined});

    case orderActions.CREATE_ORDER_REQUEST_SUCCESS:
      const result = action.order;
      return Object.assign({}, state, {previousOrder: result.order, nextOrderId: result.nextOrderId, registrations: []});

    case orderActions.NEXT_PACK_REQUEST_SUCCESS:
      return Object.assign({}, state, {packOrder: _.isEmpty(action.order) ? undefined : action.order});

    case orderActions.NEXT_PICK_REQUEST_SUCCESS:
      return Object.assign({}, state, {pickOrder: _.isEmpty(action.order) ? undefined : action.order});

    case orderActions.PACKED_REQUEST_SUCCESS:
      return Object.assign({}, state, {packOrder: undefined});

    case orderActions.PICKED_REQUEST_SUCCESS:
      return Object.assign({}, state, {pickOrder: undefined});

    case orderActions.PACKED_AND_TAKE_NEXT_REQUEST_SUCCESS:
      return Object.assign({}, state, {packOrder: _.isEmpty(action.order) ? undefined : action.order});

    case orderActions.PICKED_AND_TAKE_NEXT_REQUEST_SUCCESS:
      return Object.assign({}, state, {pickOrder: _.isEmpty(action.order) ? undefined : action.order});

    case orderActions.GET_ORDERS_REQUEST_SUCCESS:
      return Object.assign({}, state, {adminOrders: action.orders});

    case orderActions.GET_CHECKINGOUT_ORDERS_REQUEST_SUCCESS:
      return Object.assign({}, state, {tvOrders: action.orders});

    case LOCATION_CHANGE:
      const pathname = action.payload.pathname;
      const splittedPath = pathname.split('/');

      if (splittedPath.length === 3 && splittedPath[1] === 'check') {
        return Object.assign({}, state, {affinity: splittedPath[2]});
      } else {
        return state;
      }

    default:
      return state;
  }
}
