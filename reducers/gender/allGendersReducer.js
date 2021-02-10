

export default function (state=null,action) {

    switch (action.type){

        case 'ALL_GENDERS':
            return action.payload
    }

    return state;
}