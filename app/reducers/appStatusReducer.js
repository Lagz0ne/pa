import { actions as eventActions } from '../actions/eventActions';
import { actions as globalActions } from '../actions/globalActions';
import { actions as orderActions } from '../actions/orderActions';
import { LOCATION_CHANGE } from 'react-router-redux';

import _ from 'lodash';

const DEFAULT_STATE = {
  isLoading: false,
  isPacking: false,
  announcement: undefined
}

export default function appStatusReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {

    case eventActions.SEARCH_REQUEST:
    case eventActions.PICKUP_REQUEST:
    case eventActions.PICKUP_ALL_REQUEST:
    case orderActions.CREATE_ORDER_REQUEST:
      return Object.assign({}, state, {isLoading: true});

    case eventActions.SEARCH_REQUEST_SUCCESS:
    case eventActions.SEARCH_REQUEST_FAILURE:
    case eventActions.PICKUP_REQUEST_SUCCESS:
    case eventActions.PICKUP_REQUEST_FAILURE:
    case eventActions.PICKUP_ALL_REQUEST_SUCCESS:
    case eventActions.PICKUP_ALL_REQUEST_FAILURE:
    case globalActions.ClEAR_ANNOUNCEMENT:
    case orderActions.CREATE_ORDER_REQUEST_FAILURE:
      return Object.assign({}, state, {isLoading: false});

    case globalActions.ANNOUNCE:
      return Object.assign({}, state, {isLoading: true, announcement: action.text});

    case globalActions.ClEAR_ANNOUNCEMENT:
      return Object.assign({}, state, {annoucement: undefined});

    case globalActions.START_PACKING:
      return Object.assign({}, state, {isPacking: true});

    default:
      return state;
  }
}
