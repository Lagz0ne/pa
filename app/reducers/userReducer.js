import { actions } from 'actions/globalActions';

export default function userReducer(state = {isLoggedIn: false}, action) {

  switch (action.type) {
    case actions.LOGIN_REQUEST_SUCCESS:
      const user = action.user;
      user.isLoggedIn = true;
      return Object.assign({}, state, user);

    case actions.LOGOUT_REQUEST_SUCCESS:
      return {isLoggedIn: false};

    default:
      return state;
  }
}
