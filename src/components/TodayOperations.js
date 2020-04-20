import React, { Component } from 'react'

export default class TodayOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: JSON.parse(localStorage.getItem("allOrders"))
        }
    }

    getOrders() {
        if(this.state.allOrders && this.state.allOrders.length>0){
            return this.state.allOrders.map((item, index) => {
                const { name, order } = item;
                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{order.item.name}</td>
                        <td>{order.qty}</td>
                        <td>{order.price}</td>
                    </tr>
                );
            });
        }
        else{
            return <tr><td colSpan="4">There are no orders yet.</td></tr>
        }
    }

    render() {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Person</th>
                        <th>Order Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getOrders()}
                </tbody>
            </table>
        );
    }
}
