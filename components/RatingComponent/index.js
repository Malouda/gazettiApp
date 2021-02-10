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
import ratingSendAction from '../../actions/rating/ratingSendAction';
import getAllHeadlinesAction from '../../actions/headlines/getAllHeadlinesAction';



const {height,width}=Dimensions.get('window');


class RatingComponent extends React.Component{

    constructor(){
        super();

        this.state={
            likeit:false,
            mixed:false,
            nolike:false,
            headline_id:'',
            user_id:''
        };

        this.likeIt=this.likeIt.bind(this);
        this.mixedThoughts=this.mixedThoughts.bind(this);
        this.dontlike=this.dontlike.bind(this);
    }

    componentWillMount(){

        this.setState({
            headline_id:this.props.selectedHeadline.id,
            user_id:this.props.userData[0].id,
            likeit:this.props.selectedHeadline.like !==null? this.props.selectedHeadline.like:false,
            mixed:this.props.selectedHeadline.mixedThoughts !==null? this.props.selectedHeadline.mixedThoughts:false,
            nolike:this.props.selectedHeadline.dontLike !==null? this.props.selectedHeadline.dontLike:false,
        })
    }

    likeIt(){
        this.setState({likeit: !this.state.likeit, mixed: false, nolike: false},()=>{
            this.sendRating();
        });

    }

    mixedThoughts(){
        this.setState({likeit: false, mixed: !this.state.mixed, nolike: false},()=>{
            this.sendRating();
        });

    }

    dontlike(){

        this.setState({likeit: false, mixed: false, nolike: !this.state.nolike},()=>{
            this.sendRating();
        });

    }


    sendRating(){

        this.props.ratingSendAction(this.state).then((x)=>{

            if(x){
                this.props.getAllHeadlinesAction(this.props.selectedHeadline.publication_id);
            }else {

                this.setState({
                    likeit:this.props.selectedHeadline.like !==null? this.props.selectedHeadline.like:false,
                    mixed:this.props.selectedHeadline.mixedThoughts !==null? this.props.selectedHeadline.mixedThoughts:false,
                    nolike:this.props.selectedHeadline.dontLike !==null? this.props.selectedHeadline.dontLike:false,
                })
            }

        });
    }

    render(){

        const canRate=()=> {

            if (this.props.userData[0].user_group_name !== 'SystemAdmin' && this.props.userData[0].user_group_name !== 'SuperAdmin' && this.props.userData[0].user_group_name !== 'Employee') {

                return (
                    <View>
                        <Text style={localStyles.heading}>Your Rating on reading the full article</Text>
                        <View style={[uStyles.container, localStyles.container]}>
                            <View style={uStyles.row}>
                                <TouchableOpacity
                                    style={this.state.likeit ? localStyles.ratingBoxClicked : localStyles.ratingBox}
                                    onPress={() => this.likeIt()}>
                                    <Text
                                        style={this.state.likeit ? localStyles.ratingTextClicked : localStyles.ratingText}>I
                                        like it</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.mixed ? localStyles.ratingBoxClicked : localStyles.ratingBox}
                                    onPress={() => this.mixedThoughts() }>
                                    <Text
                                        style={this.state.mixed ? localStyles.ratingTextClicked : localStyles.ratingText}>Mixed
                                        thoughts</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.nolike ? localStyles.ratingBoxClicked : localStyles.ratingBox}
                                    onPress={() => this.dontlike()}>
                                    <Text
                                        style={this.state.nolike ? localStyles.ratingTextClicked : localStyles.ratingText}>Didn't
                                        like it</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        }

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                {canRate()}
            </ScrollView>
        )
    }
}


const localStyles=StyleSheet.create({

    mainView:{
    },
    container:{
    },
    logoContainer:{
    },
    textInput:{
    },
    ratingBox:{
        flex:1,
        borderWidth:1,
        borderColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
        padding:3
    },
    ratingBoxClicked:{
        flex:1,
        borderWidth:1,
        borderColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3498db',
        padding:3
    },
    ratingText:{
        textAlign:'center',
        color:'#7f8c8d',
    },
    ratingTextClicked:{
        textAlign:'center',
        color:'#fff',
    },
    heading:{
        textAlign:'center',
        color:'#7f8c8d',
        fontWeight:'500'
    }
});


function mapStateToProps(state) {

    return {
        userData:state.userDataReducer,
        selectedHeadline:state.selectedHeadline,
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            ratingSendAction:ratingSendAction,
            getAllHeadlinesAction:getAllHeadlinesAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RatingComponent)
