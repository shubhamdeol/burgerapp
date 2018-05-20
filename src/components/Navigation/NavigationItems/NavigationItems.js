import React from 'react';
import Styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = () => {
    return (
        <ul className={Styles.NavigationItems}>
            <NavigationItem link="/" active> Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout </NavigationItem>
        </ul>
    )
}

export default navigationItems;