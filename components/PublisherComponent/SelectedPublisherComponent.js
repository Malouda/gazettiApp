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
import Icon2 from 'react-native-vector-icons/EvilIcons';
import getAllPublishersAction from '../../actions/publishers/getAllPublishersAction';
import LoaderComponent from '../LoaderComponent';
import deletePublisherAction from '../../actions/publishers/deletePublisherAction';

const {height,width}=Dimensions.get('window');


class ViewPublishersComponent extends React.Component{

    constructor(){
        super();
        this.state={
            showLoader:false
        };
        this.delete=this.delete.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Publisher',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={20} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount(){

        this.props.getAllPublishersAction();
    }

    delete(){

        this.setState({
            showLoader:true
        });

        this.props.deletePublisherAction({publisher_id:this.props.selectedPublisher.id}).then((x)=>{

            this.setState({
                showLoader:false
            });

            if(x){

                this.props.navigateTo('back');
            }
        })
    }



    render(){



        const selectedPublisher=()=>{
            const showLoader=()=>{

                if(this.state.showLoader){

                    return(
                        <LoaderComponent/>
                    )
                }

            };

            if(this.props.selectedPublisher!==null){
                return(
                    <View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="text-document-inverted" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Publisher</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.publisher_name}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="location-pin" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Location</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.location_name}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="email" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Email</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.email}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="old-phone" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Phone</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.publisher_phone}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="grid" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Maximum Employees</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.maximum_employees}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="eye" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Account Status</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.status===1?'Active':'InActive'}</Text>
                            </View>
                        </View>
                        <View style={[uStyles.row,localStyles.selectedPublisherContainer]}>
                            <View style={localStyles.icon}>
                                <Icon name="calendar" size={20} color="#0D47A1" />
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>Account Expiry Date</Text>
                            </View>
                            <View style={localStyles.selectedPublisher}>
                                <Text style={localStyles.selectedPublisherText}>{this.props.selectedPublisher.account_expiry}</Text>
                            </View>
                        </View>
                        {showLoader()}
                        <View style={uStyles.row}>
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.delete()}>
                                        <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('editPublisher')}>
                                        <Text style={uStyles.dashBoardButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )

            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}>
                <View style={[uStyles.container,localStyles.container]}>
                    {selectedPublisher()}
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
    selectedPublisherContainer:{
        flex:1,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#0D47A1',
        paddingBottom:10
    },
    selectedPublisher:{
        flex:3,
        justifyContent:'flex-end'
    },
    selectedPublisherText:{
        fontWeight:'700'
    },
    icon:{
        flex:1,
    }

});


function mapStateToProps(state) {

    return {
        allPublishers:state.allPublishersReducerState,
        selectedPublisher:state.selectedPublisherReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublishersAction:getAllPublishersAction,
            deletePublisherAction:deletePublisherAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPublishersComponent)
