'use strict';
import * as types from '../actions/actionTypes'

const initialState = {
    isRefreshing: false,
    loading: false,
    isLoadMore: false,
    noMore: false,
    articleList: {},
    count: 100,
    allPages:{}
}

export default function read(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_ARTICLE_LIST:
            return Object.assign({},state,{
                loading: false,
                isRefreshing: false,
                isLoadMore: false,
                articleList: combine(state,action),
                allPages: combinePages(state,action)
            });
        case types.FETCH_ARTICLE_LIST:
            return Object.assign({},state,{
                loading: action.loading,
                isRefreshing: action.isRefreshing,
                isLoadMore: action.isLoadMore,
            });
        default:
            return state;

    }
}


function combine(state, action) {
    state.articleList[action.typeId] = action.articleList;
    return state.articleList;
}


function combinePages(state, action) {
    state.allPages[action.typeId] = action.allPages;
    return state.allPages;
}

