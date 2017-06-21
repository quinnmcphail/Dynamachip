import React, {Component} from 'react'
import Rebase from 're-base'
import * as moment from 'moment';
import Race from './Race'
import AddRace from './AddRace'
import AthleteList from './AthleteList'
import Papa from 'papaparse'
import {firebaseAuth, database} from '../../config/constants'
let base = Rebase.createClass(database)

export default class Dashboard extends Component {
    constructor() {
        super();
        this.addRace = this.addRace.bind(this)
        this.removeRace = this.removeRace.bind(this)
        this.setCurrentRace = this.setCurrentRace.bind(this)
        this.uploadRaceCsv = this.uploadRaceCsv.bind(this)
        this.state = {
            races: {},
            currentRace: null,
            loading: true,
            user: null,
            athletes: {},
            athleteBind: null,
        }
    }

    componentDidMount() {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user})
                base.syncState(`users/${user.uid}/races`, {
                    context: this,
                    state: 'races',
                    then: () => this.setState({loading: false})
                })
            } else {
                this.setState({user: null})
            }
        })
    }

    addRace(race) {
        const races = {...this.state.races}
        const timestamp = Date.now()
        races[`race-${timestamp}`] = race
        this.setState({races})
    }

    removeRace(key) {
        const races = {...this.state.races}
        races[key] = null
        this.setState({races, currentRace: null})
        this.getAthletes(null)
    }

    setCurrentRace(key, download) {
        this.setState({
            currentRace: key
        })
        this.getAthletes(key, download)
    }

    getAthletes(key, download) {
        if (key === null) {
            if (this.state.athleteBind !== null) {
                base.removeBinding(this.state.athleteBind)
            }
            this.setState({athletes: {}})
        } else {
            let binding = base.bindToState(`users/${this.state.user.uid}/athletes/${key}`, {
                context: this,
                state: 'athletes',
                asArray: true,
                then: () => {
                    download ? this.downloadAthletes() : null
                }
            })
            this.setState({athleteBind: binding})
        }
    }

    downloadAthletes() {
        var encodedUri = encodeURI(`data:text/csv;charset=utf-8,${Papa.unparse(this.state.athletes, {header: true})}`)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `${this.state.currentRace}-Dynamachip-${moment().format()}`)
        document.body.appendChild(link)
        link.click()
    }

    uploadRaceCsv(key, csv) {
        const preRaces = {...this.state.races}
        preRaces[key].loading = true
        this.setState({races: preRaces})
        let tempAthletes = {}
        let index = 0
        let now = moment().format('MMMM Do YYYY, h:mm:ss a')
        csv.map((athlete,i) => {
            let tempAthlete = athlete
            if(i === 0){
                tempAthletes[`fields`] = tempAthlete
            }else {
                tempAthlete['lastUpdate'] = now
                tempAthlete['updates'] = [`${now}: Added to DB.`]
                tempAthletes[`athlete-${index}`] = tempAthlete
                index++
            }
            return 0
        })
        base.post(`users/${this.state.user.uid}/athletes/${key}`, {data: tempAthletes}).then(e => {
            const races = {...this.state.races}
            races[key].uploaded = true
            races[key].loading = false
            this.setState({races})
            console.log(e)
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        return this.state.loading === true ? <div className="slds-spinner_container">
            <div role="status" className="slds-spinner slds-spinner_medium">
                <span className="slds-assistive-text">Loading</span>
                <div className="slds-spinner__dot-a"></div>
                <div className="slds-spinner__dot-b"></div>
            </div>
        </div> : (
            <div>
                <div className="slds-grid">
                    <div className="slds-size--1-of-4 slds-border--right" style={{height: 'calc(100vh - 40px)'}}>
                        {Object.keys(this.state.races).map((race) => {
                            return <Race race={this.state.races[race]} key={race} index={race}
                                         removeRace={this.removeRace} setCurrentRace={this.setCurrentRace}
                                         uploadRaceCsv={this.uploadRaceCsv}/>
                        })}
                        <AddRace addRace={this.addRace}/>
                    </div>
                    <div className="slds-size--3-of-4 slds-p-around_medium">
                        <AthleteList athletes={this.state.athletes}/>
                    </div>
                </div>
            </div>
        )
    }
}