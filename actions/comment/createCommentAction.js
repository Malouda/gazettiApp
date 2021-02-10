import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function (data) {

    console.log(`${config.local.server()}/${config.serverRoutes.createComment}`)

    return function (dispatch,getState) {
        return axios.post(`${config.local.server()}/${config.serverRoutes.createComment}`,data,{headers:getState().authorizationReducer})

            .then(function (response) {

                dispatch({
                    type:'COMMENTS',
                    payload:response.data
                });

                return true;
            })
            .catch(function (response) {

                return false;

            });
    }

}