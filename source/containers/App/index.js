// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

// Instruments
import '../../theme/init';
import { store } from '../../init/store';

//Components
import Scheduler from '../../components/Scheduler';

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider store = { store }>
                <Scheduler />
            </Provider>
        );
    }
}
