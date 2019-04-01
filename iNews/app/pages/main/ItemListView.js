import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
//import {
//  NativeModules,
//NativeAppEventEmitter
//} from 'react-native';
import PropTypes from 'prop-types';
//import { Dimensions, Animated } from 'react-native';
//const {width, height, scale} = Dimensions.get('window');
import { formatStringWithHtml } from '../../utils/FormatUtil';
// const moment = require('moment/locale/zh-cn');


class ItemListView extends Component {
    static propTypes = {
        refresh: PropTypes.func,
        sourceData: PropTypes.array,
        onPressHandler: PropTypes.func
     };
    //static defaultProps = {
    // }
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

    componentWillReceiveProps(nextProps) {

    }

    onPressHandler = (article) => {
        this.props.onPressHandler(article)
    }

    _keyExtractor = (item, index) => index;

    _renderItem = (item) =>{
        const article = item.item
        return(
            <TouchableOpacity onPress={()=> this.onPressHandler(article)}>
                <View style={styles.containerItem}>
                    <Image style={styles.itemImg} source={{ uri: article.contentImg }} />
                    <View style={styles.itemRightContent}>
                        <Text style={styles.title}>{formatStringWithHtml(article.title)}</Text>
                        <View style={styles.itemRightBottom}>
                            <Text style={styles.userName}>{article.userName}</Text>
                            <Text style={styles.timeAgo}>{article.date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <FlatList style={styles.container}
                      data={ this.props.sourceData }
                       keyExtractor={ this._keyExtractor }
                      renderItem={ this._renderItem }
                      // ListEmptyComponent={ this._renderEmptyView }
                      refreshing={ this.props.loading }
                      onRefresh={ this.props.refresh}
                      onEndReachedThreshold={0.2}
                      onEndReached={this.props.onEndReached}
                // 是一个可选的优化，用于避免动态测量内容，+1是加上分割线的高度
                      getItemLayout={(data, index) => ( { length: 90, offset: (90) * index, index } )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },

    cell:{
        height: 100
    },

    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        color: 'black'
    },
    itemImg: {
        width: 88,
        height: 66,
        marginRight: 10
    },
    itemRightContent: {
        flex: 1,
        flexDirection: 'column'
    },
    itemRightBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        flex: 1,
        fontSize: 14,
        color: '#87CEFA',
        marginTop: 5,
        marginRight: 5
    },
    timeAgo: {
        fontSize: 14,
        color: '#aaaaaa',
        marginTop: 5
    },

});


export default ItemListView;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);
