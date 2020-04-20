import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../css/style.css';

class Navigation extends Component {

    loginButton = () => {
        let name = localStorage.getItem('name');
        if (!name) {
            return <Link to="/login" className="btn btn-outline-primary"> Guest Login </Link>
        }
        else {
            return <button className="btn btn-outline-primary" onClick={this.logOut}> Logged as {name}, Logout? </button>
        }
    }

    logOut = () => {
        localStorage.removeItem('name');
        this.props.history.push('/login');
    }



    render() {
        return (
            <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center border-bottom  box-shadow px-md-4 mb-3 p-3">
                <h5 className="my-0 mr-md-auto font-weight-normal">
                    <Link to="/">Allion Chuun Paan</Link>
                </h5>
                <nav className="my-2 my-md-0 mr-md-3">   
                    {localStorage.getItem("name") ? (<Link className="p-2" to="/myorders">My Orders</Link>) : (<span></span>)}
                    <Link to="/orders"  className="p-2">Today Orders</Link>
                    {this.loginButton()}
                </nav>
            </div>
        )
    }
}

export default withRouter(Navigation);