

export default function (state=null,action) {

    switch (action.type){

        case 'SELECTED_PUBLICATION':
            return action.payload
    }

    return state;
}