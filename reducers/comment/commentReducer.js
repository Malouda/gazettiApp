

export default function (state=null,action) {

    switch (action.type){

        case 'COMMENTS':
            return action.payload
    }

    return state;
}