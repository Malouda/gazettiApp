

export default function (state=null,action) {

    switch (action.type){

        case 'SELECTED_PUBLICATION_ID':
            return action.payload
    }

    return state;
}