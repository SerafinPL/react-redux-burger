import React, {useEffect, useState}from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';



const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [errorState, useErrorState] = useState(null);

		useEffect(() => {
			let reqInterceptor = axios.interceptors.request.use(req => {
				useErrorState(null);
				return req;
			});
			let resInterceptor = axios.interceptors.response.use(res => res, error => {
				useErrorState(error);
			});
			console.log('useEffect', reqInterceptor, resInterceptor );
			return () => {
				console.log('useEffect Return', reqInterceptor, resInterceptor );
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
				console.log('useEffect Return2', reqInterceptor, resInterceptor );
			};

		}, []);

		const showing = errorState ? true : false;

		const ErrorConfirmedHandler = () => {
			useErrorState(null);
		}
		
		return(
			<Aux>
				<Modal 	show={showing}
						modalClosed={ErrorConfirmedHandler}
				>
					{showing ? errorState.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	}
}

export default withErrorHandler;