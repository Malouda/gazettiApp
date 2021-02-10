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
import Icon from 'react-native-vector-icons/Ionicons';
import LoaderComponent from '../LoaderComponent';
import newPasswordAction from '../../actions/login/newPasswordAction';

const {height,width}=Dimensions.get('window');


class NewPasswordComponent extends React.Component{

    constructor(){
        super();

        this.state={
            newPassword:'',
            passwordConfirm:'',
            passwordNoMatch:false,
            showLoader:false,
            passwordChanged:false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'New Password',
        headerLeft:null,
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={localStyles.hambergerMenu}>
                <Icon name="md-apps" size={30} color="#fff" />
                <Text style={localStyles.hambergerMenuText}>Login</Text>
            </TouchableOpacity>
        )
    });

    submit(){

        let data={
            newPassword:this.state.newPassword,
            passwordConfirm:this.state.passwordConfirm,
            userId:this.props.userId
        };

        this.setState({
            passwordNoMatch:false
        });

        if (this.state.newPassword !== this.state.passwordConfirm){

            this.setState({
                passwordNoMatch:true
            });
        }else {

            this.setState({
                showLoader:true
            });

            this.props.newPasswordAction(data).then((x)=>{

                this.setState({
                    showLoader:false
                });

                if(x){

                    this.setState({
                        passwordChanged:true,
                        newPassword:'',
                        passwordConfirm:'',
                    });
                }

            })
        }

    }



    render(){

        const showSubmitLoader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };

        const submitButton=()=>{

            if(this.state.password!=='' && this.state.passwordConfirm!==''){

                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submit()}>
                                <Text style={uStyles.dashBoardButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }else{

                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.disabledDashButton}>
                                <Text style={uStyles.dashBoardButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        };

        const passwordNoMatch=()=>{

            if(this.state.passwordNoMatch){
                return(
                    <Text style={localStyles.errorText}>Passwords Do not Match</Text>
                )
            }
        };

        const passwordChanged=()=>{

            if(this.state.passwordChanged){
                return(
                    <Text style={uStyles.successText}>Password successfully changed</Text>
                )
            }
        };


        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    {passwordChanged()}
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="New Password"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            secureTextEntry={true}
                            value={this.state.newPassword}
                            onChange={(event) => this.setState({newPassword:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Password Confirm"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            secureTextEntry={true}
                            value={this.state.passwordConfirm}
                            onChange={(event) => this.setState({passwordConfirm:event.nativeEvent.text})}
                        />
                    </View>
                    {showSubmitLoader()}
                    {passwordNoMatch()}
                    {submitButton()}
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
    errorText:{
        textAlign:'center',
        color:'#c0392b'
    }
});


function mapStateToProps(state) {

    return {
        userId:state.userIdReducer

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            newPasswordAction:newPasswordAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPasswordComponent)
