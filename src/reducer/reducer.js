
const initialState = {
    signs: [],
    username: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_SIGNS':
    return {
          ...state,
          signs: action.payload.signs,
        };
        case 'USERNAME':
    return {
        username: action.payload.username,
        signs: state.signs
        // This fixed an issue but is it going to break something else? 
    };
    case 'LOGOUTUSER':
        return {
            username: null,
            signs: state.signs 
        }
        default:
            return state 
    
    }




    
}

export default reducer