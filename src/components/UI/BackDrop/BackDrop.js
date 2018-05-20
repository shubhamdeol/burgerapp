import Styles from './BackDrop.css';
import React from 'react';

const backDrop = (props) => {
    return (
        props.show ? 
        <div className = {Styles.BackDrop} onClick = {props.clicked}>

        </div> : null 
    );
}

export default backDrop;