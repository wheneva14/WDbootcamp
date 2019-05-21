import React from "react";
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactData.scss';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formIsValid : false,
            orderForm: {
                name : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validate: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validate: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: '',
                    validate: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validate: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your mail'
                    },
                    value: '',
                    validate: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod : {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validate: {},
                    value: '',
                    valid: true
                },
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if ( rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if ( rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {};
        for( let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        axios.post('/orders.json', {
            ingredients : {
                ...this.props.ings
            },
            orderData : formData,
            price: this.props.price
            
        })
        .then( response => {
            this.setState({
                loading: false,
            });
            this.props.history.push("/");
        })
        .catch ( response => {
            this.setState({
                loading: false,
            });
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validate);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for ( let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map( formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validate}
                        touched={formElement.config.touched}
                        changed={ (event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);