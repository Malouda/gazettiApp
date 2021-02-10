import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {
        return axios.post(`${config.local.server()}/${config.serverRoutes.newPassword}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {

                return true;

            })
            .catch(function (response) {

                return false;
            });
    }

}