

export default function (state=null,action) {

    switch (action.type){

        case 'REGISTRATION_ERROR':
            return action.payload
    }

    return state;
}