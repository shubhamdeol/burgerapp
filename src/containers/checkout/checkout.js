import React, {Component} from 'react';
import Styles from './checkout.css';
import CheckoutSummery from '../../components/order/checkoutsummery/checkoutsummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {
   
   // now this will be handled by redux
    // state = {
    //     ingredients: null,
    //     price: ''
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for(let param of query.entries()){
    //     // each entry will have this format ['salad', '1']
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         price: price
    //     })
    // }
    
    checkoutSuccessHandler = () => {
            this.props.history.replace("/checkout/contact-data");
    }

    checkoutCancelHandler = () => {
            this.props.history.goBack();
    }
    
    render() {
        let summery = <Redirect to="/"/>
        if(this.props.ings){
            summery = (
            <div className={Styles.Checkout}>
            <CheckoutSummery
                ingredients={this.props.ings}
                checkoutSummerySuccess={this.checkoutSuccessHandler}
                checkoutSummeryCancel={this.checkoutCancelHandler}
            />
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
                </div>
        )
        }
        return summery
    }
} 

const mapStateToProps = state => {
    return {
         ings: state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);