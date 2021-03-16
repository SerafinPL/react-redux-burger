import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props)

	// 	this.state = {...}
	// }
	componentDidMount() {
		axios.get('/ingredients.json')
		.then(response => {
				this.setState({ingredients: response.data});

				let ingrARR = Object.keys(this.state.ingredients);
				let price = this.state.totalPrice;
				ingrARR.map(val =>{
					
					price += this.state.ingredients[val] * INGREDIENT_PRICES[val];

				})

				// let price = this.state.ingredients.salad * INGREDIENT_PRICES.salad +
				// 		this.state.ingredients.cheese * INGREDIENT_PRICES.cheese +
				// 		this.state.ingredients.meat * INGREDIENT_PRICES.meat +
				// 		this.state.ingredients.bacon * INGREDIENT_PRICES.bacon + this.state.totalPrice;
				this.setState({totalPrice: price});
				this.setState({purchasable: price > 4});

		})
		.catch(error => {
			this.setState({error: true});
		});
	}

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}


	updatePurchaseState(ingredients) {
		
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey]
					}).reduce( (summ, el)=> {
						return summ + el;
					}, 0);
		this.setState({purchasable: sum > 0});

	}

	addIngredientHandler = (type) =>{
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updateIngredients = {
			...this.state.ingredients
		};
		updateIngredients[type] = updateCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updateIngredients
		});
		this.updatePurchaseState(updateIngredients);

	}

	removeIngredientHandler = (type) =>{
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updateCount = oldCount - 1;
		const updateIngredients = {
			...this.state.ingredients
		};
		updateIngredients[type] = updateCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updateIngredients
		});
		this.updatePurchaseState(updateIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	// purchaseContinueHandler = () => {
	// 		//alert('kontynuujesz ale niestety kanapki nie skosztujesz :/');
	
	// }

	continueHandler = () => {
		//MY WAY
		/*
		let list = '';
		for (let property in this.state.ingredients) {
			list += property + '=' + this.state.ingredients[property] + '&'
		}
		console.log(list);
		this.props.history.push('/checkout?' + list);*/

		// Alternative WAY

		const queryParams = [];

		for (let property in this.state.ingredients) {
			queryParams.push(encodeURIComponent(property) + '=' + encodeURIComponent(this.state.ingredients[property]));
		}

		queryParams.push('price=' + this.state.totalPrice.toFixed(2));
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render(){

		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null; 

		let burger = this.state.error ? <p style={{textAlign: 'center'}}>Składników nie da się załadować</p> : <Spinner />

		if (this.state.ingredients){

			

			burger =(
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
						<BuildControls 
							ingredientAdded={this.addIngredientHandler}
							ingredientRemove={this.removeIngredientHandler}
							disabled={disabledInfo}
							purchasable={this.state.purchasable}
							price={this.state.totalPrice}
							ordered={this.purchaseHandler}
						/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.state.ingredients}
							purchaseCanceled={this.purchaseCancelHandler}
							purchaseContinue={this.continueHandler}
							price={this.state.totalPrice}
						/>;

				
		}
		if (this.state.loading) {
			orderSummary = <Spinner />
		}
		

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


export default withErrorHandler(BurgerBuilder, axios);