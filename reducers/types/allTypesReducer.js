

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_TYPES':
            return action.payload
    }

    return state;
}