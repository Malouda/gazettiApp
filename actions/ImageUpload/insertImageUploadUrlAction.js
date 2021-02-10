import { NavigationActions } from 'react-navigation';
import config from '../../config/config';


export default function (url) {


    return function (dispatch) {

        dispatch({
            type:'UPLOADED_IMAGE_URL',
            payload:url
        });
    }

}