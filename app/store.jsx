import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import app from './reducers';

const rootReducer = combineReducers({
  app,
  routing: routerReducer
});

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const initialState = window.__INITIAL_DATA__;
export const store = createStore(rootReducer, initialState, enhancer);
export const history = syncHistoryWithStore(browserHistory, store);
