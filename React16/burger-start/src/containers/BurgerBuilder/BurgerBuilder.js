import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients : {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        }
    }

    addIngHandler = (type) => {
        this.setState( prevState => {
            const updatedIng = {...prevState.ingredients};
            updatedIng[type] += 1;
            const updatedPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients : updatedIng,
                totalPrice: updatedPrice
            }
        })
    }
    removeIngHandler = (type) => {
        this.setState( prevState => {
            const updatedIng = {...prevState.ingredients};
            if(updatedIng[type] === 0) {
                return;
            }
            updatedIng[type] -= 1;
            const updatedPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return {
                ingredients : updatedIng,
                totalPrice: updatedPrice
            }
        })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<= 0;
        }

        return (
            <React.Fragment>
                <Burger 
                    ingredients={this.state.ingredients}/>
                <BuildControls
                    ingAdd={this.addIngHandler}
                    ingRemove={this.removeIngHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}/>
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;