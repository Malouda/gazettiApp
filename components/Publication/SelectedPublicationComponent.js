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
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import deletePublicationAction from '../../actions/publication/deletePublicationAction';
import LoaderComponent from '../LoaderComponent';

const {height,width}=Dimensions.get('window');


class SelectedPublicationComponent extends React.Component{

    constructor(){
        super();

        this.state={
            showLoader:false
        }

        this.editPublication=this.editPublication.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Publication Data',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    delete(){

        this.setState({
            showLoader:true
        });

        this.props.deletePublicationAction({publication_id:this.props.selectedPublication.id}).then((x)=>{

            this.setState({
                showLoader:false
            });

            if(x){

                this.props.navigateTo('back');
            }
        });
    }


    editPublication(){
        this.props.navigateTo('editPublication');
    }



    render(){

        const selectedPublication=()=>{

            const showLoader=()=>{

                if(this.state.showLoader){
                    return(
                        <LoaderComponent/>
                    )

                }
            };

            let selected=this.props.selectedPublication;

            if(selected!==null){

                return(
                    <View style={[uStyles.container,localStyles.container]}>
                        <View style={localStyles.icon}>
                            <Icon2 name="newspaper" size={30} color="#0D47A1" />
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Publisher Name
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.publisher_name}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Type
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.type_name}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Language
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.language_name}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Perspective
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.perspective_name}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Description
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.description}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Min Headlines
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.minimum_headlines}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Max Headlines
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.maximum_headlines}
                                </Text>
                            </View>
                        </View>
                        <View style={localStyles.boxContainer}>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    Notification Email
                                </Text>
                            </View>
                            <View style={localStyles.box}>
                                <Text style={localStyles.boxText}>
                                    {selected.publication_email}
                                </Text>
                            </View>
                        </View>
                        {showLoader()}
                        <View style={uStyles.row}>
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.dashBoardbutton}>
                                        <Text style={uStyles.dashBoardButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={uStyles.buttonContainer}>
                                <View style={uStyles.buttonSubContainer}>
                                    <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.editPublication()}>
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
                {selectedPublication()}
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
    icon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    boxContainer:{
        flex:1,
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#eee',
        borderRadius:7,
        margin:20
    },
    box:{
        flex:1,
        marginBottom:20
    },
    boxText:{
        fontWeight:'700',
        color:'#7f8c8d'
    }
});


function mapStateToProps(state) {

    return {
        selectedPublication:state.selectedPublication
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            deletePublicationAction:deletePublicationAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectedPublicationComponent)
