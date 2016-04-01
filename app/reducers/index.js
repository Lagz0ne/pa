import {
  combineReducers
} from 'redux';
import searchReducer from './searchReducer';
import formStateReducer from './formStateReducer';

export default combineReducers({
  search: searchReducer,
  form: formStateReducer
})
