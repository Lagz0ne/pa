import {
  combineReducers
} from 'redux';
import searchReducer from './searchReducer';
import formStateReducer from './formStateReducer';
import appStatusReducer from './appStatusReducer';

export default combineReducers({
  search: searchReducer,
  form: formStateReducer,
  appStatus: appStatusReducer
})
