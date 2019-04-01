import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    InteractionManager
} from 'react-native';
import  *  as StoreKeyUtil from '../../utils/StoreKeyUtils';
import PropTypes from 'prop-types';
import store from 'react-native-simple-store';
import ItemListView from './ItemListView'
import ScrollableTabView, {
    ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

let tempTypeList = [
{id: "19", name: "体育迷"},
{id: "2", name: "段子手"},
{id: "3", name: "养生堂"},
{id: "4", name: "私房话"},
{id: "5", name: "八卦精"},
{id: "6", name: "爱生活"},
{id: "7", name: "财经迷"},
{id: "8", name: "汽车迷"},
{id: "9", name: "科技咖"},
{id: "10", name: "潮人帮"},
{id: "11", name: "辣妈帮"},
{id: "12", name: "军事"},
{id: "13", name: "旅行家"},
{id: "14", name: "职场人"},
{id: "15", name: "美食家"},
{id: "16", name: "古今通"},
{id: "17", name: "学霸族"},
{id: "18", name: "星座控"},
{id: "1", name: "热点"}]

//当前页的index
let currenTabIndex = 0;
//存储所有的翻页参数
let pageIndexArr = [];

class NativeRNApp extends Component {
    static propTypes = {
        read: PropTypes.object,
        actions: PropTypes.object
     };
    //static defaultProps = {
    // }
    constructor(props) {
        //props 只读属性
        super(props);

    }


    componentWillMount() {

    }

    //已经加载
    componentDidMount() {

        DeviceEventEmitter.addListener(StoreKeyUtil.ChangeCategory,(typeIds) => {
            console.log(typeIds);
        })

        InteractionManager.runAfterInteractions(() => {
            // store.get(StoreKeyUtil.TYPEIDS).then((typeIds) => {
            //     if (!typeIds) {
            //         return;
            //     }
            //     store.get(StoreKeyUtil.TYPELIST).then((typeList)=>{
            //         console.log(typeList);
            //         this.setState({
            //             typeIds: typeIds,
            //             typeList: typeList
            //         })
            //     })
            //
            // });
        });

        const {actions} = this.props
        // pageIndexArr = []
        // tempTypeList.forEach(()=>{
        //     pageIndexArr.push(1)
        // })
        actions.requestArticleList(false,true,19,false,1)
    }

    //即将消失
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
    }

    onChangeTab = (obj) => {
        currenTabIndex  = obj.i;
    }

    //下拉刷新
    onRefresh = (index) => {
        const {actions} = this.props
        //将当前tab的翻页参数并将它置为1 和 取出typeId
        pageIndexArr[index] = 1;
        let obj = tempTypeList[index];
        let typeId = obj.id
        console.log(`refresh +当前${index} + ${pageIndexArr} + id:${typeId}`);

        actions.requestArticleList(false,true,typeId,false,1)
    }

    //上拉加载更多
    onEndReached = (index) => {

        const {actions, read} = this.props

        //将当前tab的翻页参数加1 和 typeId
        let obj = tempTypeList[index];
        let typeId = obj.id
        //取出当前tab的list
        let list = read.articleList[typeId];
        //下面情况说明当前tab还没加载数据，或者已经没有数据加载
        if (list == undefined || list == null || list.length < 20) {
            pageIndexArr[index] = 1;
        } else {
            let page = pageIndexArr[index];

            pageIndexArr[index] = 1 + page;
        }
        actions.requestArticleList(false,true,typeId,false,pageIndexArr[index])

    }

    onPressHandler = (data) => {
        console.log(data);

        const { navigate } = this.props.navigation;
        navigate('Web',{data});
    }
    renderContent = (index) => {
        const { read } = this.props;
        let typeIdObj = tempTypeList[index];
        let articleList = read.articleList[typeIdObj.id];

        return (
            <ItemListView
                sourceData={articleList}
                loading={read.loading}
                 refresh={()=>this.onRefresh(index)}
                onEndReached={()=>this.onEndReached(index)}
                onPressHandler={this.onPressHandler}
            />
        )
    }

    // content = () => {
    //     let contentArr = [];
    //     contentArr.splice(1,contentArr.length);
    //     console.log(contentArr);
    //     for (let i = 0; i < tempTypeList.length; i++) {
    //         let obj = tempTypeList[i];
    //         let typeView = (
    //             //必须设置外出view flex：1 占满整个屏幕
    //             <View key={i} tabLabel={obj.name} style={styles.base}>
    //                 {this.renderContent(i)}
    //             </View>
    //         )
    //         contentArr.push(typeView)
    //     }
    //     return contentArr
    // }

    render() {

        const content = tempTypeList.map((obj,index)=>{
            const typeView = (
                //必须设置外出view flex：1 占满整个屏幕
                <View key={index} tabLabel={obj.name} style={styles.base}>
                    {this.renderContent(index)}
                </View>
            )
            return typeView;
        })
        //ScrollableTabView 有bug，动态获取会一直闪烁，先固定好只取十个
        return (
            <View style={styles.container}>
                <ScrollableTabView
                     renderTabBar={() => (
                         <ScrollableTabBar
                             tabStyle={styles.tab}
                             textStyle={styles.tabText}
                         />
                     )}
                     tabBarBackgroundColor="#fcfcfc"
                     tabBarUnderlineStyle={styles.tabBarUnderline}
                     tabBarActiveTextColor="#3e9ce9"
                     tabBarInactiveTextColor="#aaaaaa"
                     onChangeTab={(obj)=>{ this.onChangeTab(obj)}}
                >
                    {content}
                    {/*<Text tabLab={'sdf'}>sdf</Text>*/}
                </ScrollableTabView>

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
        backgroundColor: '#F5FCFF',
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    }
});


export default NativeRNApp;
