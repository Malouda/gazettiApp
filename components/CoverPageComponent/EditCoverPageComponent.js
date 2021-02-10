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
    RefreshControl


} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import getAllCoverPagesAction from '../../actions/coverPage/getAllCoverPagesAction';
import LoaderComponent from '../LoaderComponent';
import ImageComponent from '../ImageComponent';
import deleteCoverPageAction from '../../actions/coverPage/deleteCoverPageAction';
import blockCoverPageAction from '../../actions/coverPage/blockCoverPageAction';
import Spinner from 'react-native-spinkit';
import UploadImageComponent from '../UploadImageComponent';
import editCoverPageAction from '../../actions/coverPage/editCoverPageAction';


const {height,width}=Dimensions.get('window');


class EditCoverPageComponent extends React.Component{

    screenWitdth=null;

    constructor(){
        super();

        this.state={
            showLoader:false
        };

        this.deleteCoverPage=this.deleteCoverPage.bind(this);
        this.block=this.block.bind(this);
        this.submit=this.submit.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Edit Cover Page',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    componentWillMount (){

        this.setState({
            deleted:this.props.selectedCoverPage.cover_page_removed===1,
            blocked:this.props.selectedCoverPage.cover_page_blocked===1
        })

    }

    componentWillReceiveProps(nextProps){

        this.setState({
            allCoverPages:nextProps.allCoverPages
        });

    }

    deleteCoverPage(id){

        let unDelete=null;

        if(this.state.deleted){
            unDelete='unDelete'
        }

        this.setState({
            deleteLoading:true
        });

        let data={
            id:id,
            unDelete:unDelete,
            publication_id:this.props.selectedCoverPage.publication_id
        };

        this.props.deleteCoverPageAction(data).then((x)=>{

            if(x){

                this.setState({
                    deleteLoading:false,
                    deleted:!this.state.deleted
                });
            }
        })
    }

    block(id){

        let unBlock=null;

        if(this.state.blocked){
            unBlock='unBlock'
        }

        this.setState({
            blockLoading:true
        });

        let data={
            id:id,
            unBlock:unBlock,
            publication_id:this.props.selectedCoverPage.publication_id
        };

        this.props.blockCoverPageAction(data).then((x)=>{

            if(x){

                this.setState({
                    blockLoading:false,
                    blocked:!this.state.blocked
                });
            }
        })
    }

    submit(){

        if(this.props.selectedCoverPage!==null){

            this.setState({
                showLoader:true
            });

            this.props.editCoverPageAction({
                imgUrl:this.props.imageUploadReducer.split('/')[this.props.imageUploadReducer.split('/').length-1],
                coverPageID:this.props.selectedCoverPage.id
            }).then((x)=>{

                this.setState({
                    showLoader:false
                });

                if(x){

                }
            });
        }

    }



    render(){

        const showSubmitLoader=()=>{

            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };


        const isAbleToDelete=()=>{

            if(this.props.userData[0].id===this.props.selectedCoverPage.user_id  && this.props.userData[0].user_group_name==='Employee'){


                const loaderSpiner=()=>{

                    if(this.state.deleteLoading){
                        return(
                            <View style={localStyles.loaderContainer}>
                                <Spinner isVisible={true} size={20} type='ChasingDots' color='#FBC02D'/>
                            </View>
                        )

                    }
                };



                return(
                    <TouchableOpacity style={this.state.deleted?localStyles.dashBoardbuttonDeleted:uStyles.dashBoardbutton} onPress={()=>this.deleteCoverPage(this.props.selectedCoverPage.id)}>
                        <Text style={this.state.deleted?localStyles.dashBoardButtonTextDeleted:uStyles.dashBoardButtonText}>{this.state.deleted?'Deleted':'Delete'}</Text>
                        {loaderSpiner()}
                    </TouchableOpacity>
                )
            }
        };

        const isAbleToBlock=()=>{

            const loaderSpiner2=()=>{

                if(this.state.blockLoading){
                    return(
                        <View style={localStyles.loaderContainer}>
                            <Spinner isVisible={true} size={20} type='ChasingDots' color='#FBC02D'/>
                        </View>
                    )

                }
            };

            if(this.props.userData[0].user_group_name==='SystemAdmin' || this.props.userData[0].user_group_name==='SuperAdmin'){

                return(
                    <TouchableOpacity style={this.state.blocked?localStyles.dashBoardbuttonBlocked:uStyles.dashBoardbutton} onPress={()=>this.block(this.props.selectedCoverPage.id)}>
                        <Text style={this.state.blocked?localStyles.dashBoardButtonTextBlocked:uStyles.dashBoardButtonText}>{this.state.blocked?'Blocked':'Block'}</Text>
                        {loaderSpiner2()}
                    </TouchableOpacity>
                )

            }

        };


        const showNeimgtxt=()=>{

            if(this.state.imgUploaded){
                return(
                    <Text style={[uStyles.boldText,localStyles.oldImgtext]}>New Edited Cover Page</Text>
                )
            }
        };


        const image=()=>{

            if(this.props.selectedCoverPage!==null){


                return(
                    <View style={localStyles.imageContainer}>
                        <Text style={[uStyles.boldText,localStyles.oldImgtext]}>Old Cover Page</Text>
                        <ImageComponent image_url='/coverImages/' image={this.props.selectedCoverPage.cover_page_url} screenWidth={this.screenWitdth} width={this.screenWitdth}/>
                    </View>
                )

            }else {

                return(
                    <LoaderComponent/>
                )
            }
        };

        return(
            <ScrollView  style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    {image()}
                    {showNeimgtxt()}
                    <UploadImageComponent uploadedTrue={(x)=>this.setState({imgUploaded:x})}/>
                    {showSubmitLoader()}
                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submit()}>
                        <Text style={uStyles.dashBoardButtonText}>Submit</Text>
                    </TouchableOpacity>
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
    imageContainer:{
        marginBottom:15
    },
    loaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    dashBoardbuttonDeleted:{
        flex:1,
        height:40,
        padding:10,
        borderRadius:7,
        backgroundColor:'#0D47A1'
    },
    dashBoardButtonTextDeleted:{
        fontWeight:'700',
        color:'#fff',
        textAlign:'center',
    },
    dashBoardbuttonBlocked:{
        flex:1,
        height:40,
        padding:10,
        borderRadius:7,
        backgroundColor:'#0D47A1'
    },
    dashBoardButtonTextBlocked:{
        fontWeight:'700',
        color:'#fff',
        textAlign:'center',
    },
    oldImgtext:{
        fontWeight:'700',
        textAlign:'center'
    }
});


function mapStateToProps(state) {

    return {
        allCoverPages:state.allCoverPages,
        selectedCoverPage:state.selectedCoverPageReducer,
        userData:state.userDataReducer,
        imageUploadReducer:state.imageUploadReducer,
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllCoverPagesAction:getAllCoverPagesAction,
            deleteCoverPageAction:deleteCoverPageAction,
            blockCoverPageAction:blockCoverPageAction,
            editCoverPageAction:editCoverPageAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCoverPageComponent)
