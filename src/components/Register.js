import React, { Component } from 'react'
import { auth } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value, this.admin.checked)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div>
      <h1 className="slds-text-heading_large slds-m-around_medium slds-container_small">Register</h1>
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
            <div className="slds-form-element">
              <label className="slds-checkbox_toggle">
                <span className="slds-form-element__label">Admin Permission</span>
                <input type="checkbox" name="checkbox" aria-describedby="toggle-desc" ref={(admin) => this.admin = admin}/>
      <span id="toggle-desc" className="slds-checkbox_faux_container" aria-live="assertive">
        <span className="slds-checkbox_faux"></span>
        <span className="slds-checkbox_on">Yes</span>
        <span className="slds-checkbox_off">No</span>
      </span>
              </label>
            </div>
      <hr/>
      {
          this.state.registerError &&
    <div className="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error slds-m-bottom_x-large" role="alert">
      <span className="slds-assistive-text">error</span>
      <h2>Error: {this.state.registerError}</h2>
    </div>
  }
    <button type="submit" className="slds-button slds-button_neutral">Register</button>
    </form>
    </div>
    )
  }
}
