import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Style from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/errorHandler/errorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ""
                },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ""
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: ""
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ""
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ""
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: "fastest"
            }
        },
    }
    
    formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order);
}

    onChangeHandler(event, key) {
        let updatedOrderForm = {...this.state.orderForm}
        const updatedFormElement = {...updatedOrderForm[key]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[key] = updatedFormElement;
        this.setState(
            {
                orderForm: updatedOrderForm
            }
        )
        
        
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.orderForm) {
            formElementsArray.push({ 
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.formSubmitHandler}>
               {
                   formElementsArray.map( formElement => (
                       <Input elementType={formElement.config.elementType}
                              elementConfig={formElement.config.elementConfig} 
                              value={formElement.config.value}
                              key={formElement.id}
                              changed={(event) => this.onChangeHandler(event, formElement.id)}/>
                   ))
               }
                <Button btnType="Success">ORDER</Button>
            </form>);
        if(this.props.loading) {
            form = <Spinner />
        }
        return(
            <div className = {Style.ContactData}>
            <h4>Enter Your Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( ContactData,axios));