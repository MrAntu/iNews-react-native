import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

class Counter extends Component {
    static propTypes = {
        counter: PropTypes.object,
        actions: PropTypes.object
    };

    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        // this.state = {date: new Date()};

        // 监听事件 ES6 类中函数必须手动绑定
        // this.handleChange = this.handleChange.bind(this);
    }

    //即将加载
    componentWillMount() {

    }

    //已经加载
    componentDidMount() {

    }

    //即将消失
    componentWillUnmount() {

    }

    render() {
        const { counter, actions} = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{counter.count}</Text>
                <TouchableOpacity onPress={actions.increment} style={styles.button}>
                    <Text>up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={actions.decrement} style={styles.button}>
                    <Text>down</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});


export default Counter;
// AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
