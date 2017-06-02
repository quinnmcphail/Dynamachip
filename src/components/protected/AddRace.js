import React, { Component } from 'react'

export default class AddRace extends Component {
    handleSubmit= (e) => {
        e.preventDefault()
        this.props.addRace({name:this.raceName.value})
        this.raceName.value = ''
        this.raceName.blur()
    }
    render () {
        return (
            <article className="slds-card slds-m-around_medium">
                <div className="slds-card__header slds-grid">
                    <header className="slds-media slds-media_center slds-has-flexi-truncate">
                        <div className="slds-media__body">
                            <h2>
                                <a className="slds-card__header-link slds-truncate slds-text-link_reset">
                                    <form onSubmit={this.handleSubmit} className="slds-form slds-form_stacked">
                                        <div className="slds-form-element slds-m-right--small">
                                            <div className="slds-form-element__control">
                                                <input type="text" id="input-unique-id" className="slds-input" placeholder="Race Name" ref={(raceName) => this.raceName = raceName}/>
                                            </div>
                                        </div>
                                    </form>
                                </a>
                            </h2>
                        </div>
                    </header>
                    <div className="slds-no-flex">
                        <button onClick={this.handleSubmit} className="slds-button slds-button_brand"><i className="fa fa-plus" aria-hidden="true"></i></button>
                    </div>
                </div>
            </article>
        )
    }
}