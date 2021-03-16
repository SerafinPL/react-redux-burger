import React, {Component} from 'react';

import classes from './Layout.module.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	constructor(props){
		super(props);
	}

	state ={
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () =>{
		this.setState({showSideDrawer: false})
	}

	// sideDrawerOpenedHandler = () =>{
	// 	this.setState({showSideDrawer: true})
	// }

	 sideDrawerToggleHandler = () =>{
	 	this.setState( (prevState) => {
	 		return {showSideDrawer: !prevState.showSideDrawer}
	 	})
	 }

	render(){
		return(
		<Aux>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/*opened={this.sideDrawerOpenedHandler}*//>
			<SideDrawer 
				open={this.state.showSideDrawer} 
				closed={this.sideDrawerClosedHandler}/>
			<main className={classes.content}>
				{this.props.children}
			</main>
		</Aux>
		)
	}
};

export default Layout;