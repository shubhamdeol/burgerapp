import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux';
const sideDrawer = (props) => {
    let attachedClasses = [Styles.SideDrawer, Styles.Close]
    if(props.open ){
        attachedClasses = [Styles.SideDrawer, Styles.Open]
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <div className={Styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>
    )
}
export default sideDrawer;