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
import Icon from 'react-native-vector-icons/Ionicons';
import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';
import getAllLocationsAction from '../../actions/location/getAllLocationsAction';
import registerUserAction from '../../actions/user/registerUserAction';
import LoaderComponent from '../LoaderComponent';
import getallGendersAction from '../../actions/gender/getallGendersAction';
import logoutAction from '../../actions/login/logoutAction';



const {height,width}=Dimensions.get('window');


class RegisterComponent extends React.Component{

    constructor(){
        super();

        this.state={
            fname:'',
            lname:'',
            uname:'',
            email:'',
            phone:'',
            age:'',
            password:'',
            passwordConfirm:'',
            location_id:'',
            user_group_id:'',
            invite_token:'',
            gender_id:null,
            passwordNoMatch:false,
            registerLoader:false,
        };

        this.navigateTo=this.navigateTo.bind(this);
    }

    static navigationOptions = ({ navigation ,screenProps }) => ({
        headerTitle:'Registration',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={localStyles.hambergerMenu}>
                <Icon name="md-apps" size={30} color="#fff" />
                <Text style={localStyles.hambergerMenuText}>Login</Text>
            </TouchableOpacity>
        )
    });

    componentWillMount(){
        this.props.getAllPublishersAction();
        this.props.getAllLocationsAction();
        this.props.getallGendersAction();

    }


    navigateTo(route){

        this.props.navigateTo(route);
    }


    register(){

        //remove password no match error if any

        this.setState({
            passwordNoMatch:false
        });

        let data={
            fname:this.state.fname,
            lname:this.state.lname,
            email:this.state.email,
            phone:this.state.phone,
            age:this.state.age,
            gender_id:this.state.gender_id,
            uname:this.state.uname,
            password:this.state.password,
            location_id:this.state.location_id,
            invite_token:this.state.invite_token
        };

        console.log(data);

        let register=true;

        for (let i in data) {
            if (data[i] === '') {
                register = false;
                break;
            }
        }


        if(register){

            if(this.state.password === this.state.passwordConfirm){

                this.setState({
                    registerLoader:true
                });

                this.props.registerUserAction(data).then((x)=>{

                    this.setState({
                        registerLoader:false
                    });

                    if (x){

                        this.setState({
                            fname:'',
                            lname:'',
                            uname:'',
                            email:'',
                            phone:'',
                            age:'',
                            password:'',
                            passwordConfirm:'',
                            location_id:'',
                            user_group_id:'',
                            invite_token:'',
                            gender_id:null,

                        });
                    }
                })
            }else {

                this.setState({
                    passwordNoMatch:true
                })
            }

        }
    }



    render(){

        const showLoader=()=>{

            if(this.state.registerLoader){

                return(

                    <LoaderComponent/>
                )
            }

        };

        const passwordNoMatch=()=>{

            if(this.state.passwordNoMatch){

                return(
                    <View style={localStyles.passwordDonotMatchError}>
                        <Text style={localStyles.passwordDonotMatchErrorText}>Passwords Do not Match</Text>
                    </View>
                )
            }
        };


        const regiStrationError=()=>{

            if(this.props.registrationError!==null){

                return(
                    <View style={localStyles.regErrorContainer}>
                        <Text style={localStyles.regErrorText}>{this.props.registrationError.error}</Text>
                    </View>
                )
            }
        };

        const locations=()=>{

            if (this.props.allLocations!==null){
                return this.props.allLocations.map((data,index)=>{
                    return(
                        <Picker.Item label={data.location_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        const genders=()=>{

            if (this.props.allGenders!==null){
                return this.props.allGenders.map((data,index)=>{
                    return(
                        <Picker.Item label={data.gender_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };


        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]} keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Invitation Code"
                                underlineColorAndroid="#fff"
                                value={this.state.invite_token}
                                onChange={(event) => this.setState({invite_token:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="First Name"
                                underlineColorAndroid="#fff"
                                value={this.state.fname}
                                onChange={(event) => this.setState({fname:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Last Name"
                                underlineColorAndroid="#fff"
                                value={this.state.lname}
                                onChange={(event) => this.setState({lname:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Age"
                                keyboardType="numeric"
                                underlineColorAndroid="#fff"
                                value={this.state.age}
                                onChange={(event) => this.setState({age:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.gender_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({gender_id:itemValue})}
                        >
                            <Picker.Item label='Select Gender' value='' enabled={false}/>
                            {genders()}
                        </Picker>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="UserName(used for Login)"
                                underlineColorAndroid="#fff"
                                value={this.state.uname}
                                onChange={(event) => this.setState({uname:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid="#fff"
                                value={this.state.email}
                                onChange={(event) => this.setState({email:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Phone"
                                keyboardType="phone-pad"
                                underlineColorAndroid="#fff"
                                value={this.state.phone}
                                onChange={(event) => this.setState({phone:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    {passwordNoMatch()}
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Password"
                                underlineColorAndroid="#fff"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChange={(event) => this.setState({password:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Confirm Password"
                                underlineColorAndroid="#fff"
                                secureTextEntry={true}
                                value={this.state.passwordConfirm}
                                onChange={(event) => this.setState({passwordConfirm:event.nativeEvent.text})}
                            />
                        </View>
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.location_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({location_id:itemValue})}
                        >
                            <Picker.Item label='Select Location' value='' enabled={false}/>
                            {locations()}
                        </Picker>
                    </View>
                    {showLoader()}
                    {regiStrationError()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.button} onPress={()=>this.register()}>
                                <Text style={uStyles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    },
    passwordDonotMatchError:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10
    },
    passwordDonotMatchErrorText:{
        flex:1,
        textAlign:'center',
        fontWeight:'700',
        color:'#c0392b'
    },
    regErrorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:10,
    },
    regErrorText:{
        flex:1,
        textAlign:'center',
        fontWeight:'700',
        color:'#c0392b'
    },
    hambergerMenu:{
        flex:1,
        alignItems:'center',
        marginRight:40
    }
};


function mapStateToProps(state) {

    return {
        allLocations:state.allLocations,
        allPublishersReducerState:state.allPublishersReducerState,
        allGenders:state.allGendersReducer,
        registrationError:state.registrationErrorReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublishersAction:getAllPublishersAction,
            getAllLocationsAction:getAllLocationsAction,
            registerUserAction:registerUserAction,
            getallGendersAction:getallGendersAction,
            logoutAction:logoutAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterComponent)
