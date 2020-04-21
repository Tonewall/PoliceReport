import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Personnel extends Component {
    state = {
        incidentNumber: null,
        incident: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/incident-number-integrated/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({incident: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getCaseDisposition() {
        if(this.state.incident && this.state.incident['Case Disposition']){
            return(
                <input readOnly value={" "+ this.state.incident['Case Disposition']} style={{ width: "100%" }}/>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }

    }
    getUnit() {
        if(this.state.incident && this.state.incident['Unit']){
            return(
                <input readOnly value={" "+ this.state.incident['Unit']} style={{ width: "100%" }}/>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getOfficer() {
        if(this.state.incident && this.state.incident['Officer Name']){
            return(
                <input readOnly value={" "+ this.state.incident['Officer Name']} style={{ width: "100%" }}/>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }
    }
    getVClear() {
        if(this.state.incident && this.state.incident['VClear'] != null){
            return(
                <input readOnly value={" "+ this.state.incident['VClear']} style={{ width: "100%" }}/>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }
    }
    getVideo() {
        if(this.state.incident && this.state.incident['Video'] != null){
            return(
                <input readOnly value={" "+ this.state.incident['Video']} style={{ width: "100%" }}/>
            )
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }
    }

    

    render() {
        return(
            <div className='row'>
                <div className='col-2'>
                    <label>Case Disposition</label>
                    {this.getCaseDisposition()}
                        
                </div>
                <div className='col-2'>
                    <label>Unit/Team</label>
                    {this.getUnit()}
                </div>
                <div className='col-5'>
                    <label>Officer</label>
                    {this.getOfficer()}
                </div>
                <div className='col-1'>
                    <label>VClear</label>
                    {this.getVClear()}
                </div>
                <div className='col-1'>
                    <label>Video</label>
                    {this.getVideo()}
                </div>
            </div>
            
        )
    }
}

export default Personnel;
