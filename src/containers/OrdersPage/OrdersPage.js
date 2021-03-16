import React, {useEffect, useState, Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

// class OrdersPage extends Component{

const OrdersPage = (props) => {
	const [loadingHook, loadingSetHook] = useState(true);
	const [ordersHook, ordersSetHook] = useState([]);
	
	// HOOK BASE

	useEffect(() => {
		
		axios.get('/orders.json')
			.then(response => {
				const fatchedOrders = [];
				for (let key in response.data){
					fatchedOrders.push({
						...response.data[key],
						id: key

					});
				}

				
				ordersSetHook(fatchedOrders);
				
				loadingSetHook(false);
			})
			.catch(error => {
				loadingSetHook(false);
			});

	},[]); 
	// CLASS BASE
	// state ={
	// 	orders: [],
	// 	loading: true
	// }

	// componentDidMount() {
	// 	axios.get('/orders.json')
	// 		.then(response => {
	// 			const fatchedOrders = [];
	// 			for (let key in response.data){
	// 				fatchedOrders.push({
	// 					...response.data[key],
	// 					id: key

	// 				});
	// 			}
	// 			this.setState({loading:false, orders: fatchedOrders});
	// 		})
	// 		.catch(error => {
	// 			this.setState({loading:false});
	// 		});
	// }

	// render(){
	let loading = null;
	if (loadingHook) {
		loading = <Spinner/>;
	}
	  

		return(
			<div>
				{loading}
				{//this.state.orders.map(order => (
					
					ordersHook.map(order => (
						<Order 
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
						/>
					))}
				}
				
				
			</div>
		);

	// }
	

}

export default withErrorHandler(OrdersPage, axios);