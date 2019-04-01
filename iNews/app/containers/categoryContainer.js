import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
//import {
//  NativeModules,
//NativeAppEventEmitter
//} from 'react-native';
//import PropTypes from 'prop-types';
//const Dimensions = require('Dimensions');
//const {width, height, scale} = Dimensions.get('window');
import Categry from '../pages/category/category'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../actions/categoryActions';


class CategoryContainer extends Component {
    //static propTypes = {

    //  };
    constructor(props) {
        //props 只读属性
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerLeft: null,
        gesturesEnabled:false,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-pricetags" size={25} color={tintColor} />
        ),
        title: '分类',
        headerRight:navigation.state.params !== undefined &&
            navigation.state.params.isFirst ? null : (<Icon.Button
            name="md-checkmark"
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.8}
            onPress={()=>{
                navigation.state.params.handleCheck();
            }}
        />)
    })

    render() {
        return (
            <Categry {...this.props} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {category} = state;
    return {
        category
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(categoryActions, dispatch);
    return {
        actions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);

