'use strict';
import * as types from '../actions/actionTypes'
import store from 'react-native-simple-store';
import * as StoreKeyUtils from '../utils/StoreKeyUtils'
const initialState = {
    loading: false,
    typeList: [],
    count: 10
}

export default function category(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_TYPE_LIST:
            return Object.assign({},state,{
                loading: true
            });
        case types.RECEIVE_TYPE_LIST:

            return Object.assign({},state,{
                loading: false,
                typeList: action.typeList
            });

        case types.REQUEST_TYPE_LIST:
            store.save(StoreKeyUtils.TYPELIST,action.typeList);
            return Object.assign({},state,{
                loading: false,
                typeList: action.typeList
            });

        default:
            return state;

    }
}

