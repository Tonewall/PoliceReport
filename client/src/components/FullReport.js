import React, { Component } from "react";
import './FullReport.css';

class fullReport extends Component {


    componentDidMount() {
        var {incidentNumber} = this.props.match.params;
        this.populateReport(incidentNumber);
    }

    populateReport(incidentNumber) {
        fetch('/incident-number/'+incidentNumber)
            .then(results => {
                results.json().then(data=> {
                    console.log(data)
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return(
        <div className="main">
            <div className="card fullReportCard">
            <h2 className="card-header">Full Report</h2>
                <div className="card-body">
                    <div className="fullReportInfo">
                        test report
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default fullReport;