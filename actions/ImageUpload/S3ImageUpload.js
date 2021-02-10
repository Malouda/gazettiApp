import { RNS3 } from 'react-native-aws3';
import Chance from 'chance';
import config from '../../config/config';


export default function (path,my_random_string) {


    return function (dispatch) {

        dispatch({
            type:'LOADER_KEY',
            payload:my_random_string
        });

        let chance = new Chance();

        let file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: path,
            name: chance.hash() + '.jpg',
            type: "image/jpg"
        };

        let options = {
            keyPrefix: "coverImages/",
            bucket: "gazettibucket2",
            region: "us-west-2",
            accessKey: "AKIAJ7I7CKWBEROLBSPQ",
            secretKey: "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",
            successActionStatus: 201
        };

        const imgUpload=new Promise((resolve,reject)=>{

            RNS3.put(file,options).then(response => {

                resolve(response);

            }).catch(()=>{

                reject();
            });

        });

        return imgUpload.then((response)=>{

            if (response.status !== 201) {
                throw new Error("Failed to upload image to S3");
            }else {
                //console.log('success upload to s3',response.body.postResponse.key)

                dispatch({
                    type:'UPLOADED_IMAGE_URL',
                    payload:response.body.postResponse.key
                });

                dispatch({
                    type:'LOADER_KEY',
                    payload:null
                });

                return true;

            }
        }).catch(()=>{
            this.props.imageUploadingFalseAction();
            this.props.ErrorAction('NetworkError');

            return false;

        })



    }
}