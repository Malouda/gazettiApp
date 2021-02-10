import React from 'react';
import {
    StyleSheet,
    View,
    Stylesheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import Spinner from 'react-native-spinkit';



const {height,width}=Dimensions.get('window');


class LoaderComponent extends React.Component{

    constructor(){
        super();
    }


    render(){

        return(
          <View style={localStyles.loaderContainer}>
              <Spinner isVisible={true} size={20} type='Wave' color='#0D47A1'/>
          </View>
        )
    }
}


const localStyles=StyleSheet.create({

    loaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

});


function mapStateToProps(state) {

    return {

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoaderComponent)
