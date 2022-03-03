import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import ProductsList from 'pages/ProductsList'
import AddProduct from 'pages/AddProduct'
import AuthedRoute from './AuthedRoute'
import PublicRoute from './PublicRoute'
import Header from 'containers/Header'

const routes = () => (
  <Router>
    <div>
      <Header />
        <Switch>
          <AuthedRoute exact path='/' component={Dashboard} />
          <PublicRoute path='/login' component={Login} />
          <Route path='/products' component={ProductsList} />
          <Route path='/signup' component={Signup} />
          <Route path='/product/:id' component={AddProduct} />
        </Switch>
    </div>
  </Router>
)


export default (routes)
