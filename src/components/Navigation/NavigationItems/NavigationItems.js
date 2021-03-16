import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';


const navigationItems = (props) => (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/' exact>Stwórz Burgera</NavigationItem>
			<NavigationItem link='/orders'>Zamówienia</NavigationItem>

		</ul>
	);

export default navigationItems;