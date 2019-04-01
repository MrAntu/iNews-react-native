import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
//import { Dimensions, Animated } from 'react-native';
//const {width, height, scale} = Dimensions.get('window');


class Button extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        textStyle: Text.propTypes.style,
        containerStyle: ViewPropTypes.style,
        text: PropTypes.string,
        activeOpacity: PropTypes.number,
     };
    static defaultProps = {
        onPress() {},
        disable: false,
        activeOpacity: 0.8,
        textStyle: null,
        containerStyle: null,
        text: '确定',
    }
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};
        // 监听事件 ES6 类中函数必须手动绑定
        // this.handleChange = this.handleChange.bind(this);
    }

    //已经加载
    componentDidMount() {

    }

    //即将消失
    componentWillUnmount() {

    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disable={this.props.disable}
                activeOpacity={this.props.activeOpacity}
                style={this.props.containerStyle}
            >
                <Text style={this.props.textStyle}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}


export default Button;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
