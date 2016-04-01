import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import app from './reducers';

const rootReducer = combineReducers({app});

const enhancer = compose(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, {}, enhancer);

export default store;
