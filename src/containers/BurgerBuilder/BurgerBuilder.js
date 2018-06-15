import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
const INGREDIENT_PRICES = {
     salad: 0.5,
     cheese: 0.4,
     meat: 1.3,
     bacon: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("https://mynewlyburgerapp.firebaseio.com/ingredients.json")
        .then( res => {
            this.setState({
                ingredients: res.data
            });
    }).catch( err => {
            this.setState({error: true})
    })
}
    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map ( igkey => {
            return ingredients[igkey];
        }).reduce((( acc , cv ) => {
            return acc + cv;
        }), 0 );

        this.setState({
            purchasable: sum > 0,
        })
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
        this.updatePurchasable(updatedIngredients);
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
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
         this.setState({
             purchasing: true
         })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    makePurchaseHandler = () => {
        /* 
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Shubham",
                address: {
                    street: "Chinch pokli bandar",
                    zip: '122332',
                    email: 'deol.shubham@fmail.com',
                    country: "India",
                },
                deliveryMethod: "fastest"
            },
            
        }
        axios.post('/order.json',order).then( response => {
            this.setState({
                loading: false,
                purchasing: false
            })
            this.props.history.push("./checkout")
        })
        .catch( err => {
            this.setState({
                loading: false,
                purchasing: false
            }) 

    }) */
        const queryParams = [];
        for( let i in this.state.ingredients ) {
            queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
}
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
       
        for(let each in disabledInfo){
            disabledInfo[each] = disabledInfo[each] <= 0;
        }

        
        let orderSummery = null;
        let burger = this.state.error ? <h1>Ingredients can'nt be loaded</h1> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    Price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
                </Aux>
            )

             orderSummery =  <OrderSummery
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                cancelPurchase={this.purchaseCancelHandler}
                makePurchase={this.makePurchaseHandler} />

            if (this.state.loading) {
                orderSummery = <Spinner />
            }


        }

        return (
            <Aux>
                {burger}
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder , axios);