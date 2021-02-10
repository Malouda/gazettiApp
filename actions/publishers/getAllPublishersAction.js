import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function () {


    return function (dispatch,getState) {
        return axios.get(`${config.local.server()}/${config.serverRoutes.getPublishers}`,{headers:getState().authorizationReducer})
            .then(function (response) {

                dispatch({
                    type:'ALL_PUBLISHERS',
                    payload:response.data
                });


            })
            .catch(function (response) {

                console.log('error from getAllPublishersAction',response);

            });
    }

}