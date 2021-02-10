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
import Icon from 'react-native-vector-icons/Entypo';
import getAllGroupsAction from '../../actions/groups/getAllGroupsAction';
import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';
import inviteAction from '../../actions/invite/inviteAction';
import LoaderComponent from '../LoaderComponent';
import getAllPublications from '../../actions/publication/getAllPublications';


const {height,width}=Dimensions.get('window');


class InviteComponent extends React.Component{


    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Invite User',
        drawerLabel: 'Invite',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon name="add-user" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    constructor(){
        super();

        this.state={
            inputData:{
                groupname_id:'',
                publisher:'',
                phone:'',
                sendVia:'',
                email:'',
                publication_id:''
            },
            showLoader:false,
            showPublishers:false
        };

        this.onGroupChange=this.onGroupChange.bind(this);
        this.onPublisherChange=this.onPublisherChange.bind(this);
        this.sendInviteData=this.sendInviteData.bind(this);
        this.onchangeText=this.onchangeText.bind(this);

    }

    componentWillMount (){

        this.props.getAllGroupsAction();
        this.props.getAllPublishersAction();
        this.props.getAllPublications();

    }



    onGroupChange(itemValue){

        //find the employee and sub employee id's first
        this.props.allUserGroupsState.map((data,index)=>{

            if(data.user_group_name==='Employee'){
                this.employeeId=data.id;
            }else if(data.user_group_name==='SubEmployee'){
                this.SubEmployeeId=data.id;
            }
        });

        if (itemValue===this.employeeId || itemValue===this.SubEmployeeId){

            this.setState({
                inputData:{
                    groupname_id: itemValue,
                    publisher:this.state.inputData.publisher,
                    phone:this.state.inputData.phone,
                    email:this.state.inputData.email,
                    publication_id:this.state.inputData.publication_id
                },
                showPublishers:true
            });


        }else {

            this.setState({
                inputData:{
                    groupname_id: itemValue,
                    publisher:'',
                    phone:this.state.inputData.phone,
                    email:this.state.inputData.email,
                    publication_id:this.state.inputData.publication_id
                },
                showPublishers:false
            });
        }
    }

    onPublisherChange(itemValue){
        this.setState({
            inputData:{
                groupname_id: this.state.inputData.groupname_id,
                publisher: itemValue,
                phone:this.state.inputData.phone,
                email:this.state.inputData.email,
                publication_id:this.state.inputData.publication_id
            }
        });

    }

    onchangeText(text){
        this.setState({
            inputData:{
                groupname_id: this.state.inputData.groupname_id,
                publisher: this.state.inputData.publisher,
                phone: text,
                email:this.state.inputData.email,
                publication_id:this.state.inputData.publication_id
            }
        });

    }
    onchangeEmail(text){
        this.setState({
            inputData:{
                groupname_id: this.state.inputData.groupname_id,
                publisher: this.state.inputData.publisher,
                phone: this.state.inputData.phone,
                email:text,
                publication_id:this.state.inputData.publication_id
            }
        });

    }

    onchangePublication(text){
        this.setState({
            inputData:{
                groupname_id: this.state.inputData.groupname_id,
                publisher: this.state.inputData.publisher,
                phone: this.state.inputData.phone,
                email:this.state.inputData.email,
                publication_id:text
            }
        });

    }

    sendInviteData(){


        if(this.state.inputData.groupname_id==='' && this.state.inputData.publication_id===''){

        }else {
            if(this.state.inputData.email==='' || this.state.inputData.phone==='' ){

            }else {
                if(this.state.sendVia==='email'){

                    let sendData=this.props.inviteAction(this.state.inputData);

                    this.setState({
                        showLoader:true
                    });

                    sendData.then((x)=>{

                        this.setState({
                                showLoader:false
                            }
                        );

                        if(x){
                            this.setState({
                                    inputData:{
                                        groupname_id: '',
                                        publisher: '',
                                        email:'',
                                        phone: '',
                                    },
                                }
                            );
                        }

                    });
                }

            }

        }

    }


    render(){

        const publications=()=>{

            if (this.props.allPublications!==null){
                return this.props.allPublications.map((data,index)=>{
                    return(
                        <Picker.Item label={data.publication_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        const userGroups=()=>{


                if(this.props.allUserGroupsState!==null){

                    return this.props.allUserGroupsState.map((data,index)=>{
                        return(
                            <Picker.Item label={data.user_group_name} value={data.id} key={index} />
                            )
                    });
                }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };



        const publishers=()=>{

            if (this.props.allPublishersReducerState!==null){
                return this.props.allPublishersReducerState.map((data,index)=>{
                    return(
                        <Picker.Item label={data.publisher_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        const showPublishers=()=>{

            if(this.state.showPublishers){

                return(
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.inputData.publisher}
                            onValueChange={(itemValue, itemIndex) => this.onPublisherChange(itemValue)}
                        >
                            <Picker.Item label='Select Publisher' value='' enabled={false}/>
                            {publishers()}
                        </Picker>
                    </View>
                )

            }else {

                return(
                    <View/>
                )
            }
        };


        const Loader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }else {

                return(
                    <View/>
                )
            }
        };

        const selectVia=(()=>{

            if(this.state.sendVia === 'sms'){

                return(

                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="User Mobile Number"
                            underlineColorAndroid="#fff"
                            keyboardType='phone-pad'
                            onChange={(event) => this.onchangeText(event.nativeEvent.text)}
                            value={this.state.inputData.phone}
                        />
                    </View>
                )
            }else if(this.state.sendVia==='email') {
                return(
                    <View>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="User Email Address"
                                underlineColorAndroid="#fff"
                                keyboardType='email-address'
                                onChange={(event) => this.onchangeEmail(event.nativeEvent.text)}
                                value={this.state.inputData.email}
                            />
                        </View>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="User Mobile Number"
                                underlineColorAndroid="#fff"
                                keyboardType='phone-pad'
                                onChange={(event) => this.onchangeText(event.nativeEvent.text)}
                                value={this.state.inputData.phone}
                            />
                        </View>
                    </View>
                )
            }
        });



        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={uStyles.textInputContainer}>
                        <View style={uStyles.picker}>
                            <Picker
                                selectedValue={this.state.sendVia}
                                onValueChange={(itemValue, itemIndex) => this.setState({sendVia:itemValue})}
                            >
                                <Picker.Item label='Send Via' value='' enabled={false}/>
                                <Picker.Item label='Sms' value='sms'/>
                                <Picker.Item label='Email' value='email'/>
                            </Picker>
                        </View>
                        {selectVia()}
                        <View style={uStyles.picker}>
                            <Picker
                                selectedValue={this.state.inputData.groupname_id}
                                onValueChange={(itemValue, itemIndex) => this.onGroupChange(itemValue)}
                            >
                                <Picker.Item label='Select User Group' value='' enabled={false}/>

                                {userGroups()}

                            </Picker>
                        </View>
                        {showPublishers()}
                        <View style={uStyles.picker}>
                            <Picker
                                selectedValue={this.state.inputData.publication_id}
                                onValueChange={(itemValue, itemIndex) => this.onchangePublication(itemValue)}
                            >
                                <Picker.Item label='Select Publication' value='' enabled={false}/>
                                {publications()}
                            </Picker>
                        </View>
                    </View>
                    {Loader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.button} onPress={()=>this.sendInviteData()}>
                                <Text style={uStyles.buttonText}>Invite</Text>
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


    }
};


function mapStateToProps(state) {

    return {
        allUserGroupsState:state.allUserGroupsState,
        allPublishersReducerState:state.allPublishersReducerState,
        allPublications:state.allPublicationsReducerState,
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            getAllGroupsAction:getAllGroupsAction,
            getAllPublishersAction:getAllPublishersAction,
            inviteAction:inviteAction,
            getAllPublications:getAllPublications,

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(InviteComponent)
