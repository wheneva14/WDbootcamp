import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI//Button/Button';
import * as actions from '../../store/actions/index';

import './Auth.scss';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            control : {
                email : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address'
                    },
                    value: '',
                    validate: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validate: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            isSignup: true
        }
    }

    componentDidMount() {
        if ( !this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }


    checkValidity(value, rules) {
        let isValid = true;

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.control,
            [controlName]: {
                ...this.state.control[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.control[controlName].validate),
                touched: true
            }
        }
        this.setState({control: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    

    render () {

        const formElementsArray = [];
        for ( let key in this.state.control) {
            formElementsArray.push({
                id: key,
                config: this.state.control[key]
            })
        }

        let form = formElementsArray.map( formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.valid}
                shouldValidate={formElement.config.validate}
                touched={formElement.config.touched}
                changed={ (event) => this.inputChangedHandler(event, formElement.id)}/>
        ))

        if (this.props.loading) {
            form = <Spinner/>;
        }

        if (this.props.isAuth) {
            form = <Redirect to={this.props.authRedirectPath}/>
        }

        let errorMessage = '';

        if( this.props.error ) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        return (
            <div className="Auth">
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler} 
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth : Boolean(state.auth.token),
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);