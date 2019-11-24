import React, { Component } from "react";
import './FullReport.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class fullReport extends Component {

    state = {
        case: null,
        offenseDescription: null,
    }
    

    componentDidMount() {
        var {incidentNumber} = this.props.match.params;
        this.populateReport(incidentNumber);
    }

    populateReport(incidentNumber) {
        fetch('/incident-number-basic/'+incidentNumber)
            .then(results => {
                results.json().then(data=> {
                    this.setState({case: data})
                })
            })
            .catch(err => console.error(err))
        // fetch('/offense-description/'+incidentNumber)
        //     .then(results => {
        //         results.json().then(data=> {
        //             console.log(data)
        //             this.setState({offenseDescription: data})
        //         })
        //     })
        //     .catch(err => console.error(err))
        fetch('/narratives/'+incidentNumber)
            .then(results => {
                results.json().then(data => {
                    console.log(data)
                })
            })
            .catch(err => console.error(err))
        fetch('/offender-info/'+incidentNumber)
            .then(results => {
                results.json().then(data => {
                    console.log(data)
                })
            })
            .catch(err => console.error(err))
        fetch('/arrest-info/'+incidentNumber)
            .then(results => {
                results.json().then(data => {
                    console.log(data)
                })
            })
            .catch(err => console.error(err))
        fetch('/property-info/'+incidentNumber)
            .then(results => {
                results.json().then(data => {
                    console.log(data)
                })
            })
            .catch(err => console.error(err))
    }

    getReport() {
        
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
                        <div className="topFullReport col-2"><b>VClear: </b> {this.state.case['VClear'] != null && this.state.case['VClear'].toString()}</div>
                        <div className="topFullReport col-2"><b>Video: </b> {this.state.case['Video'] != null && this.state.case['Video'].toString()}</div>
                    </div>
                    <div className="row whenRow">
                        <div className="whenCard card col-10">
                            <div className="row">
                                <div className="whenTitle col-2">When</div>
                                <div className="when col-10"><b>Occurred Shift: </b>{this.state.case['Shift']}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="when col-3"><b>Report Date: </b>{ this.state.case['Report Date'] && this.state.case['Report Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>From Date: </b>{ this.state.case['From Date'] && this.state.case['From Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>To Date: </b>{ this.state.case['To Date'] && this.state.case['To Date'].substring(0,10) }</div>
                                <div className="when col-3"><b>Avg Date: </b>{ this.state.case['Avg Date'] && this.state.case['Avg Date'].substring(0,10) }</div>
                            </div>
                            <div className="row">
                                <div className="col-3"><b>Date Edit: </b>{ this.state.case['DTEdit'] && this.state.case['DTEdit'].toString() }</div>
                                <div className="when col-3"><b>From Time: </b>{fromTime}</div>
                                <div className="when col-3"><b>To Time: </b>{toTime}</div>
                                <div className="when col-3"><b>Avg Time: </b>{avgTime}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row whereRow">
                        <div className="whereCard card col-10">
                            <div className="row">
                                <div className="whereTitle col-2">Where</div>
                                <div className="where col-10"><b>Landmark: </b>{(this.state.case['Location Landmark'])}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="where col-4"><b>Location Type: </b>{this.state.case['LType']}</div>
                                <div className="where col-4"><b>Location Code: </b>{this.state.case['Location Code']}</div>
                                <div className="where col-4"><b>Zone: </b>{this.state.case['Patrol Zone']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Street: </b>{this.state.case['Address']}</div>
                                <div className="where col-4"><b>Apt-Rm-Suite: </b>{this.state.case['Apt-Rm-Ste']}</div>
                                <div className="where col-4"><b>Intersection: </b>{(this.state.case['Intersection'])}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offenseCard card col-10">
                            <div className="row">
                                <div className="whatTitle col-3">What (Offense)</div>
                                <div className="col-3"><b>Alcohol: </b>{this.state.case['Video'] != null && this.state.case['Alcohol'].toString()}</div>
                                <div className="col-3"><b>Drug: </b>{this.state.case['VClear'] != null && this.state.case['Drug'].toString()}</div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="where col-4"><b>Old Offense: </b>{this.state.case['Offense']}</div>
                                <div className="where col-4"><b>NIBRS Offense: </b>{this.state.case['NIBRSOffense']}</div>
                                <div className="where col-4"><b># Premises: </b>{this.state.case['Premises']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Offense From: </b>{this.state.case['Offn From']}</div>
                                <div className="where col-4"><b>UCR Changed: </b>{this.state.case['UCR Changed']}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Prop. Type: </b>{this.state.case['PType']}</div>
                                <div className="where col-4"><b>Weapon: </b>{this.state.case['Weapon']}</div>
                                <div className="where col-4"><b>UCInc+: </b>{this.state.case['UCInc+']}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offenseCard card col-10">
                            <h2 className="card-header">Offense Description</h2>
                                {this.getOffenseDescription()}
                        </div>
                        
                    </div>
                </div>
            )
        } else {
            return(
                <div className="loading">
                    Report Loading...
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

    getOffenseDescription() {
        var bgColors = { "Gray": "#dddddd" };
        var result = [];
        for(var i = 0; i < 2; i++) {
            result.push(
                <div className="offenseDescriptionElement">
                    <div className="card offenseDescriptionElementCard"style={{backgroundColor:bgColors.Gray}}>
                        <div classname="card-body" >
                            <div className="row">
                                <div className="where col-4"><b>OCA #: </b>{}</div>
                                <div className="where col-4"><b>Seq #: </b>{i+1}</div>
                                <div className="where col-4"><b>Offense Code: </b>{}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Attempt Complete: </b>{}</div>
                                <div className="where col-4"><b>Counts: </b>{}</div>
                            </div>
                            <div className="row">
                                <div className="where col-12"><b>Offense Description: </b>{}</div>
                            </div>
                            <div className="row">
                                <div className="where col-4"><b>Statute: </b>{}</div>
                                <div className="where col-4"><b>Misdemeanor - Felony: </b>{}</div>
                            </div>
                        </div>
                    </div>
                    <img alt=""></img>
                </div>
            );
        }
        return (
            <Carousel
            showThumbs={false}
            showIndicators={false}>
                {result}
            </Carousel>
        )
        
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