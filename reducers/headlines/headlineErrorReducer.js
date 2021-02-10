

export default function (state=null,action) {

    switch (action.type){

        case 'CREATEHEADLINE_ERROR':
            return action.payload
    }

    return state;
}