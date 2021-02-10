

export default function (state=null,action) {

    switch (action.type){

        case 'USER_GROUPS':
            return action.payload
    }

    return state;
}