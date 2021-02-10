import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {

        return axios.post(`${config.local.server()}/${config.serverRoutes.createPublication}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {
                return true;
            })
            .catch(function (response) {

            });
    }

}