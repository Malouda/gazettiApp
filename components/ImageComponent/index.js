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
import LoaderComponent from '../LoaderComponent';
import config from '../../config/config';


const {height,width}=Dimensions.get('window');


class ImageComponent extends React.Component{

    imgViewHeight;

    constructor(){
        super();


        this.state={
            avatarSource: '',
            showLoaderKey:'',
            previewImg:false,
            imgViewWidth:null,
            imgViewHeight:null,
            imgLoaded:false
        };

        this.measureView=this.measureView.bind(this);
        this.showImg=this.showImg.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:'Cover Pages',
        headerStyle: { backgroundColor: '#0D47A1'},
        headerRight:(
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={uStyles.hambergerMenu}>
                <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        )
    });


    componentWillReceiveProps(nextProps){

        //important to initialize height...when deleting so that image does not ta
        this.setState({
            imgViewHeight:null
        })
    }





    measureView(width) {

        this.setState({

            imgViewWidth: width,

        },()=>{

            Image.getSize(config.local.imgServer() + this.props.image_url + this.props.image,(width,height)=>{

                let  ImgRatio=width/height;

                this.setState({
                    imgViewHeight: this.state.imgViewWidth/ImgRatio -25
                });

            });
        });
    }


    showImg(){

        if(this.state.imgViewHeight!==null){

            return(
                <View style={localStyles.imageSubContainer}>
                    <View style={localStyles.image} key={this.props.index}>
                        <Image
                            style={{width: this.state.imgViewWidth-25, height: this.state.imgViewHeight}}
                            onLoadEnd={()=>this.setState({imgLoaded:true})}
                            source={this.state.imgLoaded?{uri:config.local.imgServer() + this.props.image_url +  this.props.image}:require('../../sys_images/placeholder.jpg')}
                        />
                    </View>
                </View>
            )

        }
    }




    render(){


        return(
           <View style={localStyles.imageContainer} onLayout={(event) => this.measureView(event.nativeEvent.layout.width)}>
               {this.showImg()}
           </View>

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
    imageContainer:{
        flex:1,
        padding:5
    },
    imageSubContainer:{
        marginBottom:25
    },
    image:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:7,
        borderWidth:1,
        borderColor:'#eee'

    }
});


function mapStateToProps(state) {

    return {
        allCoverPages:state.allCoverPages
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageComponent)
