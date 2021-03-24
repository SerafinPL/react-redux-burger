import React {useEffect}from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../../store/actions/acIndex';

const Logout = (props) => (

	useEffect(() => {
		props.onLogout();
	});

	);


const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actionCreators.logout()),
	};
};

export default Logout;