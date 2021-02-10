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
import getAllPublications from '../../actions/publication/getAllPublicationForReadingAction';
import SelectedPublicationAction from '../../actions/publication/SelectedPublicationAction';
import getAllHeadlinesAction from '../../actions/headlines/getAllHeadlinesAction';



class PublicationHeadlinesComponent extends React.Component {


    constructor(){
        super();

        this.selectPublication=this.selectPublication.bind(this);
    }


    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Select From Publication',
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

    selectPublication(id){
        this.props.getAllHeadlinesAction(id);
        this.props.navigateTo('viewHeadlines');
    }



    render() {

        const publications=()=>{

            if(this.props.allPublications!==null){

                return this.props.allPublications.map((publication,index)=>{

                    return(
                        <ListItem key={index}>
                            <View style={localStyles.pubListMainContainer}>
                                <TouchableOpacity style={localStyles.pubListContainer} onPress={()=>this.selectPublication(publication.id)}>
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
                            </View>
                        </ListItem>

                    );

                });

            }else {

                return(
                    <LoaderComponent/>
                )
            }
        };

        let canFilterSort=()=> {
            if (this.props.userData !== null) {

                if (
                    this.props.userData[0].user_group_name === 'Agent' ||
                    this.props.userData[0].user_group_name === 'Vendors' ||
                    this.props.userData[0].user_group_name === 'Reader'

                ) {

                    return(
                        <View style={uStyles.row}>
                            <View style={localStyles.filterContainer}>
                                <TouchableOpacity style={localStyles.filterButton} onPress={()=>this.props.navigateTo('filterPublications')}>
                                    <Text style={uStyles.dashBoardButtonText}>Filter</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={localStyles.filterContainer}>
                                <TouchableOpacity style={localStyles.filterButton} onPress={()=>this.props.navigateTo('sortPublications')}>
                                    <Text style={uStyles.dashBoardButtonText}>Sort</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )

                }

            }
        };


        return (
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={localStyles.allheadlines}>
                        <TouchableOpacity style={localStyles.filterButton} onPress={()=>this.selectPublication()}>
                            <Text style={uStyles.dashBoardButtonText}>All Headlines</Text>
                        </TouchableOpacity>
                    </View>
                    {canFilterSort()}
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
    pubListMainContainer:{
        flex:1
    },
    pubListContainer:{
        flex:1,
        flexDirection:'row'
    },
    pubListBox:{
        flex:1,
        marginRight:3,
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
    filterContainer:{
        flex:1,
        alignItems:'flex-end',
        marginBottom:15,
        height:30,
    },
    filterButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#7f8c8d',
        width:120
    },
    publicationTypeHeader:{
        textAlign:'center',
        fontWeight:'700',
        color:'#fff',
        fontSize:17
    },
    publicationName:{
        fontWeight:'700'
    },
    allheadlines:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    }
});

function mapStateToProps(state) {

    return {
        allPublications:state.allPublicationsReducerState,
        userData:state.userDataReducer,

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPublications:getAllPublications,
            SelectedPublicationAction:SelectedPublicationAction,
            getAllHeadlinesAction:getAllHeadlinesAction


        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PublicationHeadlinesComponent)
