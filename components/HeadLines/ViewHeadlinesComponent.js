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
    RefreshControl

} from 'react-native';
import { List, ListItem} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/EvilIcons';

import getAllPerspectives from '../../actions/perspective/getAllPerspectives';
import LoaderComponent from '../LoaderComponent';
import SelectedHeadlineAction from '../../actions/headlines/selectedHeadlineAction';
import getAllHeadlinesAction from '../../actions/headlines/getAllHeadlinesAction';
import moment from 'moment';



class ViewHeadlinesComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

        this.selectHeadline=this.selectHeadline.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Headlines',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        this.props.getAllPerspectives();
    }

    _onRefresh() {
        this.setState({refreshing: true});

        this.props.getAllHeadlinesAction(this.props.selectedPublicationId).then((x)=>{

            if(x){
                this.setState({refreshing: false});
            }
        })

    }

    selectHeadline(data){

        this.props.SelectedHeadlineAction(data);

        this.props.navigateTo('selectedHeadline');

    }



    render() {


        const fullheadlines=()=>{

            if (this.props.allPerspectivesReducer!==null && this.props.allheadlineReducer!==null){

                let  allheadlineReducerSize = Object.keys(this.props.allheadlineReducer).length;


                return this.props.allPerspectivesReducer.map((perspective,index)=>{



                    //check to see if this perspective has some headlines in the headlines array if not do not display the perspective

                    let check= this.props.allheadlineReducer.some(function(o){return o["perspective_name"] === perspective.perspective_name;})

                    if(check){
                        return(
                            <List key={index}>
                                <ListItem itemDivider>
                                    <Text>{perspective.perspective_name}</Text>
                                </ListItem>
                                {Array.apply(0,Array(allheadlineReducerSize)).map((headline,i)=>{

                                    if(this.props.allheadlineReducer[i].perspective_name===perspective.perspective_name){

                                        const hasImage=()=>{

                                            if(this.props.allheadlineReducer[i].image_url!==null){
                                                return(
                                                    <View style={localStyles.icon}>
                                                        <Icon3 name="image" size={30} color="#95a5a6" />
                                                    </View>
                                                )
                                            }
                                        };

                                        return(
                                            <ListItem key={i}>
                                                <TouchableOpacity style={localStyles.headingContainer} onPress={()=>this.selectHeadline(this.props.allheadlineReducer[i])}>
                                                    <View style={localStyles.icon}>
                                                        <Icon2 name="newspaper-o" size={30} color="#311B92" />
                                                    </View>
                                                    <View style={localStyles.boxheader}>
                                                        <Text style={localStyles.headerText}>
                                                            {this.props.allheadlineReducer[i].heading}
                                                        </Text>
                                                    </View>
                                                    {hasImage()}
                                                    <Text style={localStyles.releaseText}>{moment().isAfter(this.props.allheadlineReducer[i].release_date)? 'Released':'Up Next'}</Text>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    }
                                })}
                            </List>
                        )
                    }
                });
            }else {

                return(
                    <LoaderComponent/>
                )
            }

        };



        return (
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
                    {fullheadlines()}
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
    headingContainer:{
        flex:1,
        flexDirection:'row',
        marginBottom:10
    },
    icon:{
        flex:1,
        marginBottom:10
    },
    icon3:{
        flex:1,
        alignItems:'flex-end',
        marginBottom:10
    },
    boxheader:{
        flex:4,
        marginBottom:10,
        marginLeft:10
    },
    headerText:{
        color:'#000'
    },
    publication:{
        marginBottom:10
    },
    publicationText:{
        textAlign:'center'
    },
    releaseText:{
        fontSize:9
    }
});

function mapStateToProps(state) {

    return {
        allheadlineReducer:state.allheadlineReducer,
        allPerspectivesReducer:state.allPerspectivesReducer,
        selectedPublicationId:state.selectedPublicationIdReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            getAllPerspectives:getAllPerspectives,
            SelectedHeadlineAction:SelectedHeadlineAction,
            getAllHeadlinesAction:getAllHeadlinesAction


        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewHeadlinesComponent)
