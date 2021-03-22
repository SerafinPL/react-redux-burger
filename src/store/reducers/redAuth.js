import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const reducer = (state = initState, action) => {

	switch (action.type){
		case actionTypes.AUTH_START:
			return{

			};
		case actionTypes.AUTH_SUCCESS:
			return{

			};
		case actionTypes.AUTH_FAIL:
			return{

			};
		default: return state

	}; // switch


};

export default reducer;