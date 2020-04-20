import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";

export default class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            modalShow: false,
            myOrders: [],
            qty: 0,
            formErrors: {
                qty: "Qty should more than zero"
            },
            qtyValid: false,
            formSubmitted: false,
            orderPrice: 0,
            inputClass: 'form-control'
        };
    }

    handleClose = () => {
        this.setState({
            modalShow: false
        });
    };

    order = () => {
        // Check validity and push oder to the local storage
        if (this.state.qtyValid) {
            let newOrder = {
                qty: this.state.qty,
                item: this.props.item,
                date: new Date(),
                price: this.state.orderPrice,
                uid: Math.floor(Math.random() * 100)
            }
            this.state.myOrders.push(newOrder);
            localStorage.setItem("myOrders", JSON.stringify(this.state.myOrders));
            this.setState({
                modalShow: false
            })
        }
        else{
            this.setState({
                inputClass: 'form-control is-invalid'
            })
        }
    };

    handleQtyChanges = (event) => {
        event.preventDefault();
        if(parseInt(event.target.value)>0){
            let oprce = this.props.item.price * event.target.value;
            this.setState({
                qty: event.target.value,
                orderPrice: oprce,
                qtyValid: true
            });
        }
        else {
            this.setState({
                orderPrice: 0,
                qtyValid: false
            })
        }
        
    };


    componentWillReceiveProps(nextProps) {
        this.setState(this.initialState);
        this.setState({
            modalShow: nextProps.show,
        });
        let myOrders = localStorage.getItem("myOrders");
        if (myOrders) {
          this.setState({
            myOrders: JSON.parse(localStorage.getItem("myOrders")),
          });
        }
    }

    orderPrice = () => {
        if (this.state.orderPrice > 0) {
            return (
                <div className="col-sm-5">
                    <small>
                        <b>Order price - Rs {this.state.orderPrice}</b>
                    </small>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.item.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <label htmlFor="qty" className="col-sm-2 col-form-label">
                                Qty
                  </label>
                            <div className="col-sm-5">
                                <input
                                    type="number"
                                    required
                                    onChange={this.handleQtyChanges}
                                    className={this.state.inputClass}
                                    id="qty"
                                    name="qty"
                                    placeholder="Qty"
                                />
                                <div className="invalid-feedback">
                                    {this.state.formErrors.qty}
                                </div>
                            </div>
                            {this.orderPrice()}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No, Thanks
                </Button>
                        <Button variant="primary" onClick={this.order}>
                            Order
                </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
