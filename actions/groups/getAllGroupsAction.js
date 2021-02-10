import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function () {


    console.log('in getAllGroupsAction',`${config.local.server}/${config.serverRoutes.getAllgroups}`);

    return function (dispatch,getState) {
        return axios.get(`${config.local.server()}/${config.serverRoutes.getAllgroups}`,{headers:getState().authorizationReducer})
            .then(function (response) {

                    dispatch({
                        type:'USER_GROUPS',
                        payload:response.data
                    });


            })
            .catch(function (response) {


            });
    }

}