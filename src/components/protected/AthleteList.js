import React, { Component } from 'react'

export default class AthleteList extends Component {
    state = {
        athletes: {}
    }
    componentDidMount(){

    }
    render () {
        return (
            <h1>{this.props.currentRace}</h1>
        )
    }
}