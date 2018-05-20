import React,{ Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {

    componentWillUpdate() {
        console.log("Order summery will Update");
    }

    render() {
    const ingredientSummery = Object.keys(this.props.ingredients).map( igkey => {
        return (
            <li key={igkey}>
                <span style = {{textTransform: 'capitalize'}}> {igkey} </span>: {this.props.ingredients[igkey]} 
            </li>
        )
    });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><b>Total Price: {this.props.price.toFixed(2)}</b></p>
            <p>Continue to checkout!!</p>
            <Button clicked= {this.props.makePurchase} btnType= "Success">Success</Button>
            <Button clicked = {this.props.cancelPurchase} btnType = "Danger">Cancel!</Button>
        </Aux>
    )
}
}

export default OrderSummery;