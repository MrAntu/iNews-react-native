import React, {Component} from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as readActions from '../actions/readActions';
import Main from '../pages/main/main'
import Icon from 'react-native-vector-icons/Ionicons'

class MainContainer extends Component {

    static navigationOptions = ({navigation}) => ({
        headerLeft: null,
        gesturesEnabled:false,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} color={tintColor} />
        ),
        title: '首页',

    })
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};

        // 监听事件 ES6 类中函数必须手动绑定
        // this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <Main {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {read} = state;
    return {
        read
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(readActions, dispatch);
    return {
        actions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);


