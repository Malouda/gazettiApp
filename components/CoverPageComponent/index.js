import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Stylesheet,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Picker,
    TouchableOpacity,
    Dimensions,
    StyleSheet

} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../styles';

const {height,width}=Dimensions.get('window');


class CoverPageComponent extends React.Component{

    constructor(){
        super();
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Employee Dashboard',
        drawerLabel: 'Home',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon name="home" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });



    render(){

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>

                </View>
            </ScrollView>
        )
    }
}


const localStyles=StyleSheet.create({

    mainView:{
    },
    container:{

    },
    logoContainer:{

    },
    textInput:{


    }
});


function mapStateToProps(state) {

    return {

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CoverPageComponent)
