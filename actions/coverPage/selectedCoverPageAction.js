import { NavigationActions } from 'react-navigation';
import config from '../../config/config';


export default function (data) {


    return function (dispatch) {

        dispatch({
            type:'SELECTED_COVERPAGE',
            payload:data
        });
    }

}