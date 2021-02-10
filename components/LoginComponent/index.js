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
import loggedInUserGroupAction from '../../actions/groups/loggedInUserGroupAction';
import loginAction from '../../actions/login/loginAction';
import Spinner from 'react-native-spinkit';


const {height,width}=Dimensions.get('window');


class LoginComponent extends React.Component{

    constructor(){
        super();

        this.state={
            group:'',
            username:'',
            password:'',
            lodingLoging:false
        };

        this.login=this.login.bind(this);
    }


    login(){

       /* if(this.state.group==='emply'){
            this.props.navigateTo('EmployeeDashboard')
            this.props.loggedInUserGroupAction('emply');

        }else if(this.state.group==='systmAdm'){
            this.props.navigateTo('SystemAdmin')
        }*/

       let data={
           username:this.state.username,
           password:this.state.password
       };

       if (this.state.username!=='' && this.state.password !==''){
           this.setState({
              lodingLoging:true
           });

           this.props.loginAction(data).then(()=>{

               this.setState({
                   lodingLoging:false
               });
           })
       }

    }


    render(){


        const loginButton=()=>{

            if (this.state.lodingLoging){

                return(
                    <View style={localStyles.disabledDashButton}>
                        <Text style={uStyles.dashBoardButtonText}>Loging in..</Text>
                        <View style={localStyles.loaderContainer}>
                            <Spinner isVisible={true} size={30} type='ThreeBounce' color='#FBC02D'/>
                        </View>
                    </View>

                )
            }else {

                return(
                    <TouchableOpacity style={localStyles.button} onPress={()=>this.login()}>
                        <Text style={uStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                )
            }
        };

        const loginError=()=>{

            if(this.props.loginError){
                return(
                    <View style={localStyles.errorContainer}>
                        <Text style={localStyles.errorText}>Wrong Username or Password</Text>
                    </View>
                )

            }else {

                return(
                    <View style={localStyles.errorContainer}>
                        <Text style={{color:'#0D47A1'}}>Wrong Username or Password</Text>
                    </View>
                )
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}   keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={localStyles.logoContainer}>
                        <View style={localStyles.sublogoContainer}>
                            <Image
                                style={{width: 150, height:76,marginBottom:7}}
                                source={require('../../sys_images/logo.png')}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        {loginError()}
                        <View style={localStyles.textInput}>
                            <TextInput
                                style={localStyles.textInputColor}
                                placeholder="Username"
                                underlineColorAndroid="#fff"
                                placeholderTextColor="#9DC3C1"
                                keyboardType='default'
                                value={this.state.username}
                                onChange={(event) => this.setState({username:event.nativeEvent.text})}
                            />
                        </View>
                        <View style={localStyles.textInput}>
                            <TextInput
                                style={localStyles.textInputColor}
                                placeholder="Password"
                                underlineColorAndroid="#fff"
                                placeholderTextColor="#9DC3C1"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChange={(event) => this.setState({password:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.buttonContainer}>
                        <View style={localStyles.buttonSubContainer}>
                            {loginButton()}
                        </View>
                    </View>
                    <View style={localStyles.Mainregister}>
                        <View style={localStyles.register}>
                            <View style={uStyles.row}>
                                <TouchableOpacity style={localStyles.registerContainer1} onPress={()=>this.props.navigateTo('ForgotPassword','reset')}>
                                    <Text style={localStyles.registerText}>Forgot Password </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={localStyles.registerContainer2} onPress={()=>this.props.navigateTo('Register','reset')}>
                                    <Text style={localStyles.registerText}> Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}


const localStyles=StyleSheet.create({

    mainView:{
        backgroundColor:'#0D47A1'
    },
    container:{
      marginTop:height/8,
        backgroundColor:'#0D47A1'

    },
    logoContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30,
    },
    sublogoContainer:{
        borderBottomWidth:2,borderBottomColor:'#FBC02D',
        width:150
    },
    textInput:{
        height:40,
        marginBottom:20,
    },
    textInputColor:{
      color:'white'
    },
    loaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    errorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:25
    },
    errorText:{
        flex:1,
        textAlign:'center',
        fontWeight:'500',
        color:'#fff'
    },
    registerContainer1:{
        flex:2,
        justifyContent:'center',
        alignItems:'flex-end',
        marginTop:35,
        borderRightWidth:1,
        borderRightColor:'#27ae60'
    },
    registerContainer2:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:35,
    },
    registerText:{
        fontWeight:'700',
        color:'#27ae60',
        alignItems:'center'
    },
    picker:{
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:7,
        marginBottom:20
    },
    buttonSubContainer:{
        flex:1,
        marginLeft:5,
        alignItems:'center'
    },
    disabledDashButton:{
        flex:1,
        borderWidth:1,
        borderColor:'#fff',
        height:50,
        padding:10,
        width:200,

    },
    button:{
        flex:1,
        borderWidth:1,
        borderColor:'#fff',
        height:50,
        padding:10,
        width:200,
    },
    textInputContainer:{
        flex:1,
        marginBottom:50
    },
    Mainregister:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    register:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:200
    }
});


function mapStateToProps(state) {

    return {
        loginError:state.loginErrorReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            loggedInUserGroupAction:loggedInUserGroupAction,
            loginAction:loginAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
