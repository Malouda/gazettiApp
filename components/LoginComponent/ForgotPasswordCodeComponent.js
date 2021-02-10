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
import forgotPasswordCodeAction from '../../actions/login/forgotPasswordCodeAction';

const {height,width}=Dimensions.get('window');


class ForgotPasswordCodeComponent extends React.Component{

    constructor(){
        super();
        this.state={
            code:'',
            showLoader:false
        };
        this.submit=this.submit.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Insert Code',
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
            code:this.state.code,
        };

        this.setState({
            showLoader:true
        });

        this.props.forgotPasswordCodeAction(data).then((x)=>{

            this.setState({
                showLoader:false
            });

            if(x){

                this.props.navigateTo('NewPassword');
            }
        });
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

            if(this.state.code!==''){

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


        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <Text>Please Enter Activation Code below</Text>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Activation Code"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.code}
                            onChange={(event) => this.setState({code:event.nativeEvent.text})}
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

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            forgotPasswordCodeAction:forgotPasswordCodeAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPasswordCodeComponent)
