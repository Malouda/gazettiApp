

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_LANGUAGES':
            return action.payload
    }

    return state;
}