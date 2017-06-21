import React, { Component } from 'react'

export default class AddRace extends Component {
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
            alert: false
        })
    }
    handleSubmit= (e) => {
        e.preventDefault()
        if(this.raceName.value === ''){
            this.showAlert()
        }else{
            this.props.addRace({name:this.raceName.value,uploaded:false,loading:false})
            this.raceName.value = ''
            this.raceName.blur()
        }
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
                {this.state.alert ? <div>
                    <section role="alertdialog" tabIndex="-1" aria-labelledby="prompt-heading-id"
                             aria-describedby="prompt-message-wrapper"
                             className="slds-modal slds-fade-in-open slds-modal_prompt">
                        <div className="slds-modal__container">
                            <header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
                                <h2 className="slds-text-heading_medium" id="prompt-heading-id">You cannot have an empty race name!</h2>
                            </header>
                            <footer className="slds-modal__footer slds-theme_default">
                                <button onClick={this.hideAlert} className="slds-button slds-button_neutral">Ok</button>
                            </footer>
                        </div>
                    </section>
                    <div className="slds-backdrop slds-backdrop_open"></div>
                </div> : null}
            </article>
        )
    }
}