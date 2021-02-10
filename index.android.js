/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider} from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import RootReducer from './reducers';
import AppWithNavigationState from './components/NavigationState';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import store  from './store'


console.disableYellowBox = true;

class GazettiClub extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('GazettiClub', () => GazettiClub);
