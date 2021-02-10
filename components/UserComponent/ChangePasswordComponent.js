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
import LoaderComponent from '../LoaderComponent';
import changePasswordAction from '../../actions/user/changePasswordAction';

const {height,width}=Dimensions.get('window');


class ChangePasswordComponent extends React.Component{

    constructor(){
        super();

        this.state={
            newPassword:'',
            oldPassword:'',
            showLoader:''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Change Password',
        drawerLabel: 'Profile',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon2 name="face-profile" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    changePassword(){

        if(this.state.oldPassword!=='' && this.state.newPassword!==''){

            this.setState({
                showLoader:true
            });

            this.props.changePasswordAction({
                newPassword:this.state.newPassword,
                oldPassword:this.state.oldPassword
            }).then((x)=>{
                this.setState({
                    showLoader:false
                });
                if (x){

                    this.setState({
                        newPassword:'',
                        oldPassword:'',
                    })
                }

            })
        }
    }



    render(){

        let error=()=>{

            if(this.props.changePasswordError!==null){

                return(
                    <View style={localStyles.errorContainer}>
                        <Text style={localStyles.errorText}>Wrong Old Password</Text>
                    </View>
                )
            }
        };

        const showLoader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Old Password"
                            secureTextEntry={true}
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.oldPassword}
                            onChange={(event) => this.setState({oldPassword:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="New Password"
                            secureTextEntry={true}
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.newPassword}
                            onChange={(event) => this.setState({newPassword:event.nativeEvent.text})}
                        />
                    </View>
                    {error()}
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.changePassword()}>
                                <Text style={uStyles.dashBoardButtonText}>Submit</Text>
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
    errorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    errorText:{
        textAlign:'center',
        color:'#c0392b'
    }
});


function mapStateToProps(state) {

    return {
        changePasswordError:state.changePasswordErrorReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            changePasswordAction:changePasswordAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordComponent)
