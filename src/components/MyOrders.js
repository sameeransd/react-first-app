import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myOrders: JSON.parse(localStorage.getItem("myOrders"))
        }
    }

    getOrderItems(order) {
        if(this.state.myOrders && this.state.myOrders.length>0){
            return  this.state.myOrders.map((order,index) => {
                const { qty, price, item} = order;
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                            <img src={item.image} className="img-fluid" style={{ width: 150 }} alt="" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{qty}</td>
                        <td>{price}</td>
                    </tr>
                );
            });
        }
        else {
            return <tr><td colSpan="6">No items in the cart!</td></tr>
        }
    }

    confirmOrder = () => {
        let name = localStorage.getItem("name");
        //const orders = {...this.state.myOrders};
        let orderList =  this.state.myOrders.map((order) => {
            return { 
                name: name,
                order: {...order}
            }
        });
        let allOrders = localStorage.getItem("allOrders");
        let finalOrderList = [];
        if (allOrders) {
            finalOrderList = [...JSON.parse(localStorage.getItem("allOrders")), ...orderList]
        }
        else {
            finalOrderList = [...orderList]
        }
        localStorage.removeItem("myOrders");
        localStorage.setItem("allOrders", JSON.stringify(finalOrderList));
        this.setState({
            myOrders:[]
        })
    }

    clearCart = () => {
        localStorage.removeItem("myOrders");
        this.setState({
            myOrders:[]
        })
    }
    
    continueOrdering = () => {
        this.props.history.push('/');
    }
    
    

    getConfirmButtons(){
        if(this.state.myOrders && this.state.myOrders.length>0){
            return (
            <div style={{float:"right"}}>
                <button className="btn btn-primary" onClick={this.confirmOrder}>Confirm Order</button> 
                <button style={{marginLeft:"5px"}} className="btn btn-danger" onClick={this.clearCart}>Clear Cart</button> 
            </div>);
        }
        else {
           return <button style={{float:"right"}} className="btn btn-primary" onClick={this.continueOrdering}>Continue Ordering</button>
        }
    }

    render() {
        return (
            <div className="container">
                <h3 className="m-5">My Cart</h3>
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Preview</th>
                                <th>Bakery Item</th>
                                <th>Item Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.getOrderItems()}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    {this.getConfirmButtons()}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(MyOrders);