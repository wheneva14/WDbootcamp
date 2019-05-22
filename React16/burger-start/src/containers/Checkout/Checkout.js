import React from "react";
import { connect } from 'react-redux';

import spinner from "../../components/UI/Spinner/Spinner";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import * as actions from '../../store/actions/index';


class Checkout extends React.Component {
    

    componentWillMount () {
        
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace("./checkout/contact-data");
    }

    render () {

        let summary = <Redirect to='/'/>;
        if ( this.props.ings ) {
            const purchaseRedirect = this.props.purchased? <Redirect to='/'/> : null;
            summary = 
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
        }
        return summary
                
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);