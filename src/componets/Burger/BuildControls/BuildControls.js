import React from 'react'
import Styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

 const Controls = [
    { label: "Cheese" , type: "cheese" },
    { label: "Meat" , type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" }
    ];
 const buildControls = (props) => {

     return (
        <div className= {Styles.buildControls} >
        {
            Controls.map( each => {
                     return <BuildControl key={each.label}
                      label = {each.label} 
                      click = { () => props.ingredientsAdded(each.type)}
                      removeIngredient = {() => props.ingredientsRemoved(each.type)}
                      />
            })
        }            
        </div>
     );
 }
 export default buildControls;