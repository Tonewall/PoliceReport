import React, { Component } from "react";

class fullReport extends Component {
    constructor(props) {
        try {
            super(props);
            this.state = {
                crimeData: this.props.location.query.crimeData
            }
        }
        catch(e) {
            super(props);
            this.state = {
                crimeData: null
            }
        }
    }
    componentDidMount() {
        console.log(this.state.crimeData);
    }
    render() {
        return(
        <div className="fullReport">
            Full Report
        </div>
        )
    }
}
export default fullReport;