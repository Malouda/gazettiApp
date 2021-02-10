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
import forgotPasswordAction from '../../actions/login/forgotPasswordAction';
import LoaderComponent from '../LoaderComponent';

const {height,width}=Dimensions.get('window');


class RecoverPasswordComponent extends React.Component{

    constructor(){
        super();

        this.state={
            oldMobileNumber:'',
            invitorNobileNumber:'',
            showLoader:false
        };

        this.submit=this.submit.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Recover Password',
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
            oldMobileNumber:this.state.oldMobileNumber,
            invitorNobileNumber:this.state.invitorNobileNumber,
        };

        this.setState({
           showLoader:true
        });

        this.props.forgotPasswordAction(data).then((x)=>{

            this.setState({
                showLoader:false
            });

            if(x){
                this.props.navigateTo('Code');
            }
        })

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

            if(this.state.oldMobileNumber!=='' && this.state.invitorNobileNumber!==''){

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

        const submitError=()=>{

            if(this.props.forgotPasswordNodetails !== null){

                return(
                    <Text style={uStyles.errorText}>{this.props.forgotPasswordNodetails}</Text>
                )
            }

        };


        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    {submitError()}
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Mobile Number"
                            underlineColorAndroid="#fff"
                            keyboardType='phone-pad'
                            value={this.state.oldMobileNumber}
                            onChange={(event) => this.setState({oldMobileNumber:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Invitors Mobile Number"
                            underlineColorAndroid="#fff"
                            keyboardType='phone-pad'
                            value={this.state.invitorNobileNumber}
                            onChange={(event) => this.setState({invitorNobileNumber:event.nativeEvent.text})}
                        />
                    </View>
                    {showSubmitLoader()}
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
    }
});


function mapStateToProps(state) {

    return {
        forgotPasswordNodetails:state.forgotPasswordNodetailsReducer,
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            forgotPasswordAction:forgotPasswordAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RecoverPasswordComponent)
