import React, { Component, useState, useEffect} from 'react' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import {Route, BrowserRouter, Switch, withRouter, Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux';
import * as actions from './store/actions/acIndex';


const App = (props) => {

	const [testState, setTestState] = useState(true);

	useEffect(() =>{	//it is componentDidMount
		props.authCheckState();
		// setTimeout(() => {
		// 	setTestState(false)
		// },5000);
		//return () => {} //componentWillUnmount
	});  

	let route = (
			<Switch>
				<Route path='/auth' component={Auth} />
	        	<Route path='/' exact component={BurgerBuilder} />
	        	<Redirect to='/' />
	        </Switch>
		);

	if (props.RedAuth) {
		route = (
			<Switch>
				<Route path='/orders' exact component={OrdersPage} /> 
	        	<Route path='/checkout' component={Checkout} />
	        	<Route path='/logout' component={Logout} />
	        	<Route path='/' exact component={BurgerBuilder} />
	        	<Redirect to='/' />
	        </Switch>
		);
	}

  return (
    <div >
      	<BrowserRouter>
	      	<Layout>
      		  	{route}
	        </Layout>
        </BrowserRouter>
      
    </div>
  );
}

const mapStateToProps = state => {
	return{
		RedAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return{
		authCheckState: () => dispatch(actions.authCheckState()),

	};
};
export default /*withRouter(*/connect(mapStateToProps, mapDispatchToProps)(App)/*)*/; // withRouter for route problems with connect
