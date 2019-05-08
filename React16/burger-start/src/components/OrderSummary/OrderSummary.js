import React from "react";
import Button from "../UI/Button/Button";


class OrderSummary extends React.Component {
    
    componentDidUpdate() {
        console.log("[OrderSummary] WillUpdate")
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>)
        })

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the folliwing ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button
                    clicked={this.props.purchaseCancelled}
                    btnType="Danger"
                    >CANCEL
                    </Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType="Success"
                    >CONTINUE</Button>

            </React.Fragment>
        )
    }
    
};

export default OrderSummary;