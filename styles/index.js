import {
    Dimensions,StyleSheet
} from 'react-native';


const {height,width}=Dimensions.get('window');



let uStyles=StyleSheet.create({

    mainView:{
        flex:1,
    },
    container:{
        flex:1,
        margin:15,
        justifyContent:'center',
        backgroundColor:'#fff'

    },
    row:{
        flex:1,
        flexDirection:'row'
    },
    column:{
      flex:1
    },
    textInputContainer:{
        flex:1,
        marginBottom:20
    },
    textInput:{
        height:50,
        borderWidth:1,
        borderColor:'#7f8c8d',
        marginBottom:20,
        borderRadius:5
    },
    textinputMultiline:{
        borderWidth:1,
        borderColor:'#7f8c8d',
        marginBottom:20,
        borderRadius:5
    },
    picker:{
        borderWidth:1,
        borderColor:'#bdc3c7',
        borderRadius:7,
        marginBottom:20
    },
    buttonContainer:{
        flex:1,
        marginLeft:5
    },
    buttonSubContainer:{
        height:50,
    },
    button:{
        flex:1,
        backgroundColor:'#7f8c8d',
        height:40,
        padding:10,
        borderRadius:7
    },
    disabledDashButton:{
        flex:1,
        backgroundColor:'#ecf0f1',
        height:40,
        padding:10,
        borderRadius:7
    },
    dashBoardbutton:{
        flex:1,
        height:40,
        padding:10,
        borderRadius:7,
        borderWidth:1,
        borderColor:'#7f8c8d'
    },
    buttonText:{
        fontWeight:'700',
        color:'#fff',
        textAlign:'center',
    },
    dashBoardButtonText:{
        fontWeight:'700',
        color:'#7f8c8d',
        textAlign:'center',
    },
    hambergerMenu:{
        width:50
    },
    hambergerMenuText:{
        flex:1,
        alignItems:'center',
        color:'#fff'
    },
    radioMainContainer:{
        flex:1,
        flexDirection:'row',
    },
    radioContainer:{
        flex:2,
        flexWrap:'wrap',
        alignItems: 'flex-start',
        marginRight:10
    },
    radioColumn:{
        flex:1
    },
    radio:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginRight:0.5
    },
    radioTextContainer:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    radioText:{
        textAlign:'center',
        fontWeight:'400',
    },
    radioHeading:{
        flex:1,
        justifyContent:'center',
        marginBottom:10
    },
    radioHeadingText:{
        fontWeight:'700'
    },
    successText:{
        textAlign:'center',
        color:'#2E7D32'
    },
    errorText:{
        textAlign:'center',
        color:'#c0392b'
    },
    boldText:{
        fontWeight:'700'
    }
});

export default uStyles;