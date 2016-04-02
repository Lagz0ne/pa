import {
  actions
} from '../actions/eventActions';
import _ from 'lodash';

export default function appStatusReducer(state = {isLoading: false}, action) {
  switch (action.type) {

    case actions.SEARCH_REQUEST:
    case actions.PICKUP_REQUEST:
    case actions.PICKUP_ALL_REQUEST:
      return Object.assign({}, state, {isLoading: true});

    case actions.SEARCH_REQUEST_SUCCESS:
    case actions.SEARCH_REQUEST_FAILURE:
    case actions.PICKUP_REQUEST_SUCCESS:
    case actions.PICKUP_REQUEST_FAILURE:
    case actions.PICKUP_ALL_REQUEST_SUCCESS:
    case actions.PICKUP_ALL_REQUEST_FAILURE:
      return Object.assign({}, state, {isLoading: false});

    default:
      return state;
  }
}
