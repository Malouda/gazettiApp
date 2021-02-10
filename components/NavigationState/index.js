import React, { Component } from 'react';
import { Text, View,StyleSheet,Image} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import { connect } from "react-redux";
import MyNavigator from '../../routes/routes';





class AppWithNavigationState extends Component {
    render() {
        return (
            <MyNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigationState
                })}
            />
        );
    }
}


function mapStateToProps(state){

    return {
        navigationState: state.nav
    }
};

export default connect(mapStateToProps)(AppWithNavigationState)