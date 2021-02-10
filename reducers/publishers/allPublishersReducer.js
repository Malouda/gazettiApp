

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_PUBLISHERS':
            return action.payload
    }

    return state;
}