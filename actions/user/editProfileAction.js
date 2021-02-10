import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {

        return axios.post(`${config.local.server()}/${config.serverRoutes.editProfile}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {

                dispatch({
                    type:'UPLOADED_IMAGE_URL',
                    payload:null
                });
                return true;
            })
            .catch(function (error) {


                return false;
            });
    }

}