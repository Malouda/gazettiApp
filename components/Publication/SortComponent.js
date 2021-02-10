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
import { Radio,List, ListItem} from 'native-base';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import LoaderComponent from '../LoaderComponent';
import sortPublicationComponent from '../../actions/publication/sortPublicationComponent';
import getAllPublications from '../../actions/publication/getAllPublicationForReadingAction';


const {height,width}=Dimensions.get('window');


class SortComponent extends React.Component{

    constructor(){
        super();

        this.state={
            alphaBetically:false,
            priority1:0,
            priority2:0,
            priority3:0,
            showLoader:false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Sort Publications',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    componentWillMount (){

        //this.props.getAllPublications();

    }

    sort(){
        this.setState({
            showLoader:true
        });

        this.props.sortPublicationComponent(this.state).then((x)=>{
            this.setState({
                showLoader:false
            });

            if(x){

                this.props.navigateTo('back');
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

        const publications=()=>{

            if (this.props.allPublications!==null){
                return this.props.allPublications.map((data,index)=>{
                    return(
                        <Picker.Item label={data.publication_name} value={data.id} key={index} />
                    )
                });
            }else {

                return(
                    <Picker.Item label='' value='' enabled={false}/>
                )
            }
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]} keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <List>
                        <ListItem>
                            <View style={uStyles.radioContainer}>
                                <View style={uStyles.radio}>
                                    <Radio selected={this.state.alphaBetically}  onPress={()=>this.setState({alphaBetically:!this.state.alphaBetically})}/>
                                </View>
                                <View style={uStyles.radioTextContainer}>
                                    <Text style={uStyles.radioText}>Alphabetically</Text>
                                </View>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={localStyles.publications}>
                                <Text>Priority 1</Text>
                                <Picker
                                    selectedValue={this.state.priority1}
                                    onValueChange={(itemValue, itemIndex) => this.setState({priority1:itemValue})}
                                >
                                    <Picker.Item label='Select Publication'  value={0} enabled={false}/>
                                    {publications()}
                                </Picker>
                                <Text>Priority 2</Text>
                                <Picker
                                    selectedValue={this.state.priority2}
                                    onValueChange={(itemValue, itemIndex) => this.setState({priority2:itemValue})}
                                >
                                    <Picker.Item label='Select Publication'  value={0} enabled={false}/>
                                    {publications()}
                                </Picker>
                                <Text>Priority 3</Text>
                                <Picker
                                    selectedValue={this.state.priority3}
                                    onValueChange={(itemValue, itemIndex) => this.setState({priority3:itemValue})}
                                >
                                    <Picker.Item label='Select Publication' value={0} enabled={false}/>
                                    {publications()}
                                </Picker>
                            </View>
                        </ListItem>
                    </List>
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={() => this.sort()}>
                                <Text style={uStyles.dashBoardButtonText}>sort</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    publications:{
        flex:1
    }
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
            sortPublicationComponent:sortPublicationComponent,
            getAllPublications:getAllPublications

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SortComponent)
