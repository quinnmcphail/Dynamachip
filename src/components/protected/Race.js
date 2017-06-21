import React, {Component} from 'react'
import Papa from 'papaparse'

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
            alert: false
        })
    }
    removeRace = () => {
        this.props.removeRace(this.props.index)
    }
    setCurrentRace = (e) => {
        if(e.target.tagName === 'SPAN'){
            this.props.setCurrentRace(this.props.index)
        }else{
            this.props.setCurrentRace(this.props.index, true)
        }
    }
    getAthletesForDownload = () => {
        this.props.getAthletesForDownload(this.props.index)
    }
    getCsvInput = () => {
        document.getElementById(`${this.props.index}-CSV`).click()
    }
    uploadCSV = (e) => {
        if (e.target.files[0]) {
            Papa.parse(e.target.files[0],
                {
                    delimiter: "",	// auto-detect
                    newline: "",	// auto-detect
                    quoteChar: '"',
                    header: false,
                    dynamicTyping: true,
                    preview: 0,
                    encoding: "",
                    worker: false,
                    comments: false,
                    step: undefined,
                    complete: (results,file) =>{
                        if(results.errors.length === 0){
                            this.props.uploadRaceCsv(this.props.index,results.data)
                        }
                    },
                    error: undefined,
                    download: false,
                    skipEmptyLines: false,
                    chunk: undefined,
                    fastMode: undefined,
                    beforeFirstChunk: undefined,
                    withCredentials: undefined
                })
        }
    }

    render() {
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
                        {this.props.race.uploaded
                            ?<button onClick={this.setCurrentRace} className="slds-button slds-button_neutral">{this.props.race.loading ? <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i> : <i className="fa fa-download" aria-hidden="true"></i>}</button>
                            :<button onClick={this.getCsvInput} className="slds-button slds-button_neutral">{this.props.race.loading ? <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i> :<i className="fa fa-upload" aria-hidden="true"></i>}</button>}
                        <button onClick={this.showAlert} className="slds-button slds-button_destructive"><i
                            className="fa fa-trash" aria-hidden="true"></i></button>
                        <input style={{display: "none"}} type="file" accept=".csv" onChange={this.uploadCSV}
                               id={`${this.props.index}-CSV`}/>
                    </div>
                </div>
                {this.state.alert ? <div>
                    <section role="alertdialog" tabIndex="-1" aria-labelledby="prompt-heading-id"
                             aria-describedby="prompt-message-wrapper"
                             className="slds-modal slds-fade-in-open slds-modal_prompt">
                        <div className="slds-modal__container">
                            <header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
                                <h2 className="slds-text-heading_medium" id="prompt-heading-id">Delete Race?</h2>
                            </header>
                            <footer className="slds-modal__footer slds-theme_default">
                                <button onClick={this.removeRace} className="slds-button slds-button_destructive">Yes
                                </button>
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