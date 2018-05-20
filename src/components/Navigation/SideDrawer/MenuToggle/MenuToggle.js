import React from 'react';
import Styles from './MenuToggle.css';
const menuToggle = (props) => {
    return (
        <div className = {Styles.MenuToggle} onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
        </div>
    )
}

export default menuToggle;