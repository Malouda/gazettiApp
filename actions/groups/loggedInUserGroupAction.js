import { NavigationActions } from 'react-navigation';
import config from '../../config/config';


export default function (group) {


    return function (dispatch) {

        dispatch({
            type:'USER_GROUP',
            payload:group
        });
    }

}