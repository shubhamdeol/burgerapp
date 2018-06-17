import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,

    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,

    };
};

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientsfailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
     return dispatch => {           // dispatch here is available due to thunk
         axios.get("https://mynewlyburgerapp.firebaseio.com/ingredients.json")
             .then(res => {
            dispatch(setIngredients(res.data)) 
            }).catch(err => {
            dispatch(fetchIngredientsfailed())       
             })
    };
}; 