const initialState = {
	signs: [],
	username: null,
	searchedSigns: [],
	selectedSign: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_SIGNS":
			return {
				...state,
				signs: action.payload.signs.filter((sign) => sign.videos.length > 0),
			};
		case "USERNAME":
			return {
				...state,
				username: action.payload.username,
			};
		case "LOGOUTUSER":
			return {
				...state,
				username: null,
			};
		case "SEARCH_SIGNS":
			return {
				...state,
				searchedSigns: state.signs.filter(
					(sign) => sign.name === action.payload.searchValue
				),
			};
		case "CLEAR_SIGNS":
			return {
				...state,
				searchedSigns: [],
			};
		case "SELECTED_SIGN":
			return {
				...state,
				selectedSign: action.payload.sign,
			};
		case "DESELECT_SIGN":
			return {
				...state,
				selectedSign: null,
			};
		case "DELETE_SIGN_VIDEO":
			const targetSign = state.signs.find((sign) =>
				sign.videos
					.map((video) => video.id)
					.includes(action.payload.deleteVideoID)
			);
			const updatedSign = {
				...targetSign,
				videos: targetSign.videos.filter(
					(video) => video.id !== action.payload.deleteVideoID
				),
			};
			const updatedSigns = state.signs.map((sign) =>
				sign.id === updatedSign.id ? updatedSign : sign
			);

			return {
				...state,
				signs: updatedSigns.filter((sign) => sign.videos.length > 0),
			};
		case "UPDATE_SIGNS_INDEX":
			const inIndex = state.signs.find(
				(sign) => sign.id === action.payload.sign.id
			);

			return {
				...state,
				signs: inIndex
					? state.signs.map((sign) =>
							sign.id === action.payload.sign.id ? action.payload.sign : sign
					  )
					: [...state.signs, action.payload.sign],
			};

		default:
			return state;
	}
};

export default reducer;
