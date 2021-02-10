

export default function (state=null,action) {

    switch (action.type){

        case 'USER_GROUP':
            return action.payload
    }

    return state;
}