'use strict';
import * as types from './actionTypes'
import Requestutil from '../utils/RequestUtils'


export const requestArticleList = ( isRefreshing, loading, typeId, isLoadMore = false, page = 1) => {
    return function(dispatch, getState) {
        const {read} = getState();
        let currentMaxPage = parseInt(read.allPages[typeId]);
        if (currentMaxPage != undefined && page > currentMaxPage) {
            dispatch(fetchArticleList(false,false,false));
            return;
        }
        dispatch(fetchArticleList(isRefreshing,loading,isLoadMore));
        let url = `http://route.showapi.com/582-2?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f&typeId=${typeId}&page=${page}`;
        Requestutil.request(url,'get','')
            .then(response => {
                console.log(response.showapi_res_body);

                if (page == 1) {
                    dispatch({
                        type: types.REQUEST_ARTICLE_LIST,
                        articleList: response.showapi_res_body.pagebean.contentlist,
                        allPages: response.showapi_res_body.pagebean.allPages,
                        typeId
                    })
                } else {
                    //如果翻页，就拼接好参数
                    let list = read.articleList[typeId];
                    let arr =  list.concat(response.showapi_res_body.pagebean.contentlist)
                    dispatch({
                        type: types.REQUEST_ARTICLE_LIST,
                        articleList: arr,
                        allPages: response.showapi_res_body.pagebean.allPages,
                        typeId
                    })
                }

            })
            .catch((err)=>{
                console.log(err);
                dispatch({
                    type: types.REQUEST_ARTICLE_LIST,
                    articleList: read.articleList
                })
            })
    }
}


export const fetchArticleList = ( isRefreshing, loading, isLoadMore = false) => {
    return {
        type: types.FETCH_ARTICLE_LIST,
        isRefreshing,
        loading,
        isLoadMore
    }
}

