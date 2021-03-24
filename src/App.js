import React, { Component, useState, useEffect} from 'react' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';


const App = () => {

	const [testState, setTestState] = useState(true);

	useEffect(() =>{	//it is componentDidMount
		setTimeout(() => {
			setTestState(false)
		},5000);
		//return () => {} //componentWillUnmount
	}, [] );  

  return (
    <div >
      	<BrowserRouter>
	      	<Layout>
      	
	      		<Switch>
		      		
		        	{/*<BurgerBuilder/>*/}
		        	{/*<Checkout />*/}
		        	<Route path='/orders' exact component={OrdersPage} />
		        	<Route path='/checkout' component={Checkout} />
		        	<Route path='/auth' component={Auth} />
		        	<Route path='/logout' component={Logout} />
		        	<Route path='/' exact component={BurgerBuilder} />
	        	</Switch>
        	</Layout>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
