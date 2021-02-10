

export default function (state=null,action) {

    switch (action.type){

        case 'SELECTED_COVERPAGE':
            return action.payload
    }

    return state;
}