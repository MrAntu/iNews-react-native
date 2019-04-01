'use strict';
import * as types from './actionTypes'
import Requestutil from '../utils/RequestUtils'
import store from 'react-native-simple-store';
import StoreKeyUtils from '../utils/StoreKeyUtils'


// export function requestTypeList(typeList) {
//     console.log("requestTypeList");
//     return {
//         type: types.REQUEST_TYPE_LIST,
//         typeList
//     };
// }

/***
 * 下面是直接使用fetch封装网络请求
 *
const fetchPosts = () => (dispatch) => {
    return fetch(`http://route.showapi.com/582-1?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`)
        .then(response => response.json())
        .then(json => dispatch(requestTypeList(json.showapi_res_body.typeList)))
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
    // console.log(getState()); //获取所有state
    return dispatch(fetchPosts())
}

 ***/


/***
 * 使用dedux-thunk异步封装返回promise对象网络请求
 * @param 参数
 * @returns {Function}
 */
export const getDataAction = function() {

    return function(dispatch, getState) {
        dispatch(fetchTypeList());
         let url = 'http://route.showapi.com/582-1?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f';
         Requestutil.request(url,'get','')
            .then(response => {
                console.log(response);
                // save();
                dispatch({
                    type: types.REQUEST_TYPE_LIST,
                    typeList: response.showapi_res_body.typeList
                })

            })
    }
}

const save = () => {
    console.log('sdfsdfksdf');
}

export const fetchTypeList= () => {
    return {
        type: types.FETCH_TYPE_LIST
    };
}
