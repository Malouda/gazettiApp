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
import ImagePicker from 'react-native-image-picker';
import LocalImageUpload from '../../actions/ImageUpload/LocalImageUpload';
import S3ImageUpload from '../../actions/ImageUpload/S3ImageUpload';

import LoaderComponent from '../LoaderComponent';
import Chance from 'chance';
import config from '../../config/config';


const {height,width}=Dimensions.get('window');


class UploadImageComponent extends React.Component{
    options = {
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    constructor(){
        super();

        this.state={
            avatarSource: '',
            showLoaderKey:'',
            previewImg:false,
            previewImgWidth:1,
            previewImgHeight:1,
            x: 0,
            y: 0,
            imgViewWidth: 0,
            imgViewHeight: 0,
        };

        this.selectImage=this.selectImage.bind(this);
    }


    componentWillMount(){

        //hacking baby...yeaah.......
        //first Image.getSize is used here because when user presses the back button and comes here again the image properties are lost so
        //we have to get the image sizes again
        //am using setTimeout here because in editing the url is pushed to reducer so componentWillReceiveProps fires first before
        //the view sets its width wich causes the image not to appear so by doing this we check if this.state.imgViewWidth===0 we wait first the
        //view to set its width the we find the dimensions of the image since the view has set its width already


        if(this.props.imageUploadReducer!==null) {

            setTimeout(()=>{

                Image.getSize(config.local.imgServer() +'/coverImages/'+ this.props.imageUploadReducer.split('/')[this.props.imageUploadReducer.split('/').length-1],(width,height)=>{
                    console.log('image properties',width +'|'+height);
                    let  ImgRatio=width/height;
                    let previewImgHeight=this.state.imgViewWidth/ImgRatio;

                    this.setState({
                        previewImgWidth:this.state.imgViewWidth-15,
                        previewImgHeight:previewImgHeight-15
                    });

                });

            },300);

        }
    }

    componentWillReceiveProps(nextProps){


        if(nextProps.imageUploadReducer!==null){

            if (nextProps.imageUploadReducer!==this.props.imageUploadReducer){

                //hacking baby...yeaah.......
                //am using setTimeout here because in editing the url is pushed to reducer so componentWillReceiveProps fires first before
                //the view sets its width wich causes the image not to appear so by doing this we check if this.state.imgViewWidth===0 we wait first the
                //view to set its width the we find the dimensions of the image since the view has set its width already
                if (this.state.imgViewWidth===0){

                    setTimeout(()=>{

                        Image.getSize(config.local.imgServer() +'/coverImages/'+ nextProps.imageUploadReducer.split('/')[nextProps.imageUploadReducer.split('/').length-1],(width,height)=>{
                            console.log('image properties',width +'|'+height);
                            let  ImgRatio=width/height;
                            let previewImgHeight=this.state.imgViewWidth/ImgRatio;

                            this.setState({
                                previewImgWidth:this.state.imgViewWidth-15,
                                previewImgHeight:previewImgHeight-15
                            });

                        });

                    },300);
                }else{

                    Image.getSize(config.local.imgServer() +'/coverImages/'+ nextProps.imageUploadReducer.split('/')[nextProps.imageUploadReducer.split('/').length-1],(width,height)=>{
                        console.log('image properties',width +'|'+height);
                        let  ImgRatio=width/height;
                        let previewImgHeight=this.state.imgViewWidth/ImgRatio;

                        this.setState({
                            previewImgWidth:this.state.imgViewWidth-15,
                            previewImgHeight:previewImgHeight-15
                        });

                    });
                }
            }
        }
    }


    selectImage(){

        ImagePicker.launchImageLibrary(this.options, (response)  => {

            let source = { uri: response.uri };

            if(response.didCancel){
                //do nothing
            }else {

                this.setState({
                    avatarSource: source.uri
                },()=>{

                    let chance=new Chance();
                    let my_random_string=chance.string({length: 10});

                    this.setState({
                        showLoaderKey:my_random_string
                    });


                    if(config.local.environment==='local'){
                        console.log('hey local')
                        this.props.LocalImageUpload(this.state.avatarSource,my_random_string).then((x)=>{
                            if(x){
                                if(this.props.uploadedTrue){

                                    this.props.uploadedTrue(true);
                                }
                            }

                        });

                    }else {
                        this.props.S3ImageUpload(this.state.avatarSource,my_random_string).then((x)=>{

                            if(x){
                                if(this.props.uploadedTrue){

                                    this.props.uploadedTrue(true);
                                }
                            }
                        });
                    }

                });
            }
        });
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



        const showLoader=()=>{

            if (this.props.LoaderKeyReducer!==null){
                if(this.props.LoaderKeyReducer===this.state.showLoaderKey){

                    return(
                        <LoaderComponent/>
                    )
                }
            }

        };

        const showPreviewImg=()=>{

            if(this.props.imageUploadReducer!==null){

                return(
                    <Image
                        style={{width: this.state.previewImgWidth, height: this.state.previewImgHeight}}
                        source={{uri:`${config.local.imgServer()}/coverImages/${this.props.imageUploadReducer.split('/')[this.props.imageUploadReducer.split('/').length-1]}`}}
                    />
                )
            }
        };

        return(
            <View>
                <View style={this.props.imageUploadReducer!==null? localStyles.previewImgContainer:{}} onLayout={(event) => this.measureView(event)}>
                    {showPreviewImg()}
                </View>
                {showLoader()}
                <View style={[uStyles.row,localStyles.imageComponentContainer]}>
                    <View style={uStyles.textInputContainer}>
                        <View style={[localStyles.textInput,uStyles.textInput]}>
                            <TextInput
                                placeholder="Image Url"
                                underlineColorAndroid="#fff"
                                editable={false}
                                value={this.state.avatarSource}
                            />
                        </View>
                    </View>
                    <View style={uStyles.buttonContainer}>
                        <View style={uStyles.buttonSubContainer}>
                            <TouchableOpacity style={uStyles.dashBoardbutton} onPress={()=>this.selectImage()}>
                                <Text style={uStyles.dashBoardButtonText}>Select Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const localStyles=StyleSheet.create({

    imageComponentContainer:{
        marginTop:10
    },
    previewImgContainerImgNotLoaded:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:20,
    },
    previewImgContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#95a5a6',
        borderRadius:5
    }

});


function mapStateToProps(state) {

    return {

        imageUploadReducer:state.imageUploadReducer,
        LoaderKeyReducer:state.LoaderKeyReducer
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            navigateTo:navigateTo,
            LocalImageUpload:LocalImageUpload,
            S3ImageUpload:S3ImageUpload

        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadImageComponent)
