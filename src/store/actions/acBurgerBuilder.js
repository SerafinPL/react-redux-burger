import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';


export const addIngerdient = (ingName) => {
	return{
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	}
}

export const removeIngerdient = (ingName) => {
	return{
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	}
}

export const initIngridients = () => {

	return dispatch => {
		axios.get('/ingredients.json')
		.then(response => {
			dispatch (setIngredients(response.data));
		})
	}
}
	
// 				this.setState({ingredients: response.data});

// 				let ingrARR = Object.keys(this.state.ingredients);
// 				let price = this.state.totalPrice;
// 				ingrARR.map(val =>{
					
// 					price += this.state.ingredients[val] * INGREDIENT_PRICES[val];

// 				})

// 				// let price = this.state.ingredients.salad * INGREDIENT_PRICES.salad +
// 				// 		this.state.ingredients.cheese * INGREDIENT_PRICES.cheese +
// 				// 		this.state.ingredients.meat * INGREDIENT_PRICES.meat +
// 				// 		this.state.ingredients.bacon * INGREDIENT_PRICES.bacon + this.state.totalPrice;
// 				this.setState({totalPrice: price});
// 				this.setState({purchasable: price > 4});

// 		})
// 		.catch(error => {
// 			this.setState({error: true});
// 		});
// };

export const setIngredients = (ingr) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ing: ingr
	};
	
};
