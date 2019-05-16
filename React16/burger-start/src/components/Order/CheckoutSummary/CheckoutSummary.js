import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.scss";

function checkoutSummary ( props ) {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tasts well!</h1>
            <div style={{width: "100%",  margin: "auto"}}>
                <Burger 
                    ingredients={props.ingredients}>
                </Burger>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancel}>CANCEL
            </Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}>CONTINUE
            </Button>
        </div>
    )
}

export default checkoutSummary;