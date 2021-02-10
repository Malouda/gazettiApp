import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {

        dispatch({
            type:'PASSWORDCHANGE_ERROR',
            payload:null

        });


        return axios.post(`${config.local.server()}/${config.serverRoutes.forgotPassword}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {

                return true;

            })
            .catch(function (response) {

                dispatch({
                    type:'PASSWORDCHANGE_ERROR',
                    payload:'Error check details again'

                });
                return false;
            });
    }

}