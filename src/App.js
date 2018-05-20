import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Aux from './hoc/Aux/Aux';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
              <BurgerBuilder />
        </Layout>
      </Aux>
    );
  }
}

export default App;
