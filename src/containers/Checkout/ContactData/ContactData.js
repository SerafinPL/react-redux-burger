import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import {connect} from 'react-redux';

class ContactData extends Component {

	state ={
		
			orderForm :{
						name: {
							elementType: 'input',
							elementConfig: {
								type: 'text',
								placeholder: 'Twoje Imię'
							},
							value: '',
							validation: {
								required: true
							},
							valid: false,
							touched: false
						},
						street: {
							elementType: 'input',
							elementConfig: {
								type: 'text',
								placeholder: 'Ulica'
							},
							value: '',
							validation: {
								required: true
							},
							valid: false,
							touched: false
						},
						zipCode: {
							elementType: 'input',
							elementConfig: {
								type: 'text',
								placeholder: 'Kod-pocztowy'
							},
							value: '',
							validation: {
								required: true,
								minLength: 5,
								maxLength: 5
							},
							valid: false,
							touched: false
						},
						city: {
							elementType: 'input',
							elementConfig: {
								type: 'text',
								placeholder: 'Miasto'
							},
							value: '',
							validation: {
								required: true
							},
							valid: false,
							touched: false
						},
						country: {
							elementType: 'input',
							elementConfig: {
								type: 'text',
								placeholder: 'Kraj'
							},
							value: '',
							validation: {
								required: true
							},
							valid: false,
							touched: false
						},
						email: {
							elementType: 'input',
							elementConfig: {
								type: 'email',
								placeholder: 'Twój Email'
							},
							value: '',
							validation: {
								required: true
							},
							valid: false,
							touched: false
						},
						deliveryMethod: {
							elementType: 'select',
							elementConfig:{
								options: [
									{value: 'fastest', displayValue:'Najszybciej'},
									{value: 'chipest', displayValue:'Najtaniej'}
								]
							} ,
							value: 'fastest',
							validation: {},
							valid: true,
							
						}
					},//orderForm
		loading: false,
		formIsValid: false,

	}

	orderHandler = (event) => {
		event.preventDefault();
			this.setState({loading: true});

			const dataForm = {};
			for (let formElementId in this.state.orderForm){
				dataForm[formElementId] = this.state.orderForm[formElementId].value;
			}
			

			const order = {
				ingredients: this.props.ReduxIngs,
				price: this.props.ReduxTotPrice,
				orderData: dataForm
				
			}
			axios.post('/orders.json', order)
				.then(response => {
					this.setState({loading: false});
					this.props.history.push('/');
				} )
				.catch(error => {
					this.setState({loading: false});
				} );
	}

	checkValidtity = (value, rules) => {
		let isValid = true;
		if (rules){
			if (rules.required){
				isValid = value.trim() !== '' && isValid;
			}

			if (rules.minLength){
				isValid = value.length >= rules.minLength && isValid;
			}

			if (rules.maxLength){
				isValid = value.length <= rules.maxLength && isValid;
			}
		} 
		return isValid;
	}

	inputChangeHandler = (event, id) => {
		
		const updatedOrderForm = {
			...this.state.orderForm
		}; // wewnętrzne obiekty są wskaźnikami trzeba klonować dalej
		const updatedFormElement = {
			...updatedOrderForm[id]
		};
		updatedFormElement.value = event.target.value;

		updatedFormElement.valid = this.checkValidtity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[id] = updatedFormElement;

		let formIsValid = true;
		for (let indetifier in updatedOrderForm){
			formIsValid = (updatedOrderForm[indetifier].valid && formIsValid);
				
		}
		
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


	}

	render(){
		const formElementArr = [];
		for (let key in this.state.orderForm){
			formElementArr.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}


		let form = (
			
					<form onSubmit={this.orderHandler}>
						
						{formElementArr.map(formElement => (
								<Input 
									key={formElement.id}
									elementType={formElement.config.elementType}
									elementConfig={formElement.config.elementConfig}
									value={formElement.config.value}
									invalid={!formElement.config.valid}
									shouldValidate={formElement.config.validation}
									touched={formElement.config.touched}
									changed={(event) => this.inputChangeHandler(event, formElement.id)}
								/>
							))
					}

						
						<Button btnType="Success" disabled={!this.state.formIsValid}>Zamów</Button>
					</form>
			
					);

		if (this.state.loading){
			form = (<Spinner/>);
		}

		return(
				<div className={classes.ContactData}>
					<h4>Wprowadź dane do zamówienia:</h4>
				
					{form}
				</div>
			);
	}
}
	
const mapStateToProps = state => {
	return{
		ReduxIngs: state.ingredients,
		ReduxTotPrice: state.totalPrice
	};
};

export default connect(mapStateToProps)(ContactData);