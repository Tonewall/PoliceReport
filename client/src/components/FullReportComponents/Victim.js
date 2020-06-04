import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from './config'

class Victim extends Component {
    state = {
        incidentNumber: null,
        victim: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch(server+'/get_victim/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({victim: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getOffender() {
        if(this.state.victim){
            var victims = this.state.victim.map((incident, index) =>
                <div key={index}>
                    <div className='row'>
                        <div className='col-1'>
                            <label>Seq#</label>
                            <input readOnly value={(incident.SequenceNumber === null) ? "" : " "+ incident.SequenceNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-4'>
                            <label>Name</label>
                            <input readOnly value={((incident.FirstName === null) ? "" : " "+ incident.FirstName) + ((incident.LastName === null) ? "" : " "+ incident.LastName)} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Phone #</label>
                            <input readOnly value={(incident.HomePhoneNumber === null) ? "" : " "+ incident.HomePhoneNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Student</label>
                            <input readOnly value={(incident.Student === null) ? "" : " "+ incident.Student} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Employer</label>
                            <input readOnly value={(incident.Employer === null) ? "" : " "+ incident.Employer} style={{ width: "100%" }}/>
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
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
                            <label>Race</label>
                            <input readOnly value={(incident.Race === null) ? "" : " "+ incident.Race} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Driver License #</label>
                            <input readOnly value={(incident.DriverLicenseNumber === null) ? "" : " "+ incident.DriverLicenseNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>State</label>
                            <input readOnly value={(incident.DriverLicenseState === null) ? "" : " "+ incident.DriverLicenseState} style={{ width: "100%" }}/>
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
                        <div className='col-1'>
                            <label>State</label>
                            <input readOnly value={(incident.HomeState === null) ? "" : " "+ incident.HomeState} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Zip Code</label>
                            <input readOnly value={(incident.HomeZipCode === null) ? "" : " "+ incident.HomeZipCode} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 20}}/>
                </div>
                    
            ) 
            return victims
        }
    }

    

    render() {
        return(
            <div>
                <div style={{fontSize:17, marginLeft:20, marginBottom:14}}><b>Victim</b></div>
                {this.getOffender()}
            </div>
            
        )
    }
}

export default Victim;
