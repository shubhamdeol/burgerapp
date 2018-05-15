import React from 'react';
import Aux from '../../hoc/Aux';
import Styles from './Layout.css';
const layout = (props) => {
    return (
    <Aux>
        <div>Tooldbar, Side drawer backDrop</div>
        <main className={Styles.content}>
            {props.children}
        </main>
    </Aux>
    )
}

export default layout;