

export default function (state=null,action) {

    switch (action.type){

        case 'SELECTED_HEADLINE':
            return action.payload
    }

    return state;
}