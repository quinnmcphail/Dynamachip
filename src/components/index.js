import React, { Component } from 'react'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'
import '../index.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
      user: null
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
            user: user,
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
            user: {email:'No User Logged In'}
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div className="slds-grid slds-grid--vertical">
          <div className="slds-container_fluid">
            <div className="slds-context-bar">
              <div className="slds-context-bar__primary slds-context-bar__item_divider-right">
                <div className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
                  <span className="slds-context-bar__label-action slds-context-bar__app-name">
                    <Link to="/" className="slds-truncate slds-text-link_reset" title="App Name">Dynamachip</Link>
                  </span>
                </div>
              </div>
              <nav className="slds-context-bar__secondary">
                <ul className="slds-grid">
                  <li className="slds-context-bar__item">
                    <Link to="/dashboard" className="slds-context-bar__label-action" title="Dashboard">
                      <span className="slds-truncate" title="Dashboard">Dashboard</span>
                    </Link>
                  </li>
                    {this.state.authed
                        ? <div style={{display: 'inherit'}}>
                          <li className="slds-context-bar__item" onClick={()=>logout()}>
                            <div className="slds-context-bar__label-action" title="Logout">
                              <span className="slds-truncate" title="Logout">Logout</span>
                            </div>
                          </li>
                          <li className="currentUserNavBar">
                            <span className="slds-context-bar__label-action" title="User">
                            <span className="slds-truncate" title="User">User: {this.state.user.email}</span>
                            </span>
                          </li>
                        </div>
                        : <div style={{display: 'inherit'}}>
                          <li className="slds-context-bar__item">
                            <Link to="/login" className="slds-context-bar__label-action" title="Login">
                              <span className="slds-truncate" title="Login">Login</span>
                            </Link>
                          </li>
                          <li className="slds-context-bar__item">
                            <Link to="/register" className="slds-context-bar__label-action" title="Register">
                              <span className="slds-truncate" title="Register">Register</span>
                            </Link>
                          </li>
                        </div>
                    }
                </ul>
              </nav>
            </div>
          </div>
          <div className="slds-container_fluid">
            <Switch>
              <Route path='/' exact component={Home} />
              <PublicRoute authed={this.state.authed} path='/login' component={Login} />
              <PublicRoute authed={this.state.authed} path='/register' component={Register} />
              <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
