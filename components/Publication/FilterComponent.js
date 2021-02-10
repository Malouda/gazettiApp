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
import filterPublicationAction from '../../actions/publication/filterPublicationAction';

const {height,width}=Dimensions.get('window');


class FilterComponent extends React.Component{

    constructor(){
        super();

        this.state={
            allType:false,
            newspaper:false,
            magazine:false,
            allLanguage:false,
            kiswahili:false,
            english:false,
            allperspective:false,
            politics:false,
            lifeStyle:false,
            sports:false,
            religion:false,
            showLoader:false
        }
        this.filter=this.filter.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Filter Publications',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });

    filter(){

        this.setState({
            showLoader:true
        });

        this.props.filterPublicationAction(this.state).then((x)=>{
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

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]} keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <List>
                        <ListItem>
                            <View style={uStyles.column}>
                                <View style={uStyles.radioHeading}>
                                    <Text style={uStyles.radioHeadingText}>Type</Text>
                                </View>
                                <View style={uStyles.radioMainContainer}>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.allType}  onPress={()=>this.setState({
                                                allType:!this.state.allType,
                                                newspaper:false,
                                                magazine:false
                                            })}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>All</Text>
                                        </View>
                                    </View>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.newspaper}  onPress={()=>this.setState({newspaper:!this.state.newspaper,allType:false})}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>News Paper</Text>
                                        </View>
                                    </View>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.magazine}  onPress={()=>this.setState({magazine:!this.state.magazine,allType:false})}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>Magazine</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={uStyles.column}>
                                <View style={uStyles.radioHeading}>
                                    <Text style={uStyles.radioHeadingText}>Languages</Text>
                                </View>
                                <View style={uStyles.radioMainContainer}>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.allLanguage}  onPress={()=>this.setState({
                                                allLanguage:!this.state.allLanguage,
                                                kiswahili:false,
                                                english:false
                                            })}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>All</Text>
                                        </View>
                                    </View>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.kiswahili}  onPress={()=>this.setState({kiswahili:!this.state.kiswahili,allLanguage:false})}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>Kiswahili</Text>
                                        </View>
                                    </View>
                                    <View style={uStyles.radioContainer}>
                                        <View style={uStyles.radio}>
                                            <Radio selected={this.state.english}  onPress={()=>this.setState({english:!this.state.english,allLanguage:false})}/>
                                        </View>
                                        <View style={uStyles.radioTextContainer}>
                                            <Text style={uStyles.radioText}>English</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={uStyles.column}>
                                <View style={uStyles.radioHeading}>
                                    <Text style={uStyles.radioHeadingText}>Perspectives</Text>
                                </View>
                                <View style={uStyles.radioMainContainer}>
                                    <View style={uStyles.radioColumn}>
                                        <View style={uStyles.radioContainer}>
                                            <View style={uStyles.radio}>
                                                <Radio selected={this.state.allperspective}  onPress={()=>this.setState({
                                                    allperspective:!this.state.allperspective,
                                                    politics:false,
                                                    lifeStyle:false,
                                                    sports:false,
                                                    religion:false
                                                })}/>
                                            </View>
                                            <View style={uStyles.radioTextContainer}>
                                                <Text style={uStyles.radioText}>All</Text>
                                            </View>
                                        </View>
                                        <View style={uStyles.radioContainer}>
                                            <View style={uStyles.radio}>
                                                <Radio selected={this.state.politics}  onPress={()=>this.setState({politics:!this.state.politics,allperspective:false})}/>
                                            </View>
                                            <View style={uStyles.radioTextContainer}>
                                                <Text style={uStyles.radioText}>Politics</Text>
                                            </View>
                                        </View>
                                        <View style={uStyles.radioContainer}>
                                            <View style={uStyles.radio}>
                                                <Radio selected={this.state.lifeStyle}  onPress={()=>this.setState({lifeStyle:!this.state.lifeStyle,allperspective:false})}/>
                                            </View>
                                            <View style={uStyles.radioTextContainer}>
                                                <Text style={uStyles.radioText}>LifeStyle</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={uStyles.radioContainer}>
                                            <View style={uStyles.radio}>
                                                <Radio selected={this.state.sports}  onPress={()=>this.setState({sports:!this.state.sports,allperspective:false})}/>
                                            </View>
                                            <View style={uStyles.radioTextContainer}>
                                                <Text style={uStyles.radioText}>Sports</Text>
                                            </View>
                                        </View>
                                        <View style={uStyles.radioContainer}>
                                            <View style={uStyles.radio}>
                                                <Radio selected={this.state.religion}  onPress={()=>this.setState({religion:!this.state.religion,allperspective:false})}/>
                                            </View>
                                            <View style={uStyles.radioTextContainer}>
                                                <Text style={uStyles.radioText}>Religion</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ListItem>
                    </List>
                    {showLoader()}
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={() => this.filter()}>
                                <Text style={uStyles.dashBoardButtonText}>Filter</Text>
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


    }
});


function mapStateToProps(state) {

    return {

    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            filterPublicationAction:filterPublicationAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterComponent)
