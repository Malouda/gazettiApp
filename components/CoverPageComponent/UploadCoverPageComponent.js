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
import getAllPublications from '../../actions/publication/getAllPublications';
import UploadImageComponent from '../UploadImageComponent';
import config from '../../config/config';
import createCoverpageAction from '../../actions/coverPage/createCoverpageAction';
import LoaderComponent from '../LoaderComponent';
import getAllPerspectives from '../../actions/perspective/getAllPerspectives';


const {height,width}=Dimensions.get('window');


class UploadCoverPageComponent extends React.Component{

    constructor(){
        super();

        this.state={
            publication_id:'',
            perspective_id:'',
            release_date:'',
            showUploadingLoader:false
        };

        this.createCoverPage=this.createCoverPage.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title:'Upload Cover Pages',
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


    onPublicationChange(itemValue,itemIndex){

        let release_date='';

     /*   if(itemValue!==''){
            release_date=this.props.allPublications[itemIndex-1].release_date;
        }*/


        this.setState({
            publication_id:itemValue,
            //release_date:release_date
        })
    }

    createCoverPage(){

        let url='';
        if(this.props.imageUploadReducer!==null){

            url=this.props.imageUploadReducer.split('/');
            url=url[url.length-1];
        }

        let data={
            img_url:url,
            publication_id:this.state.publication_id,
            perspective_id:this.state.perspective_id,
            user_id:this.props.userData[0].id
        };

        this.setState({
            showUploadingLoader:true
        });

        let action=this.props.createCoverpageAction(data);

        action.then((x)=>{

            if (x){

                this.setState({
                    showUploadingLoader:false
                });
            }else {
                this.setState({
                    showUploadingLoader:false
                });
            }
        });
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

        const showReleaseDate=()=>{

            if(this.state.release_date!==''){
                return(
                    <View style={localStyles.releaseDateContainer}>
                        <Text>Release Date {this.state.release_date}</Text>
                    </View>
                )
            }
        };

        const uploadButton=()=>{

            if (this.props.imageUploadReducer!==null && this.state.publication_id!=='') {
                return (
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={() => this.createCoverPage()}>
                                <Text style={uStyles.dashBoardButtonText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }else {

                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <View style={uStyles.disabledDashButton}>
                                <Text style={uStyles.dashBoardButtonText}>Upload</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        };


        const showUploadingLoaderComponent=()=>{

            if(this.state.showUploadingLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };

        const maximumCoverPageReached=()=>{

            if(this.props.coverPageErrorReducer!==null){

                return(
                    <View style={localStyles.headlineError}>
                        <Text style={localStyles.headlineErrorText}>Sorry Maximum Uploading Reached</Text>
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
                            onValueChange={(itemValue, itemIndex) => this.onPublicationChange(itemValue,itemIndex)}
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
                    <View>
                    </View>
                    <View>
                        <UploadImageComponent/>
                    </View>
                    {showUploadingLoaderComponent()}
                    {maximumCoverPageReached()}
                    {uploadButton()}
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
    releaseDateContainer:{
        flex:1,
        alignItems:'center'
    },
    previewImgContainerImgNotLoaded:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:20,
    },
    previewImgContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#95a5a6',
        borderRadius:5
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
        userData:state.userDataReducer,
        allPerspectivesReducer:state.allPerspectivesReducer,
        coverPageErrorReducer:state.coverPageErrorReducer

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublications:getAllPublications,
            createCoverpageAction:createCoverpageAction,
            getAllPerspectives:getAllPerspectives

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadCoverPageComponent)
