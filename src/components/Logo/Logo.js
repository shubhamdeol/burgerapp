import React from 'react';
import Style from './Logo.css';
import myLogo from '../../assets/images/burger-logo.png';


const logo = () => {
    return (
    <div className={Style.Logo}>
        <img src = {myLogo} alt="burger logo" />
    </div>
    );

}

export default logo;