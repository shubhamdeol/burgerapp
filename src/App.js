import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Aux from './hoc/Aux/Aux';
import { Route } from 'react-router-dom';
import CheckOut from './containers/checkout/checkout';
import Orders from './containers/orders/orders';


class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
              <Route path="/" exact component = {BurgerBuilder} />
              <Route path="/checkout"  component={CheckOut} />
              <Route path="/orders"  component={Orders} />
        </Layout>
      </Aux>
    );
  }
}

export default App;
