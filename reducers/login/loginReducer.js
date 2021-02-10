

export default function (state=null,action) {

    switch (action.type){

        case 'AUTH_USER':
            return action.payload
        case 'LOGIN_ERROR':
            return action.payload
    }

    return state;
}