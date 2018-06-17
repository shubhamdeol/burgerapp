import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    state = {
        purchasing : false,
    }

    componentDidMount() {

        this.props.onInitIngredients();
//         axios.get("https://mynewlyburgerapp.firebaseio.com/ingredients.json")
//         .then( res => {
//             this.setState({
//                 ingredients: res.data
//             });
//     }).catch( err => {
//             this.setState({error: true})
//     })
// }
    }
    updatePurchasable = (ingredients) => {
        
        const sum = Object.keys(ingredients).map ( igkey => {
            return ingredients[igkey];
        }).reduce((( acc , cv ) => {
            return acc + cv;
        }), 0 );

        return sum > 0;
    
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
    //  below code is removed coz now we use redux not query params

    //     const queryParams = [];
    //     for( let i in this.state.ingredients ) {
    //         queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.props.price)
    //     const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout'
        })
}
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
       
        for(let each in disabledInfo){
            disabledInfo[each] = disabledInfo[each] <= 0;
        }

        
        let orderSummery = null;
        let burger = this.props.error ? <h1>Ingredients can'nt be loaded</h1> : <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientsAdded={this.props.onIngredientAdded}
                    ingredientsRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    Price={this.props.price}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.purchaseHandler} />
                </Aux>
            )

             orderSummery =  <OrderSummery
                price={this.props.price}
                ingredients={this.props.ings}
                cancelPurchase={this.purchaseCancelHandler}
                makePurchase={this.makePurchaseHandler} />

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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder , axios));