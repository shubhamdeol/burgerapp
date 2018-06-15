import React from 'react';
import Styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = () => {
    return (
        <ul className={Styles.NavigationItems}>
            <NavigationItem link="/" exact> Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders </NavigationItem>
        </ul>
    )
}

export default navigationItems;