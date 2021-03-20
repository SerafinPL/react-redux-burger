
import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerStart = (orderData) => {
	return dispatch => {
			dispatch( startLoading() );
			axios.post('/orders.json', orderData)
				.then(response => {
					// this.setState({loading: false});
					// this.props.history.push('/');
					console.log(response.data)
					dispatch( purchaseBurgerSuccess(response.data.name, orderData) );
				} )
				.catch(error => {
					// this.setState({loading: false});
					dispatch( purchaseBurgerFail(error) );
				} );

		
	};
};

export const purchaseBurgerSuccess = (id, orderData) => {
	return{
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData

	};
};

export const purchaseBurgerFail = (error) => {
	return{
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
};

export const startLoading = () => {
	return{
		type: actionTypes.LOADING_START
	};
};

export const purchaseInit = () => {
	return{
		type: actionTypes.PURCHASE_INIT
	};
};


export const fetchOrders = () => {
	return dispatch => {
		dispatch(startLoading());
		axios.get('/orders.json')
			.then(response => {
				const fatchedOrders = [];
				for (let key in response.data){
					fatchedOrders.push({
						...response.data[key],
						id: key

					});
				}
				dispatch(fetchOrdersSuccess(fatchedOrders));
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error));
			});
	};
};

export const fetchOrdersSuccess = (orders) => {
	return{
		type: actionTypes.FECHT_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = (error) => {
	return{
		type: actionTypes.FECHT_ORDERS_FAIL,
		error: error
	};
};

