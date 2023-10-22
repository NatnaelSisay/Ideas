const useFetchReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_INIT":
			return { ...state, isLoading: true, isError: false };
		case "FETCH_ERROR":
			return { ...state, isLoading: false, isError: true };
		case "FETCH_SUCCESS":
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case "NOTHING_NEW":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: {
					error: "Nothing New In this category or You have visited everything",
				},
			};
		default:
			return;
	}
};

export default useFetchReducer;
