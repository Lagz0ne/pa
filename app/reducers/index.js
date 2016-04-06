import {
  combineReducers
} from 'redux';
import searchReducer from './searchReducer';
import formStateReducer from './formStateReducer';
import appStatusReducer from './appStatusReducer';
import userReducer from './userReducer';

export default combineReducers({
  search: searchReducer,
  form: formStateReducer,
  user: userReducer,
  appStatus: appStatusReducer
})
