import request from 'superagent';
import { browserHistory } from 'react-router';
import { history } from '../store';

const serverUrl = '';
const requestUrl = `${serverUrl}`;

const ACTIONS = {
  GLOBAL_FORM_STATE_INPUT: 'GLOBAL_FORM_STATE_INPUT',
  START_PACKING: 'GLOBAL_START_PACKING',
  PACKING: 'GLOBAL_PACKING',
  ANNOUNCE: 'ANNOUNCE',
  ClEAR_ANNOUNCEMENT: 'ClEAR_ANNOUNCEMENT',

  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUSET_SUCCESS',
  LOGIN_REQUEST_FAILURE: 'LOGIN_REQUEST_FAILURE',

  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS'
}

export const actions = ACTIONS;
/** form record **/

export function globalFormState(branch, value) {
  return {
    type: ACTIONS.GLOBAL_FORM_STATE_INPUT,
    branch,
    value
  };
}

export function announce(text) {
  return  {
    type: ACTIONS.ANNOUNCE,
    text
  }
}

export function clearAnnouncement() {
  return {
    type: ACTIONS.ClEAR_ANNOUNCEMENT
  }
}

export function persistSearchForm(value) {
  return globalFormState('search.keyword', value);
}

export function startPacking() {
  return {
    type: ACTIONS.START_PACKING
  }
}

export function packing(id) {
  return {
    type: ACTIONS.PACKING,
    id
  }
}

/** Login funcitonality **/
function loginRequest() {
  return {
    type: ACTIONS.LOGIN_REQUEST
  }
}

function loginRequestSuccess(user) {
  return {
    type: ACTIONS.LOGIN_REQUEST_SUCCESS,
    user
  }
}

function loginRequestFailure(error) {
  return {
    type: ACTIONS.LOGIN_REQUEST_FAILURE,
    error
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    return request
      .post(`${requestUrl}/authenticate`)
      .send({username, password})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loginRequestFailure(err));
          dispatch(announce("Invalid username or password"));
        } else {
          dispatch(loginRequestSuccess(res.body));
          window.location.href = '/';
        }
      });
  };
}

function logoutRequestSuccess() {
  return {
    type: ACTIONS.LOGOUT_REQUEST_SUCCESS
  }
}


export function logout() {
  return dispatch => {
    return request
      .get(`${requestUrl}/logout`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        dispatch(logoutRequestSuccess());
        window.location.href = '/login';

      });
  };
}
