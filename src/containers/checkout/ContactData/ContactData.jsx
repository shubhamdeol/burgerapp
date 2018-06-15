import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Style from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';

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
                value: ""
            }
        },
        loading: false
    }
    
    formSubmitHandler = (event) => {
        event.preventDefault();

        
        this.setState({
            loading: true
        })
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
             }
        axios.post('/order.json',order).then( response => {
            this.setState({
                loading: false,

            })
            this.props.history.push("/")
        })
        .catch( err => {
            this.setState({
                loading: false,
                
            }) 

    }) 
    
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
        if(this.state.loading) {
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

export default ContactData;