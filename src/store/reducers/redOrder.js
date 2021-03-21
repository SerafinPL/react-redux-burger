
import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';


const initState = {
	error: null,
	loading: false,
	orders: [],
	purchased: false
};


const reducer = (state = initState, action ) => {

	switch (action.type){
		case actionTypes.PURCHASE_INIT:
			return updateObject(state, { purchased: false });
			// return{
			// 	...state,
			// 	purchased: false
			// };
		case actionTypes.PURCHASE_BURGER_SUCCESS :

			const newOrder = updateObject(action.orderData, {id: action.orderId});
			// const newOrder = {
			// 	id: action.orderId,
			// 	...action.orderData
			// }
			return updateObject(state,{
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			});
			// return{
			// 	...state,
			// 	loading: false,
			// 	orders: state.orders.concat(newOrder),
			// 	purchased: true
			// };
		case actionTypes.PURCHASE_BURGER_FAIL :
			return updateObject(state, {
				loading: false,
				error: action.error
			});
			// return{
			// 	...state,
			// 	loading: false,
			// 	error: action.error
			// };
		case actionTypes.LOADING_START :
			return updateObject(state, { loading: true });
			// return{
			// 	...state,
			// 	loading: true
			// };
		case actionTypes.FECHT_ORDERS_SUCCESS:
			return updateObject(state, {
				loading: false,
				orders: action.orders
			});
			// return{
			// 	...state,
			// 	loading: false,
			// 	orders: action.orders
			// };
		case actionTypes.FECHT_ORDERS_FAIL:
			return updateObject(state, {
				loading: false,
				error: action.error
			});
			// return{
			// 	...state,
			// 	loading: false,
			// 	error: action.error
			// };
		default: 
		return state;
	}//switch
};

export default reducer;
