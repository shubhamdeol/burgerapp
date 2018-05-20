import React from 'react';
import Styles from './BuildControl.css';

const buildControl = ( props ) => {
 return (
     <div className = {Styles.BuildControl}>
        <div className={Styles.Label}>{props.label}</div>
         <button className={Styles.Less} onClick = {props.removeIngredient} disabled = { props.disabled }>Less</button>
        <button className={Styles.More} onClick = {props.click}>More</button>
     </div>

 )
}

export default buildControl;