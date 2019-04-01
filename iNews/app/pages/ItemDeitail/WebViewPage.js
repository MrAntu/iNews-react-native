import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    BackHandler,
    Modal,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

//import {
//  NativeModules,
//NativeAppEventEmitter
//} from 'react-native';
//import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
//const {width, height, scale} = Dimensions.get('window');

const shareIconWechat = require('../../img/share_icon_wechat.png');
const shareIconMoments = require('../../img/share_icon_moments.png');

class NativeRNApp extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.title,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} color={tintColor} />
        ),
        headerRight: (
            <Icon.Button
                name="md-share"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleShare();
                }}
            />
        )
    });

    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {
            canGoBack: false,
            isShareModal: false,
            transparent: false
        };
    }

    //已经加载
    componentDidMount() {
        this.props.navigation.setParams({
            handleShare: this.handleShare
        });
        BackHandler.addEventListener('hardwareBackPress',this.goBack)
        // View.props.onStartShouldSetResponder = (evt) => {}
        // View.props.onResponderTerminationRequest= (evt) => {true}

    }

    goBack = () => {

        if (this.state.isShareModal) {
            this.setState({
                isShareModal: false
            });
            return true;
        } else if (this.state.canGoBack) {
            this.webView.goBack();
            return true
        }
        return false
    }

    handleShare = () => {
        console.log('handleShare');
        this.setState({
            isShareModal: true
        })
    }

    onNavigationStateChange = (navState) => {
        console.log(navState);
        //canGoBack  如果跳转多层web，就会返回true
        this.setState({
            canGoBack: navState.canGoBack
        });
    };

    onShouldStartLoadWithRequest = (event) => {
        return true;
    }

    //即将消失
    componentWillUnmount() {
        console.log('removeEventListener');
        BackHandler.removeEventListener('hardwareBackPress',this.goBack)
    }

    componentWillReceiveProps(nextProps) {

    }

    renderSpinner = () => {
        const { params } = this.props.navigation.state;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        isShareModal: false
                    });
                }}
            >
                <View key="spinner" style={styles.spinner}>

                    {/*多添加一层事件目的，点击不透明区域阻止最外面的事件也响应*/}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log('TouchableWithoutFeedback');
                        }}
                    >
                        <View style={styles.spinnerContent}>
                            <Text
                                style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]}
                            >
                                分享到
                            </Text>
                            <View style={styles.shareParent}>
                                {/*微信*/}
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        Alert.alert('分享','分享到微信成功')
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconWechat} />
                                        <Text style={styles.spinnerTitle}>微信</Text>
                                    </View>
                                </TouchableOpacity>

                                {/*朋友圈*/}
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        Alert.alert('分享','分享到朋友圈成功')
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconMoments} />
                                        <Text style={styles.spinnerTitle}>朋友圈</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    visible={this.state.isShareModal}
                    transparent={true}
                    onRequestClose={()=>{
                        //此属性安卓才有
                        this.setState({
                            isShareModal: false
                        });
                    }}
                >
                    {this.renderSpinner()}
                </Modal>

                <WebView
                    ref={(ref)=>{
                        this.webView = ref;
                    }}
                    automaticallyAdjustContentInsets={false}
                    style={styles.base}
                    source={{uri: 'https://www.jianshu.com/p/47a2ad2bf527'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width * (7 / 10),
        height: Dimensions.get('window').width * (7 / 10) * 0.68,
        backgroundColor: '#fcfcfc',
        padding: 20,
        borderRadius: 5
    },
    spinnerTitle: {
        fontSize: 18,
        color: '#313131',
        textAlign: 'center',
        marginTop: 5
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 20
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    shareIcon:{
        width:40,
        height:40
    }
});


export default NativeRNApp;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
