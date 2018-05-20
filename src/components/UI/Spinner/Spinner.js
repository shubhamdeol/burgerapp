import React from 'react';
import Styles from './Spinner.css'
;
const spinner = () => {
    return (
        <div className={Styles.spinner}>
            <div className={Styles.rect1}></div>
            <div className={Styles.rect2}></div>
            <div className={Styles.rect3}></div>
            <div className={Styles.rect4}></div>
            <div className={Styles.rect5}></div>
        </div>
    )
}
export default spinner;