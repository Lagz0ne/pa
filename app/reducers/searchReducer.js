import {
  actions
} from '../actions/eventActions';
import _ from 'lodash';

export default function registrationReducer(state = {}, action) {
  const currentResult = state.searchResult;
  switch (action.type) {

    case actions.SEARCH_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        searchResult: action.searchResult
      });

    case actions.CLEAR_SEARCH_RESULT:
      return Object.assign({}, state, {searchResult: []});

    case actions.PICKUP_REQUEST_SUCCESS:
      const id = action.id;

      const modifiedResult = _.map(currentResult, item => {
        if (item.id === id) {
          item.pickedUp = true;
        }
        return item;
      });

      return Object.assign({}, state, {
        searchResult: modifiedResult
      });

    case actions.PICKUP_ALL_REQUEST_SUCCESS:
      const ids = action.ids;
      const updatePickedUp = _.map(currentResult, result => {
        console.log(result);
        if (_.includes(ids, result.id)) {
          result.pickedUp = true;
        }
        return result;
      });
      console.log(updatePickedUp);
      return Object.assign({}, state, {searchResult: updatePickedUp});

    default:
      return state;
  }
}
