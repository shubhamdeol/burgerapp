import React from 'react';
import Burger from '../../Burger/Burger';
import Styles from './checkoutsummery.css';
import Button from '../../UI/Button/Button';

const checkoutSummery = (props) => {
    return(
        <div className={Styles.CheckoutSummery}>
            <h1> Hope it tastes well!!</h1>
            <Burger ingredients = {props.ingredients}/>
            <Button clicked={props.checkoutSummeryCancel}  btnType="Danger">Cancel </Button>
            <Button clicked={props.checkoutSummerySuccess} btnType="Success">Continue </Button>


        </div>
    );
}

export default checkoutSummery;