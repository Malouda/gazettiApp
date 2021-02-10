import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function () {


    console.log(`${config.local.server()}/${config.serverRoutes.getPublications}`);
    return function (dispatch,getState) {
        return axios.get(`${config.local.server()}/${config.serverRoutes.getPublications}`,{headers:getState().authorizationReducer})
            .then(function (response) {

                dispatch({
                    type:'ALL_PUBLICATIONS',
                    payload:response.data
                });

                return true;


            })
            .catch(function (response) {

                console.log('error from getAllPublicationsAction',response);

                return false;

            });
    }

}