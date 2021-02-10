import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Picker,
    TouchableOpacity,
    Dimensions,

} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Foundation';

import ImageComponent from '../ImageComponent';
import UploadImageComponent from '../UploadImageComponent';

const {height,width}=Dimensions.get('window');


class ProfileComponent extends React.Component{

    constructor(){
        super();
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Profile',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerLabel: 'Profile',
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
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon name="user" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>User Name</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].username :''}</Text>
                        </View>
                    </View>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon name="dots-two-vertical" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>First Name</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].fname :''}</Text>
                        </View>
                    </View>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon name="dots-two-vertical" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>Last Name</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].lname :''}</Text>
                        </View>
                    </View>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon2 name="email" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>Notification Email</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].email :''}</Text>
                        </View>
                    </View>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon name="hand" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>Age</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].age :''}</Text>
                        </View>
                    </View>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={[localStyles.product,uStyles.row]}>
                            <View style={localStyles.icon}>
                                <Icon3 name="torsos-male-female" size={30} color="#0D47A1" />
                            </View>
                            <Text style={uStyles.boldText}>Gender</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData!==null? this.props.userData[0].age :''}</Text>
                        </View>
                    </View>
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('EditProfile')}>
                                <Text style={uStyles.dashBoardButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const localStyles=StyleSheet.create({

    mainView:{
        backgroundColor:'#fff'
    },
    container:{

    },
    logoContainer:{

    },
    textInput:{
    },
    product:{
        flex:1,
        alignItems:'center'
    },
    productContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:70,
    },
    icon:{
        marginRight:15
    }
});


function mapStateToProps(state) {

    return {
        userData:state.userDataReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileComponent)
