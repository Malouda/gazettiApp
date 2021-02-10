import { NavigationActions } from 'react-navigation';
import config from '../../config/config';


export default function () {


    return function (dispatch) {

        let routeName='Login';

        dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName })
            ]
        }));

        dispatch({
            type:'USER_LOGOUT',
        });
    }

}