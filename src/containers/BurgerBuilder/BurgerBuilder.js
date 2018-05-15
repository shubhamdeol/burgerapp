import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../componets/Burger/Burger'
import BuildControls from '../../componets/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
     salad: 0.5,
     cheese: 0.4,
     meat: 1.3,
     bacon: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        const priceMinus = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceMinus;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    }
    
    render() {

        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls ingredientsAdded = {this.addIngredientHandler} 
                ingredientsRemoved = {this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;