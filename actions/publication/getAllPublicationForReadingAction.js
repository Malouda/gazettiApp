import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function () {


    return function (dispatch,getState) {
        return axios.get(`${config.local.server()}/${config.serverRoutes.getPublicationsFoReading}`,{headers:getState().authorizationReducer})
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