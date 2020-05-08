import React, { Component } from "react";
import './FullReport.css';
import Incident from './FullReportComponents/Incident'
import Personnel from './FullReportComponents/Personnel'
import Time from './FullReportComponents/Time'
import Location from './FullReportComponents/Location'
import Offense from './FullReportComponents/Offense'
import Narrative from './FullReportComponents/Narrative'
import Property from './FullReportComponents/Property'
import Offender from './FullReportComponents/Offender'
import Arrest from './FullReportComponents/Arrest'
import MO from './FullReportComponents/MO'
import Victim from './FullReportComponents/Victim'
import Complainant from './FullReportComponents/Complainant'

class FullReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permission_check_running: true,
            permission_denied: true,
            report_class: '',
            incidentNumber: null,
            department: null,
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
                    <div className="card-body" style={{marginLeft:10, marginRight:10}}>
                        <div className="row">
                            <div className="col-6" style={{fontSize:15}}>
                                <b>Agency ID (ORI): GA0601000</b>
                            </div>
                            <div className="col-6" style={{fontSize:15}}>
                                <b>{this.getCaseNumber()}</b>
                            </div>
                        </div>
                        {small_gap}
                        <Incident incidentNumber={this.props.match.params.incidentNumber}/>
                        {small_gap}
                        <Personnel incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Time incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Location incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Offense incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Narrative incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Property incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Offender incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Arrest incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <MO incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Victim incidentNumber={this.props.match.params.incidentNumber}/>
                        {gap}
                        <Complainant incidentNumber={this.props.match.params.incidentNumber}/>
                        </div>
                </div>
            </div>
        )
    }
}
export default FullReport;