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


const {height,width}=Dimensions.get('window');


class SelectedCoverPageComponent extends React.Component{

    screenWitdth=null;

    constructor(){
        super();

        this.state={
            allCoverPages:null,
            refreshing: false,
            deleted:false,
            blocked:false,
            deleteLoading:false,
            blockLoading:false
        };

        this.deleteCoverPage=this.deleteCoverPage.bind(this);
        this.block=this.block.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Cover Pages',
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



    render(){


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

        const isAbleToEdit=()=>{

            if(this.props.userData[0].id===this.props.selectedCoverPage.user_id  && this.props.userData[0].user_group_name==='Employee'){
                return(
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('editCoverPage')}>
                                <Text style={uStyles.dashBoardButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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




        const image=()=>{

            if(this.props.selectedCoverPage!==null){


                    return(
                        <View style={localStyles.imageContainer}>
                            <ImageComponent image_url='/coverImages/' image={this.props.selectedCoverPage.cover_page_url} screenWidth={this.screenWitdth} width={this.screenWitdth}/>
                            <View style={uStyles.row}>
                                <View style={uStyles.buttonContainer}>
                                    {isAbleToEdit()}
                                </View>
                                <View style={uStyles.buttonContainer}>
                                    {isAbleToBlock()}
                                </View>
                                <View style={uStyles.buttonContainer}>
                                    <View style={uStyles.buttonSubContainer}>
                                        {isAbleToDelete()}
                                    </View>
                                </View>
                            </View>
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
});


function mapStateToProps(state) {

    return {
        allCoverPages:state.allCoverPages,
        selectedCoverPage:state.selectedCoverPageReducer,
        userData:state.userDataReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllCoverPagesAction:getAllCoverPagesAction,
            deleteCoverPageAction:deleteCoverPageAction,
            blockCoverPageAction:blockCoverPageAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectedCoverPageComponent)
