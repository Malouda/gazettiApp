

export default function (state=null,action) {

    switch (action.type){

        case 'LOGIN_ERROR':
            return action.payload
    }

    return state;
}