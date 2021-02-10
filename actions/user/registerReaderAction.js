import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {
        dispatch({
            type:'REGISTRATION_ERROR',
            payload:null
        });

        return axios.post(`${config.local.server()}/${config.serverRoutes.registerReader}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {

                return true;
            })
            .catch(function (error) {


                dispatch({
                    type:'REGISTRATION_ERROR',
                    payload:error.response.data
                });

                return false;
            });
    }

}