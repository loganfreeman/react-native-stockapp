import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.stock, action) {
	const { watchlist, watchlistResult } = state;

	switch (action.type) {

		case types.HANDLE_PROPERTY_SELECTED:
			return {

			};

		case types.DELETE_STOCK:
			return {

			};


		case types.RETRIEVE_STOCK_QUOTES_SUCCESS:
			return {
				...state,
				watchlistResult: action.watchlistResult,
				selectedStock: watchlist.length > 0 ? watchlist[0] : {}
			};

		case types.ADD_STOCK:
			const { symbol, quote } = action;
			const addedStock = { symbol: symbol.toUpperCase(), share: 100 };
			return {
				...state,
				watchlist: [...watchlist, addedStock],
				selectedStock: addedStock,
				watchlistResult: {
					...watchlistResult,
					[symbol]: quote
				}
			};

		default:
			return state;
	}
}
