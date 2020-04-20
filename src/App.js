import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import BakeryItems from './components/BakeryItems';
import Login from './components/Login'
import MyOrders from './components/MyOrders';
import TodayOperations from './components/TodayOperations';



export default class App extends Component {
  render() {

    const routing = (
      <Router>
        <Navigation />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <BakeryItems />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/myorders">
              <MyOrders />
            </Route>
            <Route path="/orders">
              <TodayOperations/>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );

    return (
      <div>{routing}</div>
    );
  }
}