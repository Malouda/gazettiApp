import axios from 'axios';
import config from '../../config/config';
import { NavigationActions } from 'react-navigation';


export default function (data) {

    return function (dispatch,getState) {

        //remove login error if any
        dispatch({
            type:'LOGIN_ERROR',
            payload:false
        });


        return axios.post(`${config.local.bareServer}/${config.serverRoutes.getToken}`,{
            grant_type:'password',
            client_id:config.local.client_id,
            client_secret:config.local.client_secret,
            username:data.username,
            password:data.password,
            scope:'*'
        })
            .then(function (response) {

                //store access_token and refresh tokens
                dispatch({
                    type:'AUTH_USER',
                    payload:{
                        userAuthenticated:true,
                        access_token:response.data.access_token,
                        refresh_token:response.data.refresh_token
                    }
                });

                //store headers to use in other request
                dispatch({
                    type:'AUTH_HEADERS',
                    payload:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getState().loginAction.access_token
                    }
                });

                //get user details
                return axios.get(`${config.local.server()}/${config.serverRoutes.getUserData}`,{headers:getState().authorizationReducer})
                    .then(function (response) {

                        dispatch({
                            type:'USER_DATA',
                            payload:response.data
                        });

                        let routeName=getState().userDataReducer[0].user_group_name;

                        console.log(routeName);

                        //route to appropriate route
                        dispatch(NavigationActions.navigate({ routeName }));
                    })
                    .catch(function (response) {

                        console.log('error loggin',response);

                    });

           })
            .catch(function (response) {

                dispatch({
                    type:'LOGIN_ERROR',
                    payload:true
                });

            });
    }

}