import {
  actions
} from '../actions/globalActions';

export default function formStateReducer(state = {}, action) {
  switch (action.type) {

    case actions.GLOBAL_FORM_STATE_INPUT:
      const branch = action.branch;
      const value = action.value;
      return Object.assign({}, state, {
        [branch]: value
      });

    default:
      return state;
  }
}
