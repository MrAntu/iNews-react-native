import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    DeviceEventEmitter
} from 'react-native';
//import {
//  NativeModules,
//NativeAppEventEmitter
//} from 'react-native';
//import PropTypes from 'prop-types';
//const Dimensions = require('Dimensions');
//const {width, height, scale} = Dimensions.get('window');
import ToastUtil from '../../utils/ToastUtil';
import Icon from 'react-native-vector-icons/Ionicons'

let feedbackText = ''
class Feedback extends Component {
    //static propTypes = {
    /**
     * 当这个属性被设置为true，并且地图上绑定了一个有效的可视区域的情况下，
     * 可以通过捏放操作来改变摄像头的偏转角度。
     * 当这个属性被设置成false时，摄像头的角度会被忽略，地图会一直显示为俯视状态。
     */
    //     pitchEnabled: PropTypes.bool,
    //  };
    //static defaultProps = {
    //   name: 'stranger'
    // }
    static navigationOptions = ({ navigation }) => ({
        title: '建议',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-thumbs-up" size={25} color={tintColor} />
        ),
        headerRight: (
            <Icon.Button
                name="md-checkmark"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleCheck();
                }}
            />
        ),
        tabBarOnPress:(obj)=> {
            console.log(obj);
            // navigation.state.params.tabBarOnPress()
            DeviceEventEmitter.emit('refresh', true);

            obj.jumpToIndex(obj.scene.index)
        }
    });
    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {
            inputText: ''
        };
    }


    //已经加载
    componentDidMount() {
        this.props.navigation.setParams({
            handleCheck: this.onActionSelected,
        });

        //监听tab 添加事件，可以做刷新等其他操作
        DeviceEventEmitter.addListener('refresh',(obj)=>{
            console.log('refresh',obj);
        })

    }


    onActionSelected = () => {
        if (feedbackText.length < 10) {
            ToastUtil.showShort('请提交超过10个字！')
            return;
        }
        ToastUtil.showShort('提交成功！')
        //不起效果
        this.textInput.clear()

        this.setState({
            inputText: ''
        })
        //收起键盘
        Keyboard.dismiss()
    }

    //即将消失
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={(ref) => {
                        this.textInput = ref;
                    }}
                    style={styles.textInput}
                    placeholder="请写下您宝贵的意见或建议，与iNews一起进步！"
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    numberOfLines={100}
                    multiline={true}
                     //autoFocus={true}
                    onChangeText={(text) => {
                        console.log(text);
                        feedbackText = text;
                        this.setState({
                            inputText:text
                        })
                    }}
                    value={this.state.inputText}
                    onContentSizeChange={(event)=>{
                        //大小的变化
                        console.log(event.nativeEvent.contentSize.height);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        padding: 15,
        textAlignVertical: 'top',
    }
});


export default Feedback;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
