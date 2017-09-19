import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.stock, action) {
	const { watchlist } = state;

	switch (action.type) {

		case types.RETRIEVE_STOCK_QUOTES_SUCCESS:
			return {
				...state,
				watchlistResult: action.watchlistResult,
				selectedStock: watchlist.length > 0 ? watchlist[0] : {}
			};

		case types.ADD_STOCK:
			const { symbol } = action;
			const addedStock = { symbol: symbol.toUpperCase(), share: 100 };
			return {
				...state,
				addedStock
			};

		default:
			return state;
	}
}
