import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import config from '../../config/config';


export default function (id) {



    return function (dispatch,getState) {

        dispatch({
            type:'HEADINES',
            payload:null
        });

        dispatch({
            type:'SELECTED_PUBLICATION_ID',
            payload:id
        });

        return axios.post(`${config.local.server()}/${config.serverRoutes.getAllHeadlines}`,{id:id},{headers:getState().authorizationReducer})
            .then(function (response) {

                dispatch({
                    type:'HEADINES',
                    payload:response.data
                });

                return true;


            })
            .catch(function (response) {


                return false;

            });
    }

}