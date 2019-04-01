import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

class CounterContainer extends Component {

    render() {
        return (
            <Counter
                {...this.props}
            />
        );
    }
}


// export default connect(state => ({
//         state: state.counter   //counter 代表combineReducers中的关联的counter
//     }),
//     (dispatch) => ({
//         actions: bindActionCreators(counterActions, dispatch)
//     })
// )(CounterContainer);

const mapStateToProps = (state) => {
    //counter 代表combineReducers中的关联的counter
    const {counter} = state;
    return {
        counter
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(counterActions, dispatch);
    return {
        actions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
