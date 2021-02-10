import RNFetchBlob from 'react-native-fetch-blob';
import config from '../../config/config';


export default function (path,my_random_string) {


    return function (dispatch,getState) {

        dispatch({
            type:'LOADER_KEY',
            payload:my_random_string
        });


        const uploadImg=new Promise((resolve,reject)=>{

            RNFetchBlob.fetch('POST', `${config.local.server()}/${config.serverRoutes.imgUploadUrl}`, {
                'Content-Type' : 'multipart/form-data',
                'Accept':'application/json',
                'Authorization': 'Bearer ' + getState().loginAction.access_token
            }, [
                { name : 'file', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path)},
            ]).then((resp) => {


                resolve(resp);


            }).catch((err) => {

                reject(err);
            });

        });

        uploadImg.then((resp)=>{
            dispatch({
                type:'UPLOADED_IMAGE_URL',
                payload:resp.data
            });

            dispatch({
                type:'LOADER_KEY',
                payload:null
            });

            return true;
        }).catch((err)=>{

            return false;
        });

        return uploadImg;


    }
}