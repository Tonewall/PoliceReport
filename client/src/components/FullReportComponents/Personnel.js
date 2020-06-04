import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from './config'

class Personnel extends Component {
    state = {
        incidentNumber: null,
        officer: null,
        caseStatus: null,
        unit: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getPersonnel();
            })
        
    }


    getPersonnel() {
        fetch(server+'/personnel-data/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        if(data.length > 0){
                            this.setState({officer: data[0].ReportingOfficerName, 
                                caseStatus: data[0].CaseStatus,
                                unit: data[0].OtherZone})
                        }
                        
                    })
                })
                .catch(err => console.error(err))
    }


    getCaseStatus() {
        if(this.state.caseStatus){
            return(
                <input readOnly value={" "+ this.state.caseStatus} style={{ width: "100%" }}/>
            )
        } else {return(<div> <input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getUnit() {
        if(this.state.unit){
            return(
                <input readOnly value={" "+ this.state.unit} style={{ width: "100%" }}/>
            )
        } else {return(<div> <input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    
    getOfficer() {
        if(this.state.officer){
            return(
                <input readOnly value={" "+ this.state.officer} style={{ width: "100%" }}/>
            )
        } else {return(<div> <input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }

    

    render() {
        return(
            <div className='row'>
                <div className='col-2'>
                    <label>Case Status</label>
                    {this.getCaseStatus()}
                        
                </div>
                <div className='col-2'>
                    <label>Unit/Team</label>
                    {this.getUnit()}
                </div>
                <div className='col-5'>
                    <label>Officer</label>
                    {this.getOfficer()}
                </div>
            </div>
            
        )
    }
}

export default Personnel;
