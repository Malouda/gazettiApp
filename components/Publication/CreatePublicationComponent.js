import React from 'react';
import {
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
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';
import getAllTypesAction from '../../actions/type/getAllTypesAction';
import getAllLanguagesAction from '../../actions/language/getAllLanguagesAction';
import getAllPerspectives from '../../actions/perspective/getAllPerspectives';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UploadImageComponent from '../UploadImageComponent';
import createPublicationAction from '../../actions/publication/createPublicationAction';
import LoaderComponent from '../LoaderComponent';
import moment from 'moment';

const {height,width}=Dimensions.get('window');


class createPublicationComponent extends React.Component{


    constructor(){
        super();


        this.state={
            publisher:'',
            showLoader:false,
            publicationName:'',
            type_id:'',
            language_id:'',
            perspective_id:'',
            description:'',
            weekly:false,
            daily:true,
            minimumHeadlines:'',
            maximumHeadlines:'',
            uploadDeadlineAccounts:'',
            logo_url:'',
            notification_email:'',
            isDateTimePickerVisible: false,
            isTimePickerVisible:false,
            releaseTime:'',
            numbOfDates:1,
            maximumDates:12,
            otherDates:{},
            daysOfweek:{},
            selectedDay:{
                day:null
            }
        };
        this.radioButton=this.radioButton.bind(this);
        this.showDateTimePicker=this.showDateTimePicker.bind(this);
        this.showTimePicker=this.showTimePicker.bind(this);
        this.hideDateTimePicker=this.hideDateTimePicker.bind(this);
        this.handleDatePicked=this.handleDatePicked.bind(this);
        this.showDates=this.showDates.bind(this);
        this.addDate=this.addDate.bind(this);
        this.cancelDate=this.cancelDate.bind(this);
        this.createPublication=this.createPublication.bind(this);

    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Create Publication',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        this.props.getAllPublishersAction();
        this.props.getAllTypesAction();
        this.props.getAllLanguagesAction();
        this.props.getAllPerspectives();

    }

    onPublisherChange(itemValue){
        this.setState({
            publisher: itemValue,
        });

    }
    showDateTimePicker(i){
        this.selectedDate=i;

        this.setState({ isDateTimePickerVisible: true });
    }
    showTimePicker(){
        this.setState({ isTimePickerVisible: true });
    }

    hideDateTimePicker (){
        this.setState({ isDateTimePickerVisible: false });
    }

    hideTimePicker (){
        this.setState({ isTimePickerVisible: false });
    }

    handleDatePicked(date){


        let key='date' + this.selectedDate;


        let date2= date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();

        const otherDates= Object.assign({}, this.state.otherDates, {
            [key]:date2
        });

        this.setState({
               otherDates:otherDates

        },()=>console.log(this.state));
        this.hideDateTimePicker();
    }

    handleTimePicked(time){

        console.log(moment(time).format("hh:mm:ss a"));

        this.setState({
            releaseTime:moment(time).format("hh:mm:ss a")
        });

        this.hideTimePicker();
    }

    createPublication(){

        let url=null;

        if(this.props.imageUploadReducer!==null){

            url=this.props.imageUploadReducer.split('/');
            url=url[url.length-1];
        }

        let data={
            publisher:this.state.publisher,
            publicationName:this.state.publicationName,
            type_id:this.state.type_id,
            language_id:this.state.language_id,
            perspective_id:this.state.perspective_id,
            description:this.state.description,
            weekly:this.state.weekly,
            selectedDay:this.state.selectedDay.day,
            daily:this.state.daily,
            otherDates:this.state.otherDates,
            minimumHeadlines:this.state.minimumHeadlines,
            maximumHeadlines:this.state.maximumHeadlines,
            uploadDeadlineAccounts:this.state.uploadDeadlineAccounts,
            logo_url:url,
            notification_email:this.state.notification_email,
            time:this.state.releaseTime
        };

        if(
                this.state.publisher!=='' &&
                this.state.publicationName!=='' &&
                this.state.type_id!=='' &&
                this.state.language_id!=='' &&
                this.state.perspective_id!=='' &&
                this.state.description!=='' &&
                this.state.minimumHeadlines!=='' &&
                this.state.maximumHeadlines!=='' &&
                this.uploadDeadlineAccounts!=='' &&
                this.state.notification_email!=='' &&
                this.state.time!==''
        ){

            if(
                this.state.weekly!=='' ||
                this.state.selectedDay.day!=='' ||
                this.state.daily!==''
            ){

                this.setState({
                    showLoader:true
                });

                this.props.createPublicationAction(data).then((x)=>{

                    this.setState({
                        showLoader:false
                    });

                    if(x){

                    }
                });

            }
        }

    }

    cancelDate(){

        if(this.state.numbOfDates!==1){
            let numbOfDates=this.state.numbOfDates - 1;
            let key='date' + numbOfDates;

            let Object=this.state.otherDates;
            delete Object[key];


            this.setState({
                numbOfDates:this.state.numbOfDates - 1,
                otherDates:Object
            });
        }
    }

    radioButton(){

        const daily=()=>{

            if(this.state.daily){

                return(
                    <View style={localStyles.radiobuttonContainer}>
                        <View style={localStyles.radioSelectedbuttonSubContainer}>
                            <TouchableOpacity style={localStyles.selectedradiodashBoardbutton} onPress={()=>this.setState({daily:!this.state.daily})}>
                                <Text style={localStyles.selectedradiodashBoardButtonText}>Daily</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }else {
                return(
                    <View style={localStyles.radiobuttonContainer}>
                        <View style={localStyles.radiobuttonSubContainer}>
                            <TouchableOpacity style={localStyles.radiodashBoardbutton} onPress={()=>this.setState({daily:!this.state.daily,weekly:false,otherDates:{},numbOfDates:1,selectedDay:{day:null},daysOfweek:{}},()=>{console.log('state',this.state)})}>
                                <Text style={localStyles.radiodashBoardButtonText}>Daily</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        };

        const weekly=()=>{

            if(this.state.weekly){

                return(
                    <View style={localStyles.radiobuttonContainer}>
                        <View style={localStyles.radioSelectedbuttonSubContainer}>
                            <TouchableOpacity style={localStyles.selectedradiodashBoardbutton} onPress={()=>this.setState({weekly:!this.state.weekly,selectedDay:{day:null},daysOfweek:{}})}>
                                <Text style={localStyles.selectedradiodashBoardButtonText}>Weekly</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }else {
                return(
                    <View style={localStyles.radiobuttonContainer}>
                        <View style={localStyles.radiobuttonSubContainer}>
                            <TouchableOpacity style={localStyles.radiodashBoardbutton} onPress={()=>this.setState({weekly:!this.state.weekly,daily:false,otherDates:{},numbOfDates:1})}>
                                <Text style={localStyles.radiodashBoardButtonText}>Weekly</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        };

        let showWeekly=()=>{

            if(this.state.weekly){
                return(
                    <View style={localStyles.weeklyRow}>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.mon===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{mon:1},selectedDay:{day:2}})}
                        >
                            <Text style={this.state.daysOfweek.mon===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Mon</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.tue===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{tue:1},selectedDay:{day:3}})}
                        >
                            <Text style={this.state.daysOfweek.tue===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Tue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.wedn===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{wedn:1},selectedDay:{day:4}})}
                        >
                            <Text style={this.state.daysOfweek.wedn===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Wed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.thur===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{thur:1},selectedDay:{day:5}})}
                        >
                            <Text style={this.state.daysOfweek.thur===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Thur</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.frid===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{frid:1},selectedDay:{day:6}})}
                        >
                            <Text style={this.state.daysOfweek.frid===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Frid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.sat===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{sat:1},selectedDay:{day:7}})}
                        >
                            <Text style={this.state.daysOfweek.sat===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Sat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[uStyles.row,this.state.daysOfweek.sun===1?localStyles.weeklyBoxSelected:localStyles.weeklyBox]}
                                          onPress={()=>this.setState({daysOfweek:{sun:1},selectedDay:{day:1}})}
                        >
                            <Text style={this.state.daysOfweek.sun===1? localStyles.weeklyBoxSelectedText:localStyles.weeklyText}>Sun</Text>
                        </TouchableOpacity>
                    </View>
                )

            }
        };


        const showdailyDays=()=>{
            if(this.state.daily){

                return(
                    <View style={localStyles.weeklyRow}>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#3498db" />
                            <Text>Mon</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#a70500" />
                            <Text>Tue</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#a70500" />
                            <Text>Wed</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#3498db" />
                            <Text>Thur</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#a70500" />
                            <Text>Frid</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#a70500" />
                            <Text>Sat</Text>
                        </View>
                        <View style={uStyles.row}>
                            <Icon name="dot-single" size={20} color="#3498db" />
                            <Text>Sun</Text>
                        </View>
                    </View>

                )
            }
        };

        return(
           <View>
               <Text style={localStyles.radiodashBoardButtonText}>Edition Frequency</Text>
               {showdailyDays()}
               {showWeekly()}
               <View style={uStyles.row}>
                   <Icon2 name="calendar" size={50} color="#a70500" />
                   {daily()}
                   {weekly()}
               </View>
           </View>

        )
    }

    addDate(){

        if(this.state.numbOfDates!==12){
            this.setState({
                numbOfDates:this.state.numbOfDates+1
            });
        }

    }

    showDates(){

        let numbOfDates=this.state.numbOfDates;


        return(
            <View>
                {Array.apply(0,Array(numbOfDates)).map((x,i)=>{

                    return(
                        <View style={[uStyles.row,localStyles.DateComponentContainer]} key={i}>
                            <View style={localStyles.textInputContainer}>
                                <View style={[localStyles.textInput,uStyles.textInput]}>
                                    <TextInput
                                        placeholder="Date"
                                        underlineColorAndroid="#fff"
                                        editable={false}
                                        value={this.state.otherDates['date'+i]? this.state.otherDates['date'+i]:''}
                                    />
                                </View>
                            </View>
                            <View style={localStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.button} onPress={(e)=>this.showDateTimePicker(i)}>
                                        <Text style={uStyles.buttonText}>Select Date</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })

                }</View>
        )


    }



    render(){


        const showTime=()=>{

            return(
                <View style={[uStyles.row,localStyles.DateComponentContainer]}>
                    <View style={localStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Time"
                                underlineColorAndroid="#fff"
                                editable={false}
                                value={this.state.releaseTime}
                            />
                        </View>
                    </View>
                    <View style={localStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.button} onPress={()=>this.showTimePicker()}>
                                <Text style={uStyles.buttonText}>Select Release Time</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
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

        const types=()=>{

            if (this.props.allTypesReducer!==null){
                return this.props.allTypesReducer.map((data,index)=>{
                    return(
                        <Picker.Item label={data.type_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        const languages=()=>{

            if (this.props.allLanguagesReducer!==null){
                return this.props.allLanguagesReducer.map((data,index)=>{
                    return(
                        <Picker.Item label={data.language_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        const perspectives=()=>{

            if (this.props.allPerspectivesReducer!==null){
                return this.props.allPerspectivesReducer.map((data,index)=>{
                    return(
                        <Picker.Item label={data.perspective_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };


        const showOther=()=>{

            if(this.state.daily===false && this.state.weekly===false){

                return(
                    <View>
                        <View style={uStyles.row}>
                            <TouchableOpacity style={[uStyles.row,localStyles.addDateContainer]} onPress={()=>this.addDate()}>
                                <View style={localStyles.addDateIcon}>
                                    <Icon3 name="ios-add-circle-outline" size={30} color="#a70500" />
                                </View>
                                <View>
                                    <Text style={localStyles.addDateText}>Add</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={[localStyles.addDateText,localStyles.numberOfDates]}>{this.state.numbOfDates}</Text>
                            </View>
                            <TouchableOpacity style={[uStyles.row,localStyles.addDateContainer]} onPress={this.cancelDate}>
                                <View style={localStyles.addDateIcon}>
                                    <Icon4 name="cancel" size={30} color="#a70500" />
                                </View>
                                <View>
                                    <Text style={localStyles.addDateText}>Remove</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.showDates()}
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
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.publisher}
                            onValueChange={(itemValue, itemIndex) => this.onPublisherChange(itemValue)}
                        >
                            <Picker.Item label='Select Publisher' value='' enabled={false}/>
                            {publishers()}
                        </Picker>
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Publication Name"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.publicationName}
                            onChange={(event) => this.setState({publicationName:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.type_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({type_id:itemValue})}
                        >
                            <Picker.Item label='Select Type' value=''/>
                            {types()}
                        </Picker>
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.language_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({language_id:itemValue})}
                        >
                            <Picker.Item label='Select Language' value=''/>
                            {languages()}
                        </Picker>
                    </View>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.perspective_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({perspective_id:itemValue})}
                        >
                            <Picker.Item label='Select Perspective' value=''/>
                            {perspectives()}
                        </Picker>
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Description"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.description}
                            onChange={(event) => this.setState({description:event.nativeEvent.text})}
                        />
                    </View>
                    {this.radioButton()}
                    {showOther()}
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date)=>this.handleDatePicked(date)}
                        onCancel={this.hideDateTimePicker}
                    />
                    <DateTimePicker
                        isVisible={this.state.isTimePickerVisible}
                        onConfirm={(time)=>this.handleTimePicked(time)}
                        onCancel={this.hideTimePicker}
                        mode="time"
                    />
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Minimum Headlines"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.minimumHeadlines}
                            onChange={(event) => this.setState({minimumHeadlines:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Maximum Headlines"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.maximumHeadlines}
                            onChange={(event) => this.setState({maximumHeadlines:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Upload Deadline Accounts"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.uploadDeadlineAccounts}
                            onChange={(event) => this.setState({uploadDeadlineAccounts:event.nativeEvent.text})}
                        />
                    </View>
                    {showTime()}
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Minimum Headlines"
                            underlineColorAndroid="#fff"
                            keyboardType='numeric'
                            value={this.state.minimumHeadlines}
                            onChange={(event) => this.setState({minimumHeadlines:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Notification email"
                            underlineColorAndroid="#fff"
                            keyboardType='email-address'
                            value={this.state.notification_email}
                            onChange={(event) => this.setState({notification_email:event.nativeEvent.text})}
                        />
                    </View>
                    <UploadImageComponent/>
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={() => this.createPublication()}>
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
    row:{
        flex:1,
        flexDirection:'row'
    },
    weeklyRow:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:25
    },
    radiobuttonContainer:{
        flex:1,
        marginBottom:20
    },
    radiobuttonSubContainer:{
        height:50,

    },
    radioSelectedbuttonSubContainer:{
        height:50,
        backgroundColor:'#3498db'

    },
    radiodashBoardbutton:{
        flex:1,
        height:40,
        padding:10,
        borderWidth:1,
        borderColor:'#7f8c8d'
    },
    selectedradiodashBoardbutton:{
        flex:1,
        height:40,
        padding:10,
        borderWidth:1,
        borderColor:'#fff'
    },
    radiodashBoardButtonText:{
        fontWeight:'700',
        color:'#7f8c8d',
        textAlign:'center',
    },
    addDateText:{
        fontWeight:'700',
        color:'#7f8c8d',
        marginRight:10
    },
    numberOfDates:{
        borderWidth:2,
        borderColor:'#3498db',
        width:30,
        height:30,
        borderRadius:30/2,
        textAlign:'center',
    },
    selectedradiodashBoardButtonText:{
        fontWeight:'700',
        color:'#fff',
        textAlign:'center',
    },
    DateComponentContainer:{
    },
    addDateContainer:{
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    addDateIcon:{
        marginRight:15
    },
    buttonContainer:{
        flex:2,
        marginLeft:5
    },
    textInputContainer:{
        flex:2,
        marginBottom:20
    },
    weeklyBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#eee',
        height:30
    },
    weeklyBoxSelected:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#eee',
        height:30,
        backgroundColor:'#3498db'
    },
    weeklyText:{

    },
    weeklyBoxSelectedText:{
        color:'#fff'
    }
});


function mapStateToProps(state) {

    return {
        allPublishersReducerState:state.allPublishersReducerState,
        allTypesReducer:state.allTypesReducer,
        allLanguagesReducer:state.allLanguagesReducer,
        allPerspectivesReducer:state.allPerspectivesReducer,
        imageUploadReducer:state.imageUploadReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublishersAction:getAllPublishersAction,
            getAllTypesAction:getAllTypesAction,
            getAllLanguagesAction:getAllLanguagesAction,
            getAllPerspectives:getAllPerspectives,
            createPublicationAction:createPublicationAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(createPublicationComponent)
