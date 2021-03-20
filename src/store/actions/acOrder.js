
import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerStart = (orderData) => {
	return dispatch => {
			
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

	}
};

export const purchaseBurgerFail = (error) => {
	return{
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
};