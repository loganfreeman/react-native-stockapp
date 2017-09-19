import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as finance from './utils/finance';

export function handleAddStock(symbol) {
	dispatch({
		type: types.ADD_STOCK,
		symbol
	});
}

export function handleUpdateStocksSuccess(watchlistResult) {
	return {
		type: types.RETRIEVE_STOCK_QUOTES_SUCCESS,
		watchlistResult
	};
}

export function handleUpdateStocks(symbols) {
	return function (dispatch) {
		return finance.getStock({ stock: symbols }, 'quotes')
			.then(response => response.json())
			.then((json) => {
				let quotes = json.query.results.quote;
				quotes = Array.isArray(quotes) ? quotes : [quotes];

				let watchlistResult = {};
				quotes.forEach((quote) => {
					watchlistResult[quote.symbol] = quote;
				});
				dispatch(handleUpdateStocksSuccess(watchlistResult));
			}).catch((error) => {
				console.log('Request failed', error);
			});
	}
}
