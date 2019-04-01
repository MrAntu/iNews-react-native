import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import { Dimensions, Animated } from 'react-native';
import store from 'react-native-simple-store';
// import AV from 'leancloud-storage';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../../utils/NavigationUtil';
import  *  as StoreKeyUtil from '../../utils/StoreKeyUtils';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../../img/splash.png');

class Splash extends Component {

    static  navigationOptions = ({navigation}) => ({
        header: null
    })
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
         this.state = {
             bounceValue: new Animated.Value(1)
         };
    }

    //已经加载
    componentDidMount() {
        SplashScreen.hide();
        Animated.timing(this.state.bounceValue, {
                toValue: 1.2,
                duration: 1000
            }
        ).start();

        const {navigate} = this.props.navigation;

        this.timer = setTimeout(()=>{

            store.get(StoreKeyUtil.ISINIT).then((isInit) => {

                if (!isInit) {
                        navigate('Category', { isFirst: true });
                    } else {
                        NavigationUtil.reset(this.props.navigation, 'Home')
                    }
                });
        },1000)
    }

    //即将消失
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}


export default Splash;
