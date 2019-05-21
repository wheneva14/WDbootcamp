import React from "react";
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";




class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            purchasing: false,
            loading: false,
            error: false,
        }
    }

    componentDidMount () {
        // axios.get("https://react-burgerr.firebaseio.com/ingredients.json")
        // .then( response => {
        //     this.setState({
        //         ingredients :{
        //             ...response.data
        //         }
        //     })
        // })
        // .catch ( error => {
        //     this.setState({error: true})
        // })
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

        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       
        this.props.history.push("/checkout");
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
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
                        this.props.ings ?
                            <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}
                                />
                            :
                            null
                    }
                </Modal>
                {
                    this.props.ings ? 
                    <React.Fragment>
                        <Burger 
                            ingredients={this.props.ings}/>
                        <BuildControls
                            ingAdd={this.props.onIngredientAdded}
                            ingRemove={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch({type: 'ADD_INGREDIENT', ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: 'REMOVE_INGREDIENT', ingredientName: name}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));