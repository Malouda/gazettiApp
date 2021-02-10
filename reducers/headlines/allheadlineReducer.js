

export default function (state=null,action) {

    switch (action.type){

        case 'HEADINES':
            return action.payload
    }

    return state;
}