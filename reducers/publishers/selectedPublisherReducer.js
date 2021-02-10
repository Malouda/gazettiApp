

export default function (state=null,action) {

    switch (action.type){

        case 'SELECTED_PUBLISHER':
            return action.payload
    }

    return state;
}