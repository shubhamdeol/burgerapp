import React from 'react';
import Style from './order.css';

const order = ( props ) => {
  const ingredients = [];
  for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                amount:props.ingredients[ingredientName], 
                name: ingredientName
            });
  }
  
  const ingredientOutput = ingredients.map( each => {
      return <span 
      style={{textTransform: 'capitalize',
    display: 'inline-block',
     margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px'}}
      key={each.name}>{each.name} : ({each.amount})</span>
  })
    return(
        <div className={Style.Order}>
            <p>Ingredients: {
                ingredientOutput
            }
            </p>
            <p>Price: <strong>UST {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    )
}

export default order;