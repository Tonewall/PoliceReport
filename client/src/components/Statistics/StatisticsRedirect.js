import React, { Component } from "react";
import DateStatistics from './Date-Statistics'
import TimeStatistics from './Time-Statistics'

export default class StatisticsRedirect extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data:null,
    }
    
  }
  componentDidMount() {
      this.setState({data: this.props.location.state})
  }

  render () {
    var statComponent = null
    if (this.state.data === null) {
        statComponent = null
    } else if (this.state.data.selectedType.value === "Date") {
        statComponent = <DateStatistics data={this.state.data}/>
    } else if (this.state.data.selectedType.value === "Time") {
        statComponent = <TimeStatistics data={this.state.data}/>
    }
    return (
      <div className='main'>
          <div className='menu'>
              {statComponent}
              Test
          </div>
      </div>
    )
  }
}