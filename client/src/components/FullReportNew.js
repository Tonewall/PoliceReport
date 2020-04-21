import React, { Component } from "react";
import './FullReport.css';
import Incident from './FullReportComponents/Incident'
import Personnel from './FullReportComponents/Personnel'
import Misc from './FullReportComponents/Misc'
import Time from './FullReportComponents/Time'
// import IncidentLocation from './FullReportComponents/IncidentLocation'
// import IncidentTime from './FullReportComponents/IncidentTime'
// import Complainant from './FullReportComponents/Complainant'
// import Victim from './FullReportComponents/Victim'
// import Offender from './FullReportComponents/Offender'
// import Property from './FullReportComponents/Property'
// import Narrative from './FullReportComponents/Narrative'
// import Supplements from './FullReportComponents/Supplements'

class FullReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permission_check_running: true,
            permission_denied: true,
            report_class: '',
            incidentNumber: null,
        }
    }

    componentDidMount() {
        var {incidentNumber} = this.props.match.params;
        this.setState({incidentNumber},
            this.getCaseNumber())
    }

    getCaseNumber() {
        if(this.state.incidentNumber != null) {
            return (
                <div>
                    <div className="col-12">Case #: {this.state.incidentNumber} </div>
                </div>
            )
        }
    }

    render() {
        const small_gap = <div className="unitGap" style={{marginTop:10}}></div>
        const gap = <div>
                      <div className="unitGap"/>
                      <hr className="gap"/>
                      <div className="unitGap"/>
                    </div>
        return(
            <div className="main mainFullReport">
                <div className="card fullReportCard">
                <h2 className="card-header caseCardHeader">Incident Report</h2>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <b>Agency ID (ORI): GA0601000</b>
                            </div>
                            <div className="col-6">
                                <b>{this.getCaseNumber()}</b>
                            </div>
                        </div>
                        {small_gap}
                        <Incident incidentNumber={this.props.match.params.incidentNumber}/>
                        {small_gap}
                        <Personnel incidentNumber={this.props.match.params.incidentNumber}/>
                        {small_gap}
                        <Misc incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Time incidentNumber={this.props.match.params.incidentNumber}/>
                        {/* {small_gap}
                        <IncidentLocation incidentNumber={this.props.match.params.incidentNumber}/>
                        {small_gap}
                        <IncidentTime incidentNumber={this.props.match.params.incidentNumber}/>
                        {small_gap}
                        <Complainant incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Victim incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Offender incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Property incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Narrative incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Supplements incidentNumber={this.props.match.params.incidentNumber}/> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default FullReport;