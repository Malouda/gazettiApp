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
import getAllLocationsAction from '../../actions/location/getAllLocationsAction';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UploadImageComponent from '../UploadImageComponent';
import LoaderComponent from '../LoaderComponent';
import  createPublisherAction from '../../actions/publishers/createPublisherAction'


const {height,width}=Dimensions.get('window');


class CreatePublisherComponent extends React.Component{

    constructor(){
        super();

        this.state={
            publisher_name:'',
            publisher_email:'',
            publisher_phone:'',
            maximum_employees:'',
            expiryDate:'',
            isDateTimePickerVisible:false,
            location_id:'',
            account_status:'',
            showLoader:false,
        };

        this.showDateTimePicker=this.showDateTimePicker.bind(this);
        this.hideDateTimePicker=this.hideDateTimePicker.bind(this);
        this.handleDatePicked=this.handleDatePicked.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Create Publisher',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        this.props.getAllLocationsAction();
    }

    createPublisher(){

        this.setState({
            showLoader:true
        });

        let url=this.props.imageUploadReducer.split('/');
        url=url[url.length-1];

        let data={
            publisher_name:this.state.publisher_name,
            publisher_email:this.state.publisher_email,
            publisher_phone:this.state.publisher_phone,
            maximum_employees:this.state.maximum_employees,
            expiryDate:this.state.expiryDate,
            location_id:this.state.location_id,
            account_status:this.state.account_status,
            logo_url:url
        };

        this.props.createPublisherAction(data).then((x)=>{

            if (x){
                this.setState({
                    showLoader:false
                })
            }
        })

    }


    showDateTimePicker(){

        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker (){
        this.setState({ isDateTimePickerVisible: false });
    }

    handleDatePicked(date){

        let date2= date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();


        this.setState({
            expiryDate:date2

        });
        this.hideDateTimePicker();
    }


    render(){

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
                            placeholder="Publisher Name"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.publisher_name}
                            onChange={(event) => this.setState({publisher_name:event.nativeEvent.text})}
                        />
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
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Email"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.publisher_email}
                            onChange={(event) => this.setState({publisher_email:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Phone"
                            underlineColorAndroid="#fff"
                            keyboardType='phone-pad'
                            value={this.state.publisher_phone}
                            onChange={(event) => this.setState({publisher_phone:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Maximum Employees"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.maximum_employees}
                            onChange={(event) => this.setState({maximum_employees:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[uStyles.row,localStyles.DateComponentContainer]}>
                        <View style={localStyles.textInputContainer}>
                            <View style={[localStyles.textInput,uStyles.textInput]}>
                                <TextInput
                                    placeholder="Date"
                                    underlineColorAndroid="#fff"
                                    editable={false}
                                    value={this.state.expiryDate}
                                />
                            </View>
                        </View>
                        <View style={localStyles.buttonContainer}>
                            <View style={uStyles.buttonSubContainer}>
                                <TouchableOpacity style={uStyles.button} onPress={this.showDateTimePicker}>
                                    <Text style={uStyles.buttonText}>Select Date</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={(date)=>this.handleDatePicked(date)}
                            onCancel={this.hideDateTimePicker}
                        />
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.account_status}
                            onValueChange={(itemValue, itemIndex) => this.setState({account_status:itemValue})}
                        >
                            <Picker.Item label='Select Status' value='' enabled={false}/>
                            <Picker.Item label='Active' value='1' enabled={false}/>
                            <Picker.Item label='30 days' value='0' enabled={false}/>

                        </Picker>
                    </View>
                    <UploadImageComponent/>
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={() => this.createPublisher()}>
                                <Text style={uStyles.dashBoardButtonText}>Create</Text>
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
    textInputContainer:{
        flex:2,
        marginBottom:20
    },
});


function mapStateToProps(state) {

    return {
        allLocations:state.allLocations,
        imageUploadReducer:state.imageUploadReducer

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllLocationsAction:getAllLocationsAction,
            createPublisherAction:createPublisherAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePublisherComponent)
