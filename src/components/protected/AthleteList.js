import React, {Component} from 'react'

export default class AthleteList extends Component {

    state = {
        showRaces: {}
    }

    render() {
        return (
            <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_striped">
                <thead>
                <tr className="slds-text-title_caps">
                    {this.props.athletes[this.props.athletes.length-1] ? this.props.athletes[this.props.athletes.length-1].map(e=>
                        <th scope="col" key={e}>
                            <div className="slds-truncate" title={e}>{e}</div>
                        </th>)
                        :<th scope="col">
                            <div className="slds-truncate" title='No Race Selected'>No Race Selected</div>
                         </th>}
                </tr>
                </thead>
                <tbody>
                {this.props.athletes.length
                    ?this.props.athletes.map((e,index)=>
                        index !== this.props.athletes.length-1
                            ?<tr key={`${index}-row`}>
                                {Object.keys(e).map(a=>{
                                    return(<td key={`${e}-${a}-cell`}>
                                        <div className="slds-truncate" title={`${e}-${a}-cell`}>{e[a]}</div>
                                    </td>)
                                })}
                            </tr>
                            : null
                    )
                    :null}
                </tbody>
            </table>
        )
    }
}