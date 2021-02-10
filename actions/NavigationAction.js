import { NavigationActions } from 'react-navigation';



export default function navigateTo(routeName, resetStack){

        return function(dispatch,getState){

            if(routeName==='back'){
                dispatch({
                    key:null,
                    type:'Navigation/BACK'
                });

            }else {

                if (resetStack) {
                    dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName })
                        ]
                    }));

                } else {
                    dispatch(NavigationActions.navigate({ routeName }));

                }

            }

            dispatch({
                type:'UPLOADED_IMAGE_URL',
                payload:null
            });

        }

}
