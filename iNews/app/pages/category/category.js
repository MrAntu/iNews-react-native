import React, {Component} from 'react';
import {
    //AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';

import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation'
import NavigationUtil from '../../utils/NavigationUtil'
import ToastUtil from '../../utils/ToastUtil'
import  *  as StoreKeyUtil from '../../utils/StoreKeyUtils';
import store from 'react-native-simple-store';


let tempTypesIds = [];
let maxCategory = 5;

class Category extends Component {
    static propTypes = {
        category: PropTypes.object,
        actions: PropTypes.object
     };
    //static defaultProps = {
    // }


    constructor(props) {
        //props 只读属性
        super(props);
        //state 支持读写
        this.state = {
            typeIds: [],
        };
    }

    //已经加载
    componentDidMount() {

        const { actions } = this.props;
        actions.getDataAction();


        const { params } = this.props.navigation.state;
        if (params === undefined || !params.isFirst) {
            this.props.navigation.setParams({
                handleCheck: this.onActionSelected
            });
        }
        //取出typeIds
        InteractionManager.runAfterInteractions(()=>{
            store.get(StoreKeyUtil.TYPEIDS).then((typeIds)=> {
                if (typeIds == null || typeIds == undefined) {
                    tempTypesIds = [];
                    return;
                }
                tempTypesIds = typeIds;
                this.setState({
                    typeIds: tempTypesIds
                })
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        const { category } = this.props;

        if (category.typeList.length > 0) {
            console.log('componentWillReceiveProps');
        }

    }

    onActionSelected = () => {
        console.log("onActionSelected")
        if (tempTypesIds.length > maxCategory) {
            ToastUtil.showShort(`不要超过${maxCategory}个类别哦`);
            return;
        }
        if (tempTypesIds.length < 1) {
            ToastUtil.showShort('不要少于1个类别哦');
            return;
        }

        const { navigate } = this.props.navigation;
        InteractionManager.runAfterInteractions(()=>{
            store.save(StoreKeyUtil.TYPEIDS, this.state.typeIds);
            DeviceEventEmitter.emit(StoreKeyUtil.ChangeCategory, this.state.typeIds);
            navigate('Main');
        })

        // InteractionManager.runAfterInteractions(()=>{
        //     store.get(StoreKeyUtil.TYPEIDS).then((typeIds)=>{
        //
        //     })
        // })
    }



    confirButtonAction = () => {
        console.log('confirButtonAction');
        if (this.state.typeIds.length == 0) {
            Alert.alert('提示', '您确定不选择任何分类吗?',[
                { text: '取消', style: 'cancel' }, {
                    text: '确定',
                    onPress: () => {
                        InteractionManager.runAfterInteractions(()=>{
                            // store.save(StoreKeyUtil.ISINIT, true);
                            // store.save(StoreKeyUtil.TYPEIDS, []);
                            NavigationUtil.reset(this.props.navigation, 'Home');
                        })

                    }
                }
            ])
        } else if(this.state.typeIds.length > maxCategory) {
            ToastUtil.showShort(`不要超过${maxCategory}个类别哦`)
        } else {
            InteractionManager.runAfterInteractions(()=>{
                store.save(StoreKeyUtil.ISINIT, true);
                store.save(StoreKeyUtil.TYPEIDS, this.state.typeIds);
                NavigationUtil.reset(this.props.navigation, 'Home');
            })

        }
    }

    selectItemAction = (item) => {
        let pos = -1;
        tempTypesIds.every((obj, index) => {
            if (parseInt(obj.id) == parseInt(item.id)) {
                pos = index;
                return false;
            }

            return true;
        })

        if (pos == -1) {
            tempTypesIds.push(item);
        } else {
            tempTypesIds.splice(pos,1);
        }

        this.setState({
            typeIds: tempTypesIds
        });
    }

    // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index;

    _renderItem = ({item,index}) =>{
        const itemViews = item.map((obj) => {
            const i = this.renderCell(obj);
            return i;
        });
        return(
            <View style={styles.group}>
                {itemViews}
            </View>
        );
    };

    findTypeId = (obj) => {
        let ret = false;
        tempTypesIds.forEach((item)=>{
            if (parseInt(item.id) == parseInt(obj.id)) {
                ret = true;
                return;
            }
        })

        return ret;
    }

    renderCell = (obj) => {
        let isSelect = this.findTypeId(obj);
        console.log(isSelect);
        return(
            <Button
                key={obj.id}
                onPress={() => this.selectItemAction(obj)}
                text={obj.name}
                containerStyle={[
                    styles.categoryBtn,
                    isSelect
                        ? { backgroundColor: '#3e9ce9' }
                        : { backgroundColor: '#fcfcfc' }
                ]}
                textStyle={[
                    styles.categoryText,
                    isSelect ? { color: '#fcfcfc' } : { color: 'black' }
                ]}
            />
        );
    }



    // 空布局
    _renderEmptyView = () => (
        <View><Text>EmptyView</Text></View>
    );

    //每行三个进行分组
    rendenGroups = (typeList) => {
        let itemsGroups = [];
        let group = [];

        typeList.forEach((item,index) => {
            if (group.length == 3) {
                itemsGroups.push(group);
                //重新要group置为一个元素
                group = [item]
            } else {
                group.push(item)
            }

            if (index == typeList.length - 1) {
                itemsGroups.push(group)
            }
        })

        return itemsGroups;
    }

    renderGridView = () => {
        const {category} = this.props;
        let groups = this.rendenGroups(category.typeList);
        //可以设置滚动
        // this._flatList.scrollToOffset({animated: true, offset: 2000});
        return (
            <FlatList style={styles.flatlist}
                // data={ this.state.sourceData }
                data={ groups }
                // extraData={ this.state.selected }
                keyExtractor={ this._keyExtractor }
                renderItem={ this._renderItem }
                ListEmptyComponent={ this._renderEmptyView }
                refreshing={ category.loading }
                // numColumns ={3}
                onRefresh={ this._renderRefresh }
                // 是一个可选的优化，用于避免动态测量内容，+1是加上分割线的高度
                // getItemLayout={(data, index) => ( { length: 100, offset: (100 + 1) * index, index } )}
            />

        )

    };

    // 下拉刷新
    _renderRefresh = () => {
        const { actions } = this.props;
        actions.getDataAction();
    };

    render() {
        const { params } = this.props.navigation.state;

        if (params !== undefined && params.isFirst == true) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.detailTitle}>
                            请选择您感兴趣的1-5个类别
                        </Text>
                    </View>
                    {this.renderGridView()}

                    <SafeAreaView>
                        <Button
                            onPress={() => this.confirButtonAction()}
                            containerStyle={styles.confirmBtn}
                            textStyle={styles.confirmBtnText}
                        />
                    </SafeAreaView>
                </View>

            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.detailTitle}>
                        请选择您感兴趣的1-5个类别
                    </Text>
                </View>
                {this.renderGridView()}
            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',

    },
    header:{
        padding:10,
        backgroundColor: '#fcfcfc'
    },
    detailTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black'
    },
    confirmBtn: {
        margin: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#3e9ce9',
    },
    confirmBtnText: {
        textAlign:'center',
        color:'#fff',
        fontSize: 20
    },
    no_data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },
    flatlist: {
        flex:1,
    },

    group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    categoryBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    categoryText: {
        fontSize: 16,
        textAlign: 'center'
    },

});


export default Category;
//AppRegistry.registerComponent('NativeRNApp', () => NativeRNApp);

