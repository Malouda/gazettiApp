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
import UploadImageComponent from '../UploadImageComponent';
import getAllPublications from '../../actions/publication/getAllPublications';
import createHeadlineAction from '../../actions/headlines/createHeadlineAction';
import LoaderComponent from '../LoaderComponent';
import getAllPerspectives from '../../actions/perspective/getAllPerspectives';
import  nullFyImageuploadUrlAction from '../../actions/ImageUpload/nullFyImageuploadUrlAction';



const {height,width}=Dimensions.get('window');


class CreateHeadlineComponent extends React.Component{

    constructor(){
        super();

        this.state={
            publication_id:'',
            section_id:'',
            heading:'',
            sub_heading:'',
            note:'',
            perspective_id:'',
            showLoader:false
        };

    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Create Headline',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });
    componentWillMount (){

        this.props.getAllPublications();
        this.props.getAllPerspectives();
    }

    submitHeadLine(){

        this.setState({
            showLoader:true,
        });

        let url='';

        if(this.props.imageUploadReducer!==null){

            url=this.props.imageUploadReducer.split('/');
            url=url[url.length-1];
        }

        let data={
            publication_id:this.state.publication_id,
            section_id:this.state.section_id,
            heading:this.state.heading,
            sub_heading:this.state.sub_heading,
            note:this.state.note,
            perspective_id:this.state.perspective_id,
            image_url:url,
            user_id:this.props.userData[0].id
        };

        let send=this.props.createHeadlineAction(data);

        send.then((x)=>{
            this.setState({
                showLoader:false,
            });
            if(x){
                this.props.nullFyImageuploadUrlAction();
            }
        })
    }

    render(){

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

        const showSubmitLoader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };

        const submitButton=()=>{

         if(this.state.publication_id!=='' && this.state.heading!=='' && this.state.section_id!=='' && this.state.note!==''){

             return(
                 <View style={uStyles.buttonContainer}>
                     <View style={uStyles.buttonSubContainer}>
                         <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submitHeadLine()}>
                             <Text style={uStyles.dashBoardButtonText}>Submit Headlines</Text>
                         </TouchableOpacity>
                     </View>
                 </View>
             )
         }else{

             return(
                 <View style={uStyles.buttonContainer}>
                     <View style={uStyles.buttonSubContainer}>
                         <TouchableOpacity style={uStyles.disabledDashButton}>
                             <Text style={uStyles.dashBoardButtonText}>Submit Headlines</Text>
                         </TouchableOpacity>
                     </View>
                 </View>
             )
         }
        };

        const maximumHeadlinesReached=()=>{

            if(this.props.headlineErrorReducer!==null){

                return(
                    <View style={localStyles.headlineError}>
                        <Text style={localStyles.headlineErrorText}>Sorry Maximum headlines Reached</Text>
                    </View>
                )
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.publication_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({publication_id:itemValue})}
                        >
                            <Picker.Item label='Select Publication' value='' enabled={false}/>
                            {publications()}
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
                    <View style={uStyles.picker}>
                        <Picker
                            selectedValue={this.state.section_id}
                            onValueChange={(itemValue, itemIndex) => this.setState({section_id:itemValue})}
                        >
                            <Picker.Item label='Select Section' value='' enabled={false}/>
                            <Picker.Item label='Front Page' value='1'/>
                            <Picker.Item label='Middle Page' value='2'/>
                            <Picker.Item label='Last Page' value='3'/>
                        </Picker>
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Heading"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.heading}
                            onChange={(event) => this.setState({heading:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textInput]}>
                        <TextInput
                            placeholder="Sub Heading"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            value={this.state.sub_heading}
                            onChange={(event) => this.setState({sub_heading:event.nativeEvent.text})}
                        />
                    </View>
                    <View style={[localStyles.textInput,uStyles.textinputMultiline]}>
                        <TextInput
                            multiline = {true}
                            numberOfLines = {4}
                            maxLength = {200}
                            editable={true}
                            placeholder="Brief Note"
                            underlineColorAndroid="#fff"
                            keyboardType='default'
                            onChange={(event) => this.setState({note:event.nativeEvent.text})}
                        />
                    </View>
                    <UploadImageComponent/>
                    {showSubmitLoader()}
                    {maximumHeadlinesReached()}
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
    headlineError:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headlineErrorText:{
        textAlign:'center',
        color:'#F44336'
    }
});


function mapStateToProps(state) {

    return {
        allPublications:state.allPublicationsReducerState,
        imageUploadReducer:state.imageUploadReducer,
        allPerspectivesReducer:state.allPerspectivesReducer,
        userData:state.userDataReducer,
        headlineErrorReducer:state.headlineErrorReducer,

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublications:getAllPublications,
            createHeadlineAction:createHeadlineAction,
            getAllPerspectives:getAllPerspectives,
            nullFyImageuploadUrlAction:nullFyImageuploadUrlAction
        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateHeadlineComponent)
