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
import Spinner from 'react-native-spinkit';
import selectedCoverPageAction from '../../actions/coverPage/selectedCoverPageAction';
import moment from 'moment';


const {height,width}=Dimensions.get('window');


class ViewCoverPageComponent extends React.Component{

    screenWitdth=null;

    constructor(){
        super();

        this.state={
            allCoverPages:null,
            refreshing: false,
        };

        this.deleteCoverPage=this.deleteCoverPage.bind(this);
        this.selectedCoverPage=this.selectedCoverPage.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Cover Pages',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    componentWillMount (){
        //this.props.getAllCoverPagesAction();
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            allCoverPages:nextProps.allCoverPages
        });

    }

    _onRefresh() {
        this.setState({refreshing: true});

        this.props.getAllCoverPagesAction({id:this.props.selectedPublicationId}).then((x)=>{

            if(x){
                this.setState({refreshing: false});
            }
        })

    }

    deleteCoverPage(id,index){

        this.setState({
            showDeleteLoaderButton:{
                [index]:true
            }
        });

        this.props.deleteCoverPageAction(id).then((x)=>{

            if(x){

                this.setState({
                    showDeleteLoaderButton:{
                        [index]:false
                    }
                });
            }
        })
    }
    selectedCoverPage(data){

        this.props.selectedCoverPageAction(data);

        this.props.navigateTo('selectedCoverPage');
    }



    render(){


        const deleteButton=(x,index)=>{


            if(typeof this.state.showDeleteLoaderButton !== 'undefined'){

                if(this.state.showDeleteLoaderButton[index]){

                    return(
                        <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.deleteCoverPage(x.id,index)}>
                            <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                            <View style={localStyles.loaderContainer}>
                                <Spinner isVisible={true} size={20} type='ChasingDots' color='#a70500'/>
                            </View>
                        </TouchableOpacity>
                    )

                }else {

                    return(
                        <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.deleteCoverPage(x.id,index)}>
                            <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                        </TouchableOpacity>
                    )

                }

            }else {

                return(
                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.deleteCoverPage(x.id,index)}>
                        <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                    </TouchableOpacity>
                )

            }

        };

        const images=()=>{

            if(this.props.allCoverPages!==null){

                return this.props.allCoverPages.map((x,index)=>{

                    return(
                        <View key={index} style={localStyles.imgContainer}>
                            <View style={localStyles.releaseTextcontainer}>
                                <Text style={localStyles.releaseText}>{moment().isAfter(x.release_date)? 'Released':'Up Next'}</Text>
                                <Text>{x.publication_name}</Text>
                                <Text style={localStyles.releaseText}>{moment(x.release_date).format('DD-MM-YYYY')}</Text>
                            </View>
                            <TouchableOpacity style={localStyles.imageContainer} onPress={()=>this.selectedCoverPage(x)}>
                                <ImageComponent image_url='/coverImages/' image={x.cover_page_url}  index={index}  screenWidth={this.screenWitdth} width={this.screenWitdth}/>
                            </TouchableOpacity>
                        </View>
                    )
                });

            }else {

                return(
                    <LoaderComponent/>
                )
            }
        };

        return(
            <ScrollView
                style={[uStyles.mainView,localStyles.mainView]}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                keyboardShouldPersistTaps="always"
            >
                <View style={[uStyles.container,localStyles.container]}>
                    {images()}
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
    imgContainer:{
        flex:1,
        marginBottom:15
    },
    releaseTextcontainer:{
      marginBottom:15
    },
    releaseText:{
        fontSize:9
    }
});


function mapStateToProps(state) {

    return {
        allCoverPages:state.allCoverPages,
        selectedPublicationId:state.selectedPublicationIdReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllCoverPagesAction:getAllCoverPagesAction,
            deleteCoverPageAction:deleteCoverPageAction,
            selectedCoverPageAction:selectedCoverPageAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewCoverPageComponent)
