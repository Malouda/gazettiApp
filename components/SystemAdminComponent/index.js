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
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo'

const {height,width}=Dimensions.get('window');


class SystemAdminComponent extends React.Component{

    constructor(){
        super();

        this.navigateTo=this.navigateTo.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'System Admin Dashboard',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerLabel: 'Home',
        drawerIcon:()=>(
            <Icon name="home" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    navigateTo(route){

        this.props.navigateTo(route);
    }



    render(){

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <Text>System Admin</Text>
                </View>
            </ScrollView>
        )
    }
}


const localStyles={

    mainView:{
        backgroundColor:'#fff'
    },
    container:{

    },
    logoContainer:{

    },
    textInput:{


    }
};


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

export default connect(mapStateToProps,mapDispatchToProps)(SystemAdminComponent)
