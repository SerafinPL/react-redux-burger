
import * as actionTypes from '../actions/actionTypes';


const initState = {
	error: null,
	loading: false,
	orders: [],
	purchased: false
};


const reducer = (state = initState, action ) => {

	switch (action.type){
		case actionTypes.PURCHASE_INIT:
			return{
				...state,
				purchased: false
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS :

			//action.orderId
			//action.orderData
			const newOrder = {
				id: action.orderId,
				...action.orderData
			}
			return{
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			};
		case actionTypes.PURCHASE_BURGER_FAIL :
			return{
				...state,
				loading: false,
				error: action.error
			};
		case actionTypes.LOADING_START :
			return{
				...state,
				loading: true
			};
		case actionTypes.FECHT_ORDERS_SUCCESS:
			return{
				...state,
				loading: false,
				orders: action.orders


			};
		case actionTypes.FECHT_ORDERS_FAIL:
			return{
				...state,
				loading: false,
				error: action.error
			};
		default: 
		return state;
	}//switch
};

export default reducer;
