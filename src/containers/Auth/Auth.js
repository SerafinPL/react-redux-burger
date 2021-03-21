import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

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
					minLenght: 6
				},
				valid: false,
				touched: false
			}
		}
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
				<form>
					{form}
					<Button btnType='Success'>ZAREJESTRUJ</Button>

				</form>
			</div>
		);
	}
};

export default Auth;