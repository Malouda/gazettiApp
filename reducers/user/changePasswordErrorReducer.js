

export default function (state=null,action) {

    switch (action.type){

        case 'NEWPASSWORD_ERROR':
            return action.payload
    }

    return state;
}