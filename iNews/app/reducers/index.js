'use strict';
import { combineReducers } from 'redux';
import counter from './counter';
import category from './categoty';
import read from './read';

const rootReducer = combineReducers({
    counter,
    category,
    read
});

export default rootReducer;
