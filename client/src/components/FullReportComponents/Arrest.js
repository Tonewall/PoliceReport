import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

class Arrest extends Component {
    state = {
        incidentNumber: null,
        arrest: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch(server+'/arrest-info/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({arrest: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getArrest() {
        if(this.state.arrest){
            var arrests = this.state.arrest.map((incident, index) =>
                <div key={index}>
                    <div className='row'>
                        <div className='col-1'>
                            <label>Seq#</label>
                            <input readOnly value={(incident.SequenceNumber === null) ? "" : " "+ incident.SequenceNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Arrest Officer</label>
                            <input readOnly value={(incident.ArrestOfficer === null) ? "" : " "+ incident.ArrestOfficer} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Arrest Date</label>
                            <input readOnly value={(incident.ArrestDate === null) ? "" : " "+ incident.ArrestDate.substring(0,10)} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Arrest Time</label>
                            <input readOnly value={(incident.ArrestTime === null) ? "" : " "+ (new Date(incident.ArrestTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-7'>
                            <label>Arrest Address</label>
                            <input readOnly value={(incident.ArrestAddress === null) ? "" : " "+ incident.ArrestAddress} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-2'>
                            <label>Offense Date</label>
                            <input readOnly value={(incident.OffenseDate === null) ? "" : " "+ incident.OffenseDate.substring(0,10)} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Drug Use</label>
                            <input readOnly value={(incident.DrugUse === null) ? "" : " "+ incident.DrugUse} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-3'>
                            <label>Offender Name</label>
                            <input readOnly value={(incident.OffenderName === null) ? "" : " "+ incident.OffenderName.substring(0,10)} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Age</label>
                            <input readOnly value={(incident.Age === null) ? "" : " "+ incident.Age} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>DOB</label>
                            <input readOnly value={(incident.DateOfBirth === null) ? "" : " "+ incident.DateOfBirth.substring(0,10)} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Sex</label>
                            <input readOnly value={(incident.Sex === null) ? "" : " "+ incident.Sex} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label style={{width:'120%'}}>Hair Color</label>
                            <input readOnly value={(incident.HairColor === null) ? "" : " "+ incident.HairColor} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Height</label>
                            <input readOnly value={(incident.Height === null) ? "" : " "+ incident.Height} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Weight</label>
                            <input readOnly value={(incident.Weight === null) ? "" : " "+ incident.Weight} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Race</label>
                            <input readOnly value={(incident.Race === null) ? "" : " "+ incident.Race} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-6'>
                            <label>Home Address</label>
                            <input readOnly value={(incident.HomeAddress === null) ? "" : " "+ incident.HomeAddress} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Home City</label>
                            <input readOnly value={(incident.HomeCity === null) ? "" : " "+ incident.HomeCity} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>SSN</label>
                            <input readOnly value={(incident.SSN === null) ? "" : " "+ incident.SSN} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-3'>
                            <label>Occupation</label>
                            <input readOnly value={(incident.Occupation === null) ? "" : " "+ incident.Occupation} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Employer</label>
                            <input readOnly value={(incident.Employer === null) ? "" : " "+ incident.Employer} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Juvenile</label>
                            <input className="row" style={{margin:'auto'}} type="checkbox"checked={incident.Juvenile} disabled/>
                        </div>
                        <div className='col-2'>
                            <label>Driver License#</label>
                            <input readOnly value={(incident.DriverLicenseNumber === null) ? "" : " "+ incident.DriverLicenseNumber} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 20}}/>
                </div>
                    
            ) 
            return arrests
        }
    }

    

    render() {
        return(
            <div>
                <div style={{fontSize:17, marginLeft:20, marginBottom:14}}><b>Arrest Info</b></div>
                {this.getArrest()}
            </div>
            
        )
    }
}

export default Arrest;
