'use strict';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import logger from 'redux-logger';

const middlewares = [];

middlewares.push(thunk)
if (__DEV__) {
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducers, initialState);
    return store;
}
