

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_PUBLICATIONS':
            return action.payload
    }

    return state;
}