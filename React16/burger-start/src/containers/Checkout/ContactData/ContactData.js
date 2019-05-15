import React from "react";
import Button from '../../../components/UI/Button/Button';
import './ContactData.scss';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            address: {
                street: ''
            },
            loading: false,
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        axios.post('/orders.json', {
            ingredients : {
                ...this.props.ingredients
            },
            price : this.props.price,
            customer : {
                name: "dummy",
                address : {
                    street: "charming",
                    country: "HK"
                },
                email: "jho@bib"
            }
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

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"></input>
                <input type="text" name="email" placeholder="Your email"></input>
                <input type="text" name="street" placeholder="Your street"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;