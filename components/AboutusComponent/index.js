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
import Icon2 from 'react-native-vector-icons/FontAwesome';
import sendViewsAction from '../../actions/views/sendViewsAction';
import LoaderComponent from '../LoaderComponent';
import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';


const {height,width}=Dimensions.get('window');


class AboutusComponent extends React.Component{

    constructor(){
        super();

        this.state={
            subject:'',
            views:'',
            publisher:'',
            showLoader:false
        };

        this.submitView=this.submitView.bind(this);
        this.onPublisherChange=this.onPublisherChange.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'About Us',
        drawerLabel: 'About Us',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon2 name="info" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        this.props.getAllPublishersAction();

    }

    onPublisherChange(itemValue){
        this.setState({
            publisher: itemValue,
        });

    }

    submitView(){

        if(this.state.subject!=='' && this.state.views!=='' && this.state.publisher!==null){

            this.setState({
                showLoader:true
            });

            this.props.sendViewsAction({
                views:this.state.views,
                subject:this.state.subject,
                publisher:this.state.publisher

            }).then((x)=>{

                this.setState({
                   showLoader:false
                });

                if (x){

                    this.setState({
                        subject:'',
                        views:''
                    })
                }
            })
        }
    }



    render(){
        const showLoader=()=>{

            if (this.state.showLoader){

                return(
                    <LoaderComponent/>
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

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <Text style={localStyles.heading}>About Us</Text>
                    <View style={localStyles.aboutUsContainer}>
                        <View style={localStyles.aboutUsSubContainer}>
                            <Text style={localStyles.heading2}>To Employees</Text>
                            <Text style={localStyles.aboutUsText}>
                                We at Gazetti Club, want to make sure you get the best service from us.
                                Please send us your comments, questions or suggestion using the form below.
                            </Text>
                        </View>
                        <View style={localStyles.aboutUsSubContainer}>
                            <Text style={localStyles.heading2}>To Agents/Vendors and Readers: Gazetti Club</Text>
                            <Text>
                                We at Gazetti Club, want to make sure you get the best service
                                from us and from all our member publications.
                                Please send us your comments, questions or suggestion using the form below.
                            </Text>
                        </View>
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.publisher}
                            onValueChange={(itemValue, itemIndex) => this.onPublisherChange(itemValue)}
                        >
                            <Picker.Item label='Select Publisher' value='' enabled={false}/>
                            <Picker.Item label='Gazetti Club' value='gazetti' enabled={false}/>
                            {publishers()}
                        </Picker>
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Subject"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.subject}
                            onChange={(event) => this.setState({subject:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Views"
                            multiline = {true}
                            numberOfLines = {4}
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.views}
                            onChange={(event) => this.setState({views:event.nativeEvent.text})}
                        />
                    </View>
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submitView()}>
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
    aboutUsContainer:{
        marginBottom:20
    },
    aboutUsText:{
    },
    heading:{
        fontWeight:'700',
        marginBottom:20
    },
    heading2:{
        fontWeight:'700',
        marginBottom:8
    },
    aboutUsSubContainer:{
        flex:1,
        justifyContent:'center',
        marginTop:15
    }
});


function mapStateToProps(state) {

    return {
        allPublishersReducerState:state.allPublishersReducerState,

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            sendViewsAction:sendViewsAction,
            getAllPublishersAction:getAllPublishersAction,

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutusComponent)
