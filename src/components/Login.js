import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = (e) => {
    e.preventDefault()
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div>
        <h1 className="slds-text-heading_large slds-m-around_medium slds-container_small">Login</h1>
        <form onSubmit={this.handleSubmit} className="slds-form slds-form_stacked slds-box slds-m-around_medium slds-container_small">
          <div className="slds-form-element">
            <label className="slds-form-element__label">Email</label>
            <div className="slds-form-element__control">
              <input type="email" className="slds-input" placeholder="Email" ref={(email) => this.email = email}/>
            </div>
          </div>
          <div className="slds-form-element">
            <label className="slds-form-element__label">Password</label>
            <div className="slds-form-element__control">
              <input type="password" className="slds-input" placeholder="Password" ref={(pw) => this.pw = pw}/>
            </div>
          </div>
          <hr/>
            {
                this.state.loginMessage &&
                <div className="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error slds-m-bottom_x-large" role="alert">
                  <span className="slds-assistive-text">error</span>
                  <h2>Error: {this.state.loginMessage} <a href="/" onClick={this.resetPassword}>Forgot Password?</a></h2>
                </div>
            }
          <button type="submit" className="slds-button slds-button_neutral">Login</button>
        </form>
      </div>
    )
  }
}
