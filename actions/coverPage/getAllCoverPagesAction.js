import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function (id) {

    return function (dispatch,getState) {
        return axios.post(`${config.local.server()}/${config.serverRoutes.getAllCoverPages}`,{id:id},{headers:getState().authorizationReducer})
            .then(function (response) {

                dispatch({
                    type:'COVER_PAGES',
                    payload:response.data
                });

                dispatch({
                    type:'SELECTED_PUBLICATION_ID',
                    payload:id
                });

                return true;


            })
            .catch(function (response) {

                console.log('error from getAllCoverPagesAction',response);

            });
    }

}