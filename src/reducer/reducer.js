
const initialState = {
    signs: [],
    username: null,
    searchedSigns: [],
    selectedSign: null
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
    case 'SEARCH_SIGNS':
        return {
            ...state,
            searchedSigns: state.signs.filter(sign => sign.name === action.payload.searchValue)
        }
     case 'DESELECT_SIGN':
        return {
            ...state,
            searchedSigns: []
        }
    case 'SELECTED_SIGN':
        return {
            ...state,
            selectedSign: action.payload.sign
        }

        default:
            return state 
    
    }




    
}

export default reducer