import React, { Component } from 'react'
import '../css/login.css';
import { withRouter } from 'react-router-dom'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialComponenetState;
    }

    get initialComponenetState() {
        return {
            name: '',
            isValid: false,
            inputClass: 'form-control'
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.isValid) {
            this.setState({
                inputClass: 'form-control is-invalid'
            })
        }
        else {
            localStorage.setItem('name', this.state.name);
            this.props.history.push('/');
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
            isValid: (event.target.value !== ""),
            inputClass: (event.target.value !== "") ? 'form-control' : 'form-control is-invalid'
        })
    }


    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit} method="POST" noValidate>
                <h1 className="h3 mb-3 font-weight-normal text-center">Guest Login</h1>
                <input type="text" id="name" name="name" className={this.state.inputClass} placeholder="The name use in the office" required onChange={this.handleInputChange} />
                <div className="invalid-feedback">Please enter your name</div>
                <input className="btn btn-lg btn-primary btn-block mt-3" type="submit" value="Login" />
            </form>
        )
    }
}


export default withRouter(Login);
