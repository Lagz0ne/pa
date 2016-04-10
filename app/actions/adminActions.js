import request from 'superagent';

const serverUrl = '';
const adminUrl = `${serverUrl}/order`;

const ACTIONS = {
  RESET_REQUEST: 'RESET_REQUEST',
  RESET_REQUEST_SUCCESS: 'RESET_REQUEST_SUCCESS',
  RESET_REQUEST_FAILURE: 'RESET_REQUEST_FAILURE'
}

function resetRequest() {
  return {
    type: ACTIONS.RESET_REQUEST
  }
}

function resetRequestSuccess(type, orderId) {
  return {
    type: ACTIONS.RESET_REQUEST_SUCCESS
  }
}

function resetRequestFailure(error) {
  return {
    type: ACTIONS.RESET_REQUEST_SUCCESS,
    error
  }
}

export function reset(type, orderId) {
  return dispatch => {
    dispatch(resetRequest());
    return request
      .delete(adminUrl)
      .send({type, orderId})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(resetRequestFailure(err));
        } else {
          dispatch(resetRequestSuccess(type, orderId));
        }
      });
  }
}
