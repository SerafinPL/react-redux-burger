
import * as actionTypes from '../actions/actionTypes';


const initState = {
	error: null,
	loading: false,
	orders: []
};


const reducer = (state = initState, action ) => {

	switch (action.type){
		case actionTypes.PURCHASE_BURGER_SUCCESS :

			//action.orderId
			//action.orderData
			newOrder = {
				id: action.orderId,
				...action.orderData
			}
			return{
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.PURCHASE_BURGER_FAIL :
			return{
				...state,
				//action.error
			};
		case actionTypes.LOADING_START :
			return{
				...state,
				loading: true
			};
		default: 
		return state;
	}//switch
};

export default reducer;
