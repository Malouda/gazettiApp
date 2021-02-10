

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_LOCATIONS':
            return action.payload
    }

    return state;
}