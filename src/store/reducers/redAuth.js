import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authSuccess = (state, action) => {
	updateObject(state, {
		error: false, 
		loading: false,
		token: action.token,
		userId: action.userId
	});
};

const authFail = (state, action) => {
	updateObject(state, {
		error: action.error, 
		loading: false,
	});
};

const reducer = (state = initState, action) => {

	switch (action.type){
		case actionTypes.AUTH_START: return updateObject(state, {error: false, loading: true});
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		default: return state

	}; // switch


};

export default reducer;