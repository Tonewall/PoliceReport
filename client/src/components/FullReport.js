import React, { Component } from "react";
import './FullReport.css';

class fullReport extends Component {

    state = {
        case: null,
    }

    componentDidMount() {
        var {incidentNumber} = this.props.match.params;
        this.populateReport(incidentNumber);
    }

    populateReport(incidentNumber) {
        fetch('/incident-number/'+incidentNumber)
            .then(results => {
                results.json().then(data=> {
                    this.setState({case: data})
                })
            })
            .catch(err => console.error(err))
    }

    getReport() {
        console.log(this.state.case);

        if(this.state.case != null) {
            //getting Time
            var fromTime = new Date(this.state.case['From Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            var toTime = new Date(this.state.case['To Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            var avgTime = new Date(this.state.case['Avg Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return (
                <div className="full_report_main">
                    <div className="row topReport">
                        <div className="col-1"></div>
                        <div className="topFullReport col-2"><b>Case Disposition:</b> {this.state.case['Case Disposition']}</div>
                        <div className="topFullReport col-2"><b>Team/Unit: </b> {this.state.case['Unit']}</div>
                        <div className="topFullReport col-2"><b>Officer: </b> {this.state.case['Officer Name']}</div>
                        <div className="topFullReport col-2"><b>VClear: </b> {this.state.case['VClear'].toString()}</div>
                        <div className="topFullReport col-2"><b>Video: </b> {this.state.case['Video'].toString()}</div>
                    </div>
                    <div className="row whenRow">
                        <div className="whenCard card col-10">
                            <div className="whenTitle">When</div>
                            <hr></hr>
                            <div className="row">
                                <div className="when col-6"><b>Occurred Shift: </b>{this.state.case['Shift']}</div>
                            </div>
                            <div className="row">
                                <div className="when col-3"><b>Report Date: </b>{(this.state.case['Report Date']).substring(0,10)}</div>
                                <div className="when col-3"><b>From Date: </b>{this.state.case['From Date'].substring(0,10)}</div>
                                <div className="when col-3"><b>To Date: </b>{this.state.case['To Date'].substring(0,10)}</div>
                                <div className="when col-3"><b>Avg Date: </b>{this.state.case['Avg Date'].substring(0,10)}</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><b>Date Edit: </b>{this.state.case['DTEdit'].toString()}</div>
                                <div className="when col-3"><b>From Time: </b>{fromTime}</div>
                                <div className="when col-3"><b>To Time: </b>{toTime}</div>
                                <div className="when col-3"><b>Avg Time: </b>{avgTime}</div>
                            </div>
                            
                        </div>
                        
                        
                    </div>
                    <div className="row when">
                            <div className="whereCard card col-10"></div>
                        </div>
                </div>
            )
        }
         
    };

    getTitle() {
        if(this.state.case != null) {
            return (
                <div>
                    <div className="col-12">Case #: {this.state.case['OCA Number']} </div>                
                </div>
            )
        }
        
    }

    render() {
        return(
        <div className="main">
            <div className="card fullReportCard">
            <h2 className="card-header caseCardHeader">{this.getTitle()}</h2>
                <div className="card-body">
                    <div className="fullReportInfo">
                        {this.getReport()}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default fullReport;