import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function (data) {

    return function (dispatch,getState) {


        return axios.post(`${config.local.server()}/${config.serverRoutes.deleteCoverPage}`,data,{headers:getState().authorizationReducer})

            .then(function (response) {

                dispatch({
                    type:'COVER_PAGES',
                    payload:response.data
                });

                return true;
            })
            .catch(function (response) {

                return false;

            });
    }

}