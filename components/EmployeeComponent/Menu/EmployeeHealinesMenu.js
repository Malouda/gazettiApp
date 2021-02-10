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
import navigateTo from '../../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const {height,width}=Dimensions.get('window');


class EmployeeHealinesMenu extends React.Component{

    constructor(){
        super();
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Headlines Control',
        drawerLabel: 'Headlines',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon2 name="newspaper" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });



    render(){

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]}  keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]}>
                    <View style={uStyles.row}>
                        <View style={uStyles.buttonContainer}>
                            <View style={uStyles.buttonSubContainer}>
                                <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('createHeadlines')}>
                                    <Text style={uStyles.dashBoardButtonText}>Create New Headline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={uStyles.buttonContainer}>
                            <View style={uStyles.buttonSubContainer}>
                                <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.props.navigateTo('publicationList')}>
                                    <Text style={uStyles.dashBoardButtonText}>View Headlines</Text>
                                </TouchableOpacity>
                            </View>
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
            navigateTo:navigateTo

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeHealinesMenu)
