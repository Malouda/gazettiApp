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
import React from 'react';
import { List, ListItem} from 'native-base';
import uStyles from '../../styles';
import LoaderComponent from '../LoaderComponent';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import getAllPublications from '../../actions/publication/getAllPublications';
import SelectedPublicationAction from '../../actions/publication/SelectedPublicationAction';


class PublicationListComponent extends React.Component {


    constructor(){
        super();

        this.selectPublication=this.selectPublication.bind(this);
    }


    static navigationOptions = ({ navigation }) => ({
        headerTitle:'List of Publication',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        this.props.getAllPublications();

    }

    selectPublication(data){
        this.props.SelectedPublicationAction(data);
        this.props.navigateTo('selectedPublication');
    }



    render() {

        const publications=()=>{

            if(this.props.allPublications!==null){

                return this.props.allPublications.map((publication,index)=>{

                    return(
                        <ListItem key={index}>
                            <TouchableOpacity style={localStyles.pubListContainer} onPress={()=>this.selectPublication(publication)}>
                                <View style={localStyles.pubListBox1}>
                                    <Text style={localStyles.publicationTypeHeader}>{publication.type_name.charAt(0).toUpperCase()}</Text>
                                </View>
                                <View style={localStyles.pubListBox2}>
                                    <View style={localStyles.pubListBox}>
                                        <Text style={localStyles.publicationName}>{publication.publication_name}</Text>
                                    </View>
                                    <View style={localStyles.pubListBox}>
                                        <Text>{publication.publisher_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ListItem>

                    );

                });

            }else {

                return(
                    <LoaderComponent/>
                )
            }


        };


        return (
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <List>
                        {publications()}
                    </List>
                </View>
            </ScrollView>
        );
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
    pubListContainer:{
        flex:1,
        flexDirection:'row'
    },
    pubListBox:{
        flex:1,
        marginRight:3
    },
    pubListBox1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginRight:20,
        backgroundColor:'#0D47A1',
        borderRadius:9,
    },
    pubListBox2:{
        flex:3,
    },
    publicationName:{
        fontWeight:'700'
    },
    publicationTypeHeader:{
        textAlign:'center',
        fontWeight:'700',
        color:'#fff',
        fontSize:17
    },
});

function mapStateToProps(state) {

    return {
        allPublications:state.allPublicationsReducerState,

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublications:getAllPublications,
            SelectedPublicationAction:SelectedPublicationAction


        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PublicationListComponent)
