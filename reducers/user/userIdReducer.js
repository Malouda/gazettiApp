

export default function (state=null,action) {

    switch (action.type){

        case 'USER_ID':
            return action.payload
    }

    return state;
}