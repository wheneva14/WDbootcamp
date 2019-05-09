import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


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
            ingredients : null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false,
        }
    }

    componentDidMount () {
        axios.get("https://react-burgerr.firebaseio.com/ingredients.json")
        .then( response => {
            this.setState({
                ingredients :{
                    ...response.data
                }
            })
        })
        .catch ( error => {
            this.setState({error: true})
        })
    }

    addIngHandler = (type) => {
        const updatedIng = {...this.state.ingredients};
        updatedIng[type] += 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.updatePurchaseState(updatedIng)
        this.setState({
                ingredients : updatedIng,
                totalPrice: updatedPrice
            })
    }
    removeIngHandler = (type) => {
        const updatedIng = {...this.state.ingredients};
        if(updatedIng[type] === 0) {
            return;
        }
        updatedIng[type] -= 1;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.updatePurchaseState(updatedIng)
        this.setState({
                ingredients : updatedIng,
                totalPrice: updatedPrice
            })
        
    }

    updatePurchaseState(ingredients) {
        ingredients = {
            ...ingredients
        }

        const sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)

        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        axios.post('/orders.json', {
            ingredients : {
                ...this.state.ingredients
            },
            price : this.state.totalPrice,
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
                purchasing: false
            });
        })
        .catch ( response => {
            this.setState({
                loading: false,
                purchasing: false
            });
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { this.state.loading ? 
                        <Spinner/>
                        :
                        this.state.ingredients ?
                            <OrderSummary 
                                ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice}
                                />
                            :
                            null
                    }
                </Modal>
                {
                    this.state.ingredients ? 
                    <React.Fragment>
                        <Burger 
                            ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingAdd={this.addIngHandler}
                            ingRemove={this.removeIngHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}/>
                    </React.Fragment>
                    :
                    this.state.error ?
                        <p style={{textAlign: "center"}}>Ingredients Cant be loaded!</p>
                        :
                        <Spinner/>
                }
                
                
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);