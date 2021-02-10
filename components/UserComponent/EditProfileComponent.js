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
import ImageComponent from '../ImageComponent';
import UploadImageComponent from '../UploadImageComponent';
import getallGendersAction from '../../actions/gender/getallGendersAction';
import editProfileAction from '../../actions/user/editProfileAction';
import LoaderComponent from '../LoaderComponent';
import insertImageUploadUrlAction from '../../actions/ImageUpload/insertImageUploadUrlAction';


const {height,width}=Dimensions.get('window');


class EditProfileComponent extends React.Component{

    constructor(){
        super();

        this.state={
            fname:'',
            lname:'',
            email:'',
            age:'',
            gender_id:'',
            showLoader:false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Edit Profile',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon name="home" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#0D47A1" />
            </TouchableOpacity>
        )
    });

    componentWillMount(){
        this.props.getallGendersAction();

        this.setState({
            fname:this.props.userData[0].fname,
            lname:this.props.userData[0].lname,
            email:this.props.userData[0].email,
            age:this.props.userData[0].age.toString(),
            gender_id:parseInt(this.props.userData[0].gender_id),
        });

        this.props.insertImageUploadUrlAction(this.props.userData[0].profile_picture_url);
    }

    submit(){

        let url='';
        if(this.props.imageUploadReducer!==null){

            url=this.props.imageUploadReducer.split('/');
            url=url[url.length-1];
        }

        let data={
            fname:this.state.fname,
            lname:this.state.lname,
            email:this.state.email,
            age:this.state.age,
            gender_id:this.state.gender_id,
            img_url:url,
        };

        this.setState({
            showLoader:true,
        });

        this.props.editProfileAction(data).then((x)=>{

            this.setState({
                showLoader:false,
            });

            if(x){
                this.setState({
                    fname:'',
                    lname:'',
                    email:'',
                    age:'',
                    gender_id:'',
                });
            }
        });
    }



    render(){

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

        const showSubmitLoader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };


        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View style={localStyles.product}>
                            <Text>User Name</Text>
                        </View>
                        <View  style={localStyles.product}>
                            <Text>{this.props.userData[0].username}</Text>
                        </View>
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="First name"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.fname}
                            onChange={(event) => this.setState({fname:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Last name"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.lname}
                            onChange={(event) => this.setState({lname:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="email"
                            underlineColorAndroid="#fff"
                            keyboardType='email-address'
                            value={this.state.email}
                            onChange={(event) => this.setState({email:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Age"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.age}
                            onChange={(event) => this.setState({age:event.nativeEvent.text})}
                        />
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
                    <View style={[uStyles.row,localStyles.productContainer]}>
                        <View  style={localStyles.product}>
                            <Text>Profile Picture</Text>
                        </View>
                    </View>
                    <ImageComponent/>
                    <UploadImageComponent/>
                    {showSubmitLoader()}
                    <View style={uStyles.row}>
                        <View style={uStyles.buttonContainer}>
                            <View style={uStyles.buttonSubContainer}>
                                <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submit()}>
                                    <Text style={uStyles.dashBoardButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={uStyles.buttonContainer}>
                            <View style={uStyles.buttonSubContainer}>
                                <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('changePassword')}>
                                    <Text style={uStyles.dashBoardButtonText}>Change Password</Text>
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
        backgroundColor:'#fff'
    },
    container:{

    },
    logoContainer:{

    },
    textInput:{
    },
    product:{
        flex:1
    },
    productContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:70,
    }
});


function mapStateToProps(state) {

    return {
        allGenders:state.allGendersReducer,
        userData:state.userDataReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getallGendersAction:getallGendersAction,
            editProfileAction:editProfileAction,
            insertImageUploadUrlAction:insertImageUploadUrlAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileComponent)
