import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Stylesheet,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Picker,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import navigateTo from '../../actions/NavigationAction';
import { Container, Content, Form, Item, Input } from 'native-base';
import uStyles from '../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import resolveAssetSource from 'resolveAssetSource';

const {height,width}=Dimensions.get('window');


class ReaderComponent extends React.Component{

    constructor(){
        super();

        this.state={
            imgViewWidth: 0,
            imgViewHeight: 0
        };

        this.navigateTo=this.navigateTo.bind(this);
        this.measureView=this.measureView.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Reader',
        drawerLabel: 'Home',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D47A1'},
        drawerIcon:()=>(
            <Icon name="home" size={25} color="#fff" />
        ),
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    navigateTo(route){

        this.props.navigateTo(route);
    }

    measureView(event) {
        console.log('layout properties',event.nativeEvent.layout.width);
        this.setState({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            imgViewWidth: event.nativeEvent.layout.width,
            imgViewHeight: event.nativeEvent.layout.height
        });
    }



    render(){

        let images=[require('../../sys_images/headlines2.jpg'),require('../../sys_images/coverpage2.jpg')];

        let myImages=()=>{

            return images.map((x,index)=>{
                let source = resolveAssetSource(x);
                let width=source.width;
                let height=source.height;
                let  ImgRatio=width/height;
                let previewImgHeight=Math.floor(this.state.imgViewWidth/ImgRatio);

                console.log(previewImgHeight);

                return(
                    <TouchableOpacity style={localStyles.imageContainer} key={index} onPress={()=>this.props.navigateTo('ReaderHeadLines')}>
                        <Image
                            style={{width:this.state.imgViewWidth-15, height:previewImgHeight-15}}
                            source={x}
                        />
                    </TouchableOpacity>
                )
            });
        };

        return(
            <ScrollView style={[uStyles.mainView,localStyles.mainView]} keyboardShouldPersistTaps="always">
                <View style={[uStyles.container,localStyles.container]} onLayout={(event) => this.measureView(event)}>
                    {myImages()}
                </View>
                <View style={uStyles.buttonContainer}>
                    <View style={uStyles.buttonSubContainer}>
                        <TouchableOpacity style={uStyles.button} onPress={()=>this.navigateTo('Aboutus')}>
                            <Text style={uStyles.buttonText}>About Us</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        )
    }
}


const localStyles={

    mainView:{
        backgroundColor:'#fff'
    },
    container:{

    },
    logoContainer:{

    },
    textInput:{},
    imageContainer:{
        flex:1,
        borderWidth:2,
        borderColor:'#eee',
        padding:5,
        marginBottom:20
    }
};


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

export default connect(mapStateToProps,mapDispatchToProps)(ReaderComponent)
