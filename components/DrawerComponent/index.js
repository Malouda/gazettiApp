import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import {DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import logoutAction from '../../actions/login/logoutAction';
import moment from 'moment';

const {height,width}=Dimensions.get('window');

class DrawerComponent extends React.Component{

    currentTime;

    constructor(){
        super();

        this.logout=this.logout.bind(this);

        this.state={
            currentTime:''
        };

        this.timer=this.timer.bind(this);
    }

    componentDidMount(){
        this.mysetInterval=setInterval(this.timer, 1000);

    }
    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.my);
    }

    timer() {

        this.setState({currentTime: moment().format('LLL')});

    }


    logout(){

        this.props.logoutAction();
    }

    render(){

        const userData=(()=>{

            if(this.props.userData !== null){

                return(
                    <View style={localStyles.groupContainer}>
                        <Text style={localStyles.groupText}>
                            {this.props.userData[0].user_group_name}
                        </Text>
                        <Text style={localStyles.groupText}>
                            {this.props.userData[0].fname + ' ' + this.props.userData[0].lname}
                        </Text>
                    </View>
                )
            }
        });

        return(
            <ScrollView style={[localStyles.container]}  keyboardShouldPersistTaps="always">
                <View style={localStyles.subContainer}>
                    <View style={localStyles.logoContainer}>
                        <Image source={require('../../sys_images/logo.png')}  style={{width: 150, height: 76}}/>
                    </View>
                    {userData()}
                    <View style={localStyles.items}>
                        <DrawerItems  {...this.props} labelStyle={{ color: '#fff' }}/>
                        <TouchableOpacity style={localStyles.logoutContainer} onPress={this.logout}>
                            <View style={localStyles.icon}>
                                <Icon name="logout" size={25} color="#fff" />
                            </View>
                            <View style={localStyles.label}>
                                <Text style={localStyles.labelText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {

    return {
        userData:state.userDataReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            logoutAction:logoutAction

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawerComponent)



const localStyles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0D47A1',
    },
    logoContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    items:{
        flex:3,
    },
    logoutContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    label: {
        margin: 16,
    },
    labelText:{
        fontWeight: 'bold',
        color:'#fff'
    },
    timeContainer:{
        marginBottom:15
    },
    timetext:{
        color:'#fff'
    },
    groupContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:18,
        marginBottom:18
    },
    groupText:{
        textAlign:'center',
        color:'#fff'
    },
    subContainer:{
        marginTop:35
    }
});
