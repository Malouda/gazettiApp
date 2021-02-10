import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {
        dispatch({
            type:'NEWPASSWORD_ERROR',
            payload:null
        });

        console.log(`${config.local.server()}/${config.serverRoutes.changePassword}`);

        return axios.post(`${config.local.server()}/${config.serverRoutes.changePassword}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {

                return true;
            })
            .catch(function (error) {


                dispatch({
                    type:'NEWPASSWORD_ERROR',
                    payload:error.response.data
                });

                return false;
            });
    }

}