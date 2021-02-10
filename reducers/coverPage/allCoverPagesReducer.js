

export default function (state=null,action) {

    switch (action.type){

        case 'COVER_PAGES':
            return action.payload
    }

    return state;
}