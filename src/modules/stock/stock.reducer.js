import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.stock, action) {
	switch (action.type) {

		case types.RETRIEVE_STOCK_QUOTES_SUCCESS:
			return {
				...state,
				watchlistResult: action.watchlistResult
			};

		default:
			return state;
	}
}
