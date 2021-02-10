

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_PERSPECTIVES':
            return action.payload
    }

    return state;
}