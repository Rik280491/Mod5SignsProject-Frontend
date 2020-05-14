
const initialState = {
    signs: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_SIGNS':
    return {
          ...state,
          signs: action.payload.signs,
        };
        default:
            return state 
    
    }




    
}

export default reducer