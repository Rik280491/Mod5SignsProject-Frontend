
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
          signs: action.payload.signs.filter(sign => sign.videos.length > 0)
        };
        case 'USERNAME':
    return {
        ...state,
        username: action.payload.username,
         
    };
    case 'LOGOUTUSER':
        return {
            ...state,
            username: null,
        }
    case 'SEARCH_SIGNS':
        return {
            ...state,
            searchedSigns: state.signs.filter(sign => sign.name === action.payload.searchValue)
        }
     case 'CLEAR_SIGNS':
        return {
            ...state,
            searchedSigns: []
        }
    case 'SELECTED_SIGN':
        return {
            ...state,
            selectedSign: action.payload.sign
        }
    case 'DESELECT_SIGN':
        return {
            ...state, 
            selectedSign: null
        }
    // case 'DELETE_SIGN_VIDEO':
    //     return {
    //         ...state,
    //         signs: state.signs.filter(sign => sign.movie)
    //     }

        default:
            return state 
    
    }




    
}

export default reducer