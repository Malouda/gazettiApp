

export default function (state=null,action) {

    switch (action.type){

        case 'USER_DATA':
            return action.payload
    }

    return state;
}