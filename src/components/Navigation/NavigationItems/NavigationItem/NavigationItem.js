import React from 'react';
import Styles from './NavigationItem.css';
import {NavLink} from 'react-router-dom';
const navigationItem = (props) => {
    return (

        <li className={Styles.NavigationItem}>
        <NavLink 
            to={props.link} 
            activeClassName={Styles.active}
            exact={props.exact}>{props.children}</NavLink>
        </li>
    )

}

export default navigationItem;