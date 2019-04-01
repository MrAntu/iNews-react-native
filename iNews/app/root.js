import React, {Component} from 'react';

import { Provider } from 'react-redux';
import configureStore from './store/store';
// import CounterContainer from './containers/counterContainer'
import App from './containers/app'

const store = configureStore();


class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>

        );
    }
}


export default Root;
