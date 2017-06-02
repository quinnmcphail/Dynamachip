import React, { Component } from 'react'
import Rebase from 're-base'
import Race from './Race'
import AddRace from './AddRace'
import {firebaseAuth, database} from '../../config/constants'
let base = Rebase.createClass(database)

export default class Dashboard extends Component {
    constructor(){
        super();
        this.addRace = this.addRace.bind(this)
        this.removeRace = this.removeRace.bind(this)
        this.setCurrentRace = this.setCurrentRace.bind(this)
        this.state = {
            races: {},
            currentRace: null,
            loading: true
        }
    }
  componentDidMount(){
      firebaseAuth().onAuthStateChanged((user)=>{
        if (user){
            base.syncState(`users/${user.uid}/races`,{
                context: this,
                state: 'races',
                then: ()=>this.setState({loading:false})
            })
        }
      })
  }
  addRace(race){
      const races = {...this.state.races}
      const timestamp = Date.now()
      races[`race-${timestamp}`] = race
      this.setState({ races })
  }
    removeRace(key){
        const races = {...this.state.races}
        races[key] = null
        this.setState({ races , currentRace: null })
    }
    setCurrentRace(key){
        this.setState({
            currentRace:key
        })
    }
  render () {
      return this.state.loading === true ? <div className="slds-spinner_container">
          <div role="status" className="slds-spinner slds-spinner_medium">
              <span className="slds-assistive-text">Loading</span>
              <div className="slds-spinner__dot-a"></div>
              <div className="slds-spinner__dot-b"></div>
          </div>
      </div> : (
          <div>
            <div className="slds-grid">
              <div className="slds-size--1-of-4 slds-border--right" style={{height:'calc(100vh - 40px)'}}>
                  {Object.keys(this.state.races).map((race)=>{
                    return <Race race={this.state.races[race]} key={race} index={race} removeRace={this.removeRace} setCurrentRace={this.setCurrentRace}/>
                  })}
                  <AddRace addRace={this.addRace}/>
              </div>
              <div className="slds-size--3-of-4 slds-p-around_medium">
                <h1>{this.state.currentRace}</h1>
              </div>
            </div>
          </div>
      )
  }
}