import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import app from './reducers';

const rootReducer = combineReducers({app});

const enhancer = compose(applyMiddleware(thunkMiddleware));

const initialState = (window.__INITIAL_DATA__) ? window.__INITIAL_DATA__ : {};

const store = createStore(rootReducer, initialState, enhancer);

export default store;
