import axios from 'axios';
import config from '../../config/config';


export default function (data) {


    return function (dispatch,getState) {

        dispatch({
            type:'CREATEHEADLINE_ERROR',
            payload:null
        });

        return axios.post(`${config.local.server()}/${config.serverRoutes.createHeadline}`,data,{headers:getState().authorizationReducer})
            .then(function (response) {
                return true;
            })
            .catch(function (error) {

                dispatch({
                    type:'CREATEHEADLINE_ERROR',
                    payload:error.response.data
                });

                return false;
            });
    }

}