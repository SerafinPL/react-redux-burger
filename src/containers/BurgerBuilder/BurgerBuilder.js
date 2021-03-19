import React, {Component} from 'react';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/acIndex';



class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props)

	// 	this.state = {...}
	// }
	componentDidMount() {
			this.props.ReduxSetIngredients();
		// axios.get('/ingredients.json')
		// .then(response => {
		// 		this.setState({ingredients: response.data});

		// 		let ingrARR = Object.keys(this.state.ingredients);
		// 		let price = this.state.totalPrice;
		// 		ingrARR.map(val =>{
					
		// 			price += this.state.ingredients[val] * INGREDIENT_PRICES[val];

		// 		})

		// 		// let price = this.state.ingredients.salad * INGREDIENT_PRICES.salad +
		// 		// 		this.state.ingredients.cheese * INGREDIENT_PRICES.cheese +
		// 		// 		this.state.ingredients.meat * INGREDIENT_PRICES.meat +
		// 		// 		this.state.ingredients.bacon * INGREDIENT_PRICES.bacon + this.state.totalPrice;
		// 		this.setState({totalPrice: price});
		// 		this.setState({purchasable: price > 4});

		// })
		// .catch(error => {
		// 	this.setState({error: true});
		// });
	} //componentDidMount()

	state = {
		//ingredients: null,
		//totalPrice: 4,
		//purchasable: false,
		purchasing: false,
		//loading: false,
		//error: false
	}


	updatePurchaseState(ingredients) {
		
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey]
					}).reduce( (summ, el)=> {
						return summ + el;
					}, 0);
		return sum > 0 ;

	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	
	continueHandler = () => {
		this.props.history.push('/checkout');
	}

	render(){

		const disabledInfo = {
			...this.props.ReduxIngs
		};

		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null; 

		let burger = this.props.ReduxError ? <p style={{textAlign: 'center'}}>Składników nie da się załadować</p> : <Spinner />

		if (this.props.ReduxIngs){
	

			burger =(
				<Aux>
					<Burger ingredients={this.props.ReduxIngs}/>
						<BuildControls 
							ingredientAdded={this.props.ReduxOnIgredientAdded}
							ingredientRemove={this.props.ReduxOnIgredientRemoved}
							disabled={disabledInfo}
							purchasable={this.updatePurchaseState(this.props.ReduxIngs)}
							price={this.props.ReduxTotPrice}
							ordered={this.purchaseHandler}
						/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.props.ReduxIngs}
							purchaseCanceled={this.purchaseCancelHandler}
							purchaseContinue={this.continueHandler}
							price={this.props.ReduxTotPrice}
						/>;

				
		}
		 // if (this.state.loading) {
		 // 	orderSummary = <Spinner />
		 // }
		

		return(
				<Aux>
					<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
						{orderSummary}
					</Modal>
					{burger}
				</Aux>
			);
	}
}

const mapStateToProps = state => {
	return{
		ReduxIngs: state.ingredients,
		ReduxTotPrice: state.totalPrice,
		ReduxError: state.error
	};
};

const mapDispachToProps = dispach => {
	return{
		ReduxOnIgredientAdded: (ingName) => dispach( actionCreators.addIngerdient(ingName) ),
		//{type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		ReduxOnIgredientRemoved: (ingName) => dispach( actionCreators.removeIngerdient(ingName) ),
		//{type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
		ReduxSetIngredients: () => dispach( actionCreators.initIngridients() )
	};
};


export default connect(mapStateToProps, mapDispachToProps)( withErrorHandler(BurgerBuilder, axios) );