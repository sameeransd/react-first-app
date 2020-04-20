import React, { Component } from 'react'
import Items from '../data/Snacks.js'
import OrderModal from './OrderModal';

export default class BakeryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: Items,
            selectedItem: {},
            showModal: false
        };
    }

    order(item, e) {
        this.setState({
            selectedItem: item,
            showModal: true
        });
    }

    dataList() {
        return this.state.items.map(item => {
            return (
                <div key={item.id} className="col-md-4 mb-3">
                    <div className="card">
                        <img className="card-img-top" src={item.image} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Rs {item.price}</p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => this.order(item, e)}
                                variant="primary"
                            >
                                Order Now
                    </button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="row">{this.dataList()}</div>
                <OrderModal show={this.state.showModal} item={this.state.selectedItem} />
            </div>
        );
    }
}

