import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.stock, action) {
	const { watchlist, watchlistResult } = state;
	const { symbol, property, quote } = action;


	switch (action.type) {

		case types.HANDLE_PROPERTY_SELECTED:
			return {
				...state,
				selectedProperty: property
			};

		case types.DELETE_STOCK:
			const newWatchlist = watchlist.filter(stock => stock.symbol === symbol);
			const selectedStock = newWatchlist.length > 0 ? newWatchlist[0]: {};
			return {
				...state,
				watchlist: newWatchlist,
				selectedStock

			};


		case types.RETRIEVE_STOCK_QUOTES_SUCCESS:
			return {
				...state,
				watchlistResult: action.watchlistResult,
				selectedStock: watchlist.length > 0 ? watchlist[0] : {}
			};

		case types.ADD_STOCK:
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
