import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Styles from './Layout.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState(
            {
                showSideDrawer: false
            }
        );
    }

    menuToggleHandler = () => {
        this.setState(
            (prevState) => {
              return {showSideDrawer: !prevState.showSideDrawer}
            }
        )
    }
    render() {
    return (
    <Aux>
        <ToolBar reqMenuToggle = {this.menuToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed= {this.sideDrawerClosedHandler} />
        <main className={Styles.content}>
            {this.props.children}
        </main>
    </Aux>
    )
}
}

export default Layout;