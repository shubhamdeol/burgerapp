import React, {Component} from 'react';
import Order from '../../components/order/order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/errorHandler/errorHandler';


class Orders extends Component {
        state = {
            orders: [],
            loading: true,
        }

    componentDidMount() {
        axios.get('/order.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push(
                        {...res.data[key],
                        id: key}
                    );
                }
                this.setState(
                    {
                        loading: false,
                        orders : fetchedOrders,
                    }
                )
            }).catch( err => {
                this.setState({
                    loading: false,
                })
            })
    }
    render() {
        return(
            <div>
            {
                this.state.orders.map( each => {
                    return (
                        <Order 
                        key={each.id}
                        ingredients = {each.ingredients}
                        price= {each.price}
                        />
                    )
                })
            }
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);