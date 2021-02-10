

export default function (state=null,action) {

    switch (action.type){

        case 'UPLOADED_IMAGE_URL':
            return action.payload
    }

    return state;
}