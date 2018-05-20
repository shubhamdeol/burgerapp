import React from 'react';
import Styles from './ToolBar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../SideDrawer/MenuToggle/MenuToggle'

const toolBar = (props) => {
    return (
        <header className = {Styles.ToolBar}>
            <nav>
                <MenuToggle clicked = {props.reqMenuToggle} />
            </nav>
            <div className={Styles.Logo}><Logo /></div>
            <div className={Styles.DesktopOnly}>

        <NavigationItems/>
            </div>
        </header>
    )
}

export default toolBar;