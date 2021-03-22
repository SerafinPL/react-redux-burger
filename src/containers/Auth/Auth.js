import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/acIndex';
import {connect} from 'react-redux';

class Auth extends Component {

	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Adres e-mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Hasło'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}, // controls:
		isSignup: true
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

			if (rules.isEmail) {
	            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	            isValid = pattern.test(value) && isValid
	        }

	        if (rules.isNumeric) {
	            const pattern = /^\d+$/;
	            isValid = pattern.test(value) && isValid
	        }

		} 
		return isValid;
	}

	inputChangeHandler = (event, controlName) => {
		
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidtity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}

		}; // wewnętrzne obiekty są wskaźnikami trzeba klonować dalej
		// let formIsValid = true;
		// for (let indetifier in updatedControls){
		// 	formIsValid = (updatedControls[indetifier].valid && formIsValid);
		// }
		this.setState({controls: updatedControls/*, formIsValid: formIsValid*/});
		
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthMod = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup}
		});
	}

	render (){

		const formElementArr = [];
		for (let key in this.state.controls){
			formElementArr.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		const form = formElementArr.map(formElement => (
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangeHandler(event, formElement.id)}
				label={formElement.config.elementConfig.type == 'email' ? 'E-mail' : 'Hasło'}
			/>

		));

		return(
			<div className={classes.Auth}>
				<form onSubmit={(event) => this.submitHandler(event)}>
					{form}
					<Button btnType='Success'>{this.state.isSignup ? 'ZAREJESTRUJ' : 'ZALOGUJ'}</Button>
				</form>
				<Button 
					btnType='Danger'
					clicked={this.switchAuthMod}>
						Zmień na {this.state.isSignup ? 'Zaloguj' : 'Zarejestruj'}
				</Button>
			</div>
		);
	}
};


const mapDispatchToProps = dispatch => {
	return{
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
	};
};

export default connect(null, mapDispatchToProps)(Auth);