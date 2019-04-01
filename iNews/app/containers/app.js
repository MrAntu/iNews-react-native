'use strict';
import {StackNavigator, TabNavigator} from 'react-navigation'
import MainContainer from './mainContainer'
import CategoryContainer from './categoryContainer'
import Feedback from '../pages/feedback/feedback'
import About from '../pages/about/about'
import Splash from '../pages/Splash/Splash';
import WebViewPage from '../pages/ItemDeitail/WebViewPage';


const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        Category: { screen: CategoryContainer },
        Feedback: { screen: Feedback },
        About: { screen: About }
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            //兼容安卓，要不然下面会有一条线
            indicatorStyle: {
                opacity: 0,
                height: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = StackNavigator(
    {
        Splash: { screen: Splash },
        Category: {
            screen: CategoryContainer
        },
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
       Web: { screen: WebViewPage }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

export default App;
