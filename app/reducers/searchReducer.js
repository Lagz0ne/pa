import {
  actions
} from '../actions/eventActions';
import _ from 'lodash';

export default function registrationReducer(state = {}, action) {
  switch (action.type) {

    case actions.SEARCH_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        searchResult: action.searchResult
      });

    case actions.PICKUP_REQUEST_SUCCESS:
      const id = action.id;
      const currentResult = state.searchResult;

      const modifiedResult = _.map(currentResult, item => {
        if (item.id === id) {
          item.pickedUp = true;
        }
        return item;
      });

      return Object.assign({}, state, {
        searchResult: modifiedResult
      });

    default:
      return state;
  }
}
