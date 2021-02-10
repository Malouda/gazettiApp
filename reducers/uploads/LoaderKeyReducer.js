

export default function (state=null,action) {

    switch (action.type){

        case 'LOADER_KEY':
            return action.payload
    }

    return state;
}