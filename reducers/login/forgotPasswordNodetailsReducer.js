

export default function (state=null,action) {

    switch (action.type){

        case 'PASSWORDCHANGE_ERROR':
            return action.payload
    }

    return state;
}