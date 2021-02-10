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
import Icon from 'react-native-vector-icons/Ionicons';
import {List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
import createCommentAction from '../../actions/comment/createCommentAction';
import LoaderComponent from '../LoaderComponent';
import moment from 'moment';
const {height,width}=Dimensions.get('window');


class CommentComponent extends React.Component{

    constructor(){
        super();

        this.state={
            comment:'',
            showLoader:false,
            count:0
        };
        this.submitComment=this.submitComment.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Comments',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D47A1'},
    });

    componentWillMount(){
        this.count=0;

        this.props.commentReducer.filter((x)=>{

            if(x.user_id === this.props.userData[0].id){
               this.count ++;
            }
        });

        this.setState({
            count:this.count
        });
    }

    submitComment(){

        this.setState({
            showLoader:true
        });

       let data={
            headline_id:this.props.selectedHeadline.id,
            user_id:this.props.userData[0].id,
            comment:this.state.comment
        };

      /*  let data={
            headline_id:1,
            user_id:1,
            comment:this.state.comment
        };*/

        this.props.createCommentAction(data).then((x)=>{
            this.setState({
                showLoader:false
            });

            if(x){
                this.setState({
                    comment:'',
                    count:this.state.count + 1
                });
            }
        });
    }


    render(){

        const showLoader=()=>{
            if(this.state.showLoader){

                return(
                    <LoaderComponent/>
                )
            }
        };

        const canComment=()=>{

            console.log('comments',this.state.count);
            if(this.props.userData[0].user_group_name!=='SystemAdmin' && this.props.userData[0].user_group_name!=='SuperAdmin' && this.props.userData[0].user_group_name!=='Employee') {

                if(this.state.count < 3){

                    return(
                        <View style={uStyles.row}>
                            <View style={localStyles.textInputContainer}>
                                <View style={[localStyles.textInput,uStyles.textInput]}>
                                    <TextInput
                                        placeholder="Comment"
                                        underlineColorAndroid="#fff"
                                        value={this.state.comment}
                                        onChange={(event) => this.setState({comment:event.nativeEvent.text})}
                                    />
                                </View>
                            </View>
                            {submitButton()}
                        </View>
                    )
                }
            }
        };

        const submitButton=()=>{

            if(this.state.showLoader){

                return(
                    <View style={localStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <View style={uStyles.dashBoardbutton}>
                                <Text style={uStyles.dashBoardButtonText}>Submitting..</Text>
                            </View>
                        </View>
                    </View>
                )
            }else {

                return(
                    <View style={localStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.submitComment()}>
                                <Text style={uStyles.dashBoardButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        };

        const comments=()=>{

            if (this.props.commentReducer!==null){

                return this.props.commentReducer.map((x,index)=>{

                    //if employee see all comments from your published headline
                    if(this.props.userData[0].user_group_name === 'Employee'){
                        if(this.props.selectedHeadline.user_id === this.props.userData[0].id){

                            return(
                                <List key={index}>
                                    <ListItem avatar>
                                        <Left>
                                            <Icon name="ios-person" size={30} color="#546E7A" />
                                        </Left>
                                        <Body>
                                        <Text style={localStyles.name}>{x.fname + ' '+ x.lname}</Text>
                                        <Text note>{x.comment}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{moment(x.created_at).fromNow()}</Text>
                                        </Right>
                                    </ListItem>
                                </List>
                            )

                        }
                    }else {

                        if(x.user_id===this.props.userData[0].id){

                            return(
                                <List key={index}>
                                    <ListItem avatar>
                                        <Left>
                                            <Icon name="ios-person" size={30} color="#546E7A" />
                                        </Left>
                                        <Body>
                                        <Text style={localStyles.name}>{x.fname + ' '+ x.lname}</Text>
                                        <Text note>{x.comment}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{moment(x.created_at).fromNow()}</Text>
                                        </Right>
                                    </ListItem>
                                </List>
                            )
                        }

                    }
                });
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]} keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    {comments()}
                    {showLoader()}
                    {canComment()}
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
    name:{
        fontWeight:'700'
    },
    textInputContainer:{
        flex:3,
        marginTop:25
    },
    buttonContainer:{
        flex:1,
        marginLeft:5,
        marginTop:25
    },
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
            createCommentAction:createCommentAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentComponent)
