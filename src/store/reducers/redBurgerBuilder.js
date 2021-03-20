import * as actionTypes from '../actions/actionTypes';

const initialState = {

		ingredients: null,//{
		// 	// salad: 	0,
		// 	// cheese: 0,
		// 	// meat: 	0,
		// 	// bacon: 	0
		// },
		totalPrice: 4,
		error: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const reducer = (state = initialState, action) => {

	switch (action.type){
		case actionTypes.ADD_INGREDIENT:
			return{
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		
		case actionTypes.REMOVE_INGREDIENT: 
			return{
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};

		case actionTypes.SET_INGREDIENTS:

			let ingrARR = Object.keys(action.ing);
				let price = 4;
				ingrARR.map(val =>{
					
					price += action.ing[val] * INGREDIENT_PRICES[val];
					return true;
				}) 

			return{
				...state,
				//ingredients: action.ing, // kolejność z serwera
				// własna kolejność
				ingredients: {
					salad: action.ing.salad,
					bacon: action.ing.bacon,
					cheese: action.ing.cheese,
					meat: action.ing.meat
				},
				error: false,
				totalPrice: price
			};

		case actionTypes.FETCH_INGREDIENTS_FAIL:
			return{
				...state,
				error: true
			}

		default: 
		return state;
		
	}//switch
	
};

export default reducer;