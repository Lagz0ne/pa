import request from 'superagent';

const serverUrl = '';
const registrationUrl = `${serverUrl}/registration`;

const ACTIONS = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_REQUEST_SUCCESS: 'SEARCH_REQUEST_SUCCESS',
  SEARCH_REQUEST_FAILURE: 'SEARCH_REQUEST_FAILURE',

  PICKUP_REQUEST: 'PICKUP_REQUEST',
  PICKUP_REQUEST_SUCCESS: 'PICKUP_REQUEST_SUCCESS',
  PICKUP_REQUEST_FAILURE: 'PICKUP_REQUEST_FAILURE',

  PICKUP_ALL_REQUEST: 'PICKUP_ALL_REQUEST',
  PICKUP_ALL_REQUEST_SUCCESS: 'PICKUP_ALL_REQUEST_SUCCESS',
  PICKUP_ALL_REQUEST_FAILURE: 'PICKUP_ALL_REQUEST_FAILURE',

  ADD_TO_QUEUE: 'ADD_TO_QUEUE',
  CLEAR_SEARCH_RESULT: 'CLEAR_SEARCH_RESULT'
}

export const actions = ACTIONS;

export function clearSearchResult() {
  return {
    type: ACTIONS.CLEAR_SEARCH_RESULT
  }
}

/** Search functionalities **/
export function searchRequest(searchKeyword) {
  return {
    type: ACTIONS.SEARCH_REQUEST,
    search: searchKeyword
  };
}

export function searchSuccess(searchResult) {
  return {
    type: ACTIONS.SEARCH_REQUEST_SUCCESS,
    searchResult
  };
}

export function searchFailure(err, search) {
  return {
    type: ACTIONS.SEARCH_REQUEST_FAILURE,
    err,
    search
  };
}

export function search(searchKeyword) {
  return dispatch => {
    dispatch(searchRequest(searchKeyword));
    return request
      .get(`${registrationUrl}/search`)
      .query({
        searchKeyword: searchKeyword
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(searchFailure(err, search));
        } else {
          dispatch(searchSuccess(res.body));
        }
      });
  };
}

/** Pick up functionalities **/
export function pickupRequest(id) {
  return {
    type: ACTIONS.PICKUP_REQUEST,
    id
  };
}

export function pickupSuccess(id, pickupResult) {
  return {
    type: ACTIONS.PICKUP_REQUEST_SUCCESS,
    id,
    pickupResult
  };
}

export function pickupFailure(err, id) {
  return {
    type: ACTIONS.PICKUP_REQUEST_FAILURE,
    err,
    id
  };
}

export function pickup(id) {
  return dispatch => {
    dispatch(pickupRequest(id));
    return request
      .post(`${registrationUrl}/pickup`)
      .send({ id })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(pickupFailure(err, id));
        } else {
          dispatch(pickupSuccess(id, res.body));
        }
      });
  };
}

/** Pick up all functionalities **/
export function pickupAllRequest(ids) {
  return {
    type: ACTIONS.PICKUP_ALL_REQUEST,
    ids
  };
}

export function pickupAllSuccess(ids, pickupResult) {
  return {
    type: ACTIONS.PICKUP_ALL_REQUEST_SUCCESS,
    ids,
    pickupResult
  };
}

export function pickupAllFailure(err, id) {
  return {
    type: ACTIONS.PICKUP_ALL_REQUEST_FAILURE,
    err,
    id
  };
}

export function pickupAll(ids) {
  return dispatch => {
    dispatch(pickupRequest(ids));
    return request
      .post(`${registrationUrl}/pickup`)
      .send({ ids })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(pickupAllFailure(err, ids));
        } else {
          dispatch(pickupAllSuccess(ids, res.body));
        }
      });
  };
}
