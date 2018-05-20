import React from 'react';
import Styles from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients ).map( igkey => {
        return [...Array(props.ingredients[igkey])].map((_ , i) => {
            return <BurgerIngredients type={igkey} key={igkey+i} /> 
        });
    }).reduce(( acc, cv ) => {
        return acc.concat(cv);
    }, [] )
    if(!transformedIngredients.length){
        transformedIngredients = "Start Adding ingredients to your Burger";
    }
    return (
         <div className = {Styles.ingredientsWrap}>
            <BurgerIngredients type="bread-top" />
                {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;