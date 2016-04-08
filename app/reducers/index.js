import {
  combineReducers
} from 'redux';
import searchReducer from './searchReducer';
import formStateReducer from './formStateReducer';
import appStatusReducer from './appStatusReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  search: searchReducer,
  form: formStateReducer,
  user: userReducer,
  order: orderReducer,
  appStatus: appStatusReducer
})
