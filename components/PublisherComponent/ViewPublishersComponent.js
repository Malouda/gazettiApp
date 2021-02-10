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
import Icon2 from 'react-native-vector-icons/Octicons';
import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';
import LoaderComponent from '../LoaderComponent';
import selectedPublisherAction from '../../actions/publishers/selectedPublisherAction';

const {height,width}=Dimensions.get('window');


class ViewPublishersComponent extends React.Component{

    constructor(){
        super();
        this.selectedPublisher=this.selectedPublisher.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'List of Publishers',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount(){

        this.props.getAllPublishersAction();
    }

    selectedPublisher(data){

        this.props.selectedPublisherAction(data);

        this.props.navigateTo('selectedPublisher')
    }


    render(){

        const publishers=()=>{

            if(this.props.allPublishers!==null){
                return this.props.allPublishers.map((x,index)=>{
                    return(
                        <TouchableOpacity style={localStyles.publisherContainer} key={index} onPress={()=>this.selectedPublisher(x)}>
                            <View style={[localStyles.publisher,uStyles.row]}>
                                <View style={localStyles.publisherbox}>
                                    <Text style={uStyles.boldText}>{x.publisher_name}</Text>
                                </View>
                                <View style={localStyles.middle}>
                                    <View style={localStyles.publisherbox}>
                                        <Text style={uStyles.boldText}>Expiry Date</Text>
                                    </View>
                                    <View style={localStyles.publisherbox}>
                                        <Text style={uStyles.boldText}>Status</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                });
            }else {

                return(
                    <LoaderComponent/>
                )
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}>
                <View style={[uStyles.container,localStyles.container]}>
                    {publishers()}
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
    publisherContainer:{
        marginBottom:1,
    },
    publisher:{
        flex:1,
        marginBottom:8,
        backgroundColor:'#f2f2f2'
    },
    publisherbox:{
        flex:2,
        justifyContent:'center',
        marginBottom:10
    },
    icon:{
        flex:1
    },
    middle:{
        flex:2
    }
});


function mapStateToProps(state) {

    return {
        allPublishers:state.allPublishersReducerState
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublishersAction:getAllPublishersAction,
            selectedPublisherAction:selectedPublisherAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPublishersComponent)
