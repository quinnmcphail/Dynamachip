import React, { Component } from 'react'

export default class Race extends Component {
    state = {
        alert: false
    }
    showAlert = () => {
        this.setState({
            alert: true
        })
    }
    hideAlert = () => {
        this.setState({
            alert:false
        })
    }
    removeRace = () => {
        this.props.removeRace(this.props.index)
    }
    setCurrentRace = () => {
        this.props.setCurrentRace(this.props.index)
    }
    render () {
        return (
            <article className="slds-card slds-m-around_medium">
                <div className="slds-card__header slds-grid">
                    <header className="slds-media slds-media_center slds-has-flexi-truncate">
                        <div className="slds-media__body">
                            <h2>
                                <a onClick={this.setCurrentRace} className="slds-card__header-link slds-truncate">
                                    <span className="slds-text-heading_small">{this.props.race.name}</span>
                                </a>
                            </h2>
                        </div>
                    </header>
                    <div className="slds-no-flex">
                        <button className="slds-button slds-button_neutral"><i className="fa fa-upload" aria-hidden="true"></i></button>
                        <button onClick={this.showAlert} className="slds-button slds-button_destructive"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                </div>
                {this.state.alert ? <div>
                    <section role="alertdialog" tabIndex="-1" aria-labelledby="prompt-heading-id" aria-describedby="prompt-message-wrapper" className="slds-modal slds-fade-in-open slds-modal_prompt">
                        <div className="slds-modal__container">
                            <header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
                                <h2 className="slds-text-heading_medium" id="prompt-heading-id">Delete Race?</h2>
                            </header>
                            <footer className="slds-modal__footer slds-theme_default">
                                <button onClick={this.removeRace} className="slds-button slds-button_destructive">Yes</button>
                                <button onClick={this.hideAlert} className="slds-button slds-button_neutral">No</button>
                            </footer>
                        </div>
                    </section>
                    <div className="slds-backdrop slds-backdrop_open"></div>
                </div> : null}
            </article>
        )
    }
}