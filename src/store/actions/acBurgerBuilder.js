import * as actionTypes from './actionTypes';




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