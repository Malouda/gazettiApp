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
import config from '../../config/config';
import deleteHeadlineAction from '../../actions/headlines/deleteHeadlineAction';
import blockHeadlineAction from '../../actions/headlines/blockHeadlineAction';
import LoaderComponent from '../LoaderComponent';
import RatingComponent from '../RatingComponent';
import getAllCommnentsAction from '../../actions/comment/getAllCommnentsAction';

const {height,width}=Dimensions.get('window');


class SelectedHeadlineComponent extends React.Component{

    constructor(){
        super();

        this.state={
            x: '',
            y: '',
            imgViewWidth: '',
            imgViewHeight: '',
            shwoLoader:false,
            blocked:false
        };

        this.measureView=this.measureView.bind(this);
        this.delete=this.delete.bind(this);
        this.edit=this.edit.bind(this);
        this.block=this.block.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Headline',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount () {

        this.props.getAllCommnentsAction({
            headline_id:this.props.selectedHeadline.id
        });

        this.setState({
            blocked:this.props.selectedHeadline.headline_blocked===1
        });
    }


    delete(){

        this.setState({
           shwoLoader:true
        });


        let data={
            headline_id:this.props.selectedHeadline.id,
            user_id:this.props.userData[0].id,
            publication_id:this.props.selectedHeadline.publication_id
        };

        this.props.deleteHeadlineAction(data).then((x)=>{

            this.setState({
                shwoLoader:false
            },()=>{

                if (x){
                    this.props.navigateTo('back');
                }
            });

        });
    }


    block(unblock=null){

        this.setState({
            shwoLoader:true,
        });


        let data={
            headline_id:this.props.selectedHeadline.id,
            user_id:this.props.userData[0].id,
            publication_id:this.props.selectedHeadline.publication_id,
            unblock:unblock
        };

        this.props.blockHeadlineAction(data).then((x)=>{

            this.setState({
                shwoLoader:false,
            },()=>{

                console.log('state',this.state.blocked)

              if (x){
                    //this.props.navigateTo('back');

                  this.setState({
                      blocked:!this.state.blocked
                  });
                }
            });

        });

    }


    edit(data){
        this.props.navigateTo('editHeadline');
    }

    measureView(event) {
        this.setState({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            imgViewWidth: event.nativeEvent.layout.width,
            imgViewHeight: event.nativeEvent.layout.height
        });
    }



    render(){

        const showLoader=()=>{

            if(this.state.shwoLoader){
                return(

                    <LoaderComponent/>
                )

            }

        };

        const isAbleToDelete=()=>{

            if(this.props.userData[0].id===this.props.selectedHeadline.user_id  && this.props.userData[0].user_group_name==='Employee'){
                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={this.delete}>
                                <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        };

        const isAbleToEdit=()=>{

            if(this.props.userData[0].id===this.props.selectedHeadline.user_id  && this.props.userData[0].user_group_name==='Employee'){
                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={this.edit}>
                                <Text style={uStyles.dashBoardButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        };

        const isAbleToBlock=()=>{

            if(this.props.userData!==null){

                if(this.props.userData[0].user_group_name==='SystemAdmin' || this.props.userData[0].user_group_name==='SuperAdmin'){

                    if(this.state.blocked===false){
                        return(
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.block()}>
                                        <Text style={uStyles.dashBoardButtonText}>Block</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }else {

                        return(
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={localStyles.dashBoardbuttonBlocked} onPress={()=>this.block('unblock')}>
                                        <Text style={localStyles.dashBoardButtonTextBlocked}>UnBlock</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }

                }

            }

        };




        let image=()=>{

            if(this.props.selectedHeadline!==null){

                if(this.props.selectedHeadline.image_url!==null){

                    Image.getSize(config.local.imgServer() +'/coverImages/'+ this.props.selectedHeadline.image_url,(width,height)=>{

                        let  ImgRatio=width/height;
                        let previewImgHeight=this.state.imgViewWidth/ImgRatio;

                        this.setState({
                            previewImgWidth:this.state.imgViewWidth-15,
                            previewImgHeight:previewImgHeight-15
                        });

                    });

                    return(
                        <View style={localStyles.image} onLayout={(event) => this.measureView(event)}>
                            <Image
                                style={{width: this.state.previewImgWidth, height:this.state.previewImgHeight}}
                                source={{uri:config.local.imgServer() +'/coverImages/'+ this.props.selectedHeadline.image_url}}
                            />
                        </View>
                    )

                }
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={localStyles.perspective}>
                        <Text style={localStyles.perspectiveText}>{this.props.selectedHeadline!==null? this.props.selectedHeadline.perspective_name:''}</Text>
                    </View>
                    <View style={localStyles.heading}>
                        <Text style={localStyles.headingText}>{this.props.selectedHeadline!==null? this.props.selectedHeadline.heading:''}</Text>
                    </View>
                    <View style={localStyles.sub_heading}>
                        <Text style={localStyles.sub_headingText}>{this.props.selectedHeadline!==null? this.props.selectedHeadline.subheading:''}</Text>
                    </View>
                    {image()}
                    <View style={localStyles.note}>
                        <Text style={localStyles.noteText}>
                            {this.props.selectedHeadline!==null? this.props.selectedHeadline.briefnote:''}
                        </Text>
                    </View>
                    <RatingComponent/>
                    <Text style={localStyles.numberComments}>{this.props.commentReducer!==null?this.props.commentReducer.length +' ':''}Comments</Text>
                    <TouchableOpacity style={localStyles.commentContainer} onPress={()=>this.props.navigateTo('commnent')}>
                        <View style={localStyles.comment}>
                            <Text style={localStyles.commentText}>Comments</Text>
                        </View>
                    </TouchableOpacity>
                    {showLoader()}
                    <View style={uStyles.row}>
                        {isAbleToBlock()}
                        {isAbleToDelete()}
                        {isAbleToEdit()}
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
        borderColor:'#eee',
        borderWidth:1,
        borderRadius:7,
        padding:15
    },
    logoContainer:{

    },
    textInput:{
    },
    perspective:{
        flex:1,
        marginBottom:25,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    perspectiveText:{
        color:'#34495e'
    },
    headingText:{
        fontWeight:'700',
        fontSize:20,
        color:'#000'
    },
    sub_headingText:{
        fontWeight:'400',
        color:'#7f8c8d',
        fontSize:14,
    },
    heading:{
        flex:1,
        marginBottom:10
    },
    sub_heading:{
        flex:1,
        marginBottom:35
    },
    image:{
        borderColor:'#eee',
        borderWidth:1,
        borderRadius:7,
        padding:5,
        marginBottom:30
    },
    note:{
        flex:1,
        justifyContent:'center',
        marginBottom:15
    },
    noteText:{
        fontSize:15
    },
    publication:{
        flex:1,
    },
    publicationText:{
        fontStyle:'italic',
        backgroundColor:'#bdc3c7',
        padding:3,
        borderRadius:2
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
    commentContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#bdc3c7',
        borderRadius:3,
        marginBottom:15
    },
    comment:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    commentText:{
        textAlign:'center',
        fontWeight:'700',
        color:'#bdc3c7',
    },
    numberComments:{
        color:'#bdc3c7',
        fontSize:12,
        marginBottom:10,
        marginTop:20
    }
});


function mapStateToProps(state) {

    return {
        selectedHeadline:state.selectedHeadline,
        userData:state.userDataReducer,
        commentReducer:state.commentReducer

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            deleteHeadlineAction:deleteHeadlineAction,
            blockHeadlineAction:blockHeadlineAction,
            getAllCommnentsAction:getAllCommnentsAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectedHeadlineComponent)
