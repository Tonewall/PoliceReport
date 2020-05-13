import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Offender extends Component {
    state = {
        incidentNumber: null,
        offender: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/get_offender/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({offender: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getOffender() {
        if(this.state.offender){
            var offenders = this.state.offender.map((incident, index) =>
                <div key={index}>
                    <div className='row'>
                        <div className='col-1'>
                            <label>Seq#</label>
                            <input readOnly value={(incident.SequenceNumber === null) ? "" : " "+ incident.SequenceNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Name</label>
                            <input readOnly value={((incident.FirstName === null) ? "" : " "+ incident.FirstName) + ((incident.LastName === null) ? "" : " "+ incident.LastName)} style={{ width: "100%" }}/>
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
                            <label>Race</label>
                            <input readOnly value={(incident.Race === null) ? "" : " "+ incident.Race} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Arrest</label>
                            <input className="row" style={{margin:'auto'}} type="checkbox"checked={incident.Arrest} disabled/>
                        </div>
                        <div className='col-1'>
                            <label>Warrant</label>
                            <input className="row" style={{margin:'auto'}} type="checkbox"checked={incident.Warrant} disabled/>
                        </div>
                        <div className='col-1'>
                            <label>Wanted</label>
                            <input className="row" style={{margin:'auto'}} type="checkbox"checked={incident.Wanted} disabled/>                        
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-1'>
                            <label>Height</label>
                            <input readOnly value={(incident.Height === null) ? "" : " "+ incident.Height} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Weight</label>
                            <input readOnly value={(incident.Weight === null) ? "" : " "+ incident.Weight} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label style={{width:'120%'}}>Hair Color</label>
                            <input readOnly value={(incident.HairColor === null) ? "" : " "+ incident.HairColor} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Race</label>
                            <input readOnly value={(incident.Race === null) ? "" : " "+ incident.Race} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>SSN</label>
                            <input readOnly value={(incident.SSN === null) ? "" : " "+ incident.SSN} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Driver License #</label>
                            <input readOnly value={(incident.DriverLicenseNumber === null) ? "" : " "+ incident.DriverLicenseNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Driver License State</label>
                            <input readOnly value={(incident.DriverLicenseState === null) ? "" : " "+ incident.DriverLicenseState} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-6'>
                            <label>Home Address</label>
                            <input readOnly value={(incident.HomeAddress === null) ? "" : " "+ incident.HomeAddress} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Home City</label>
                            <input readOnly value={(incident.HomeCity === null) ? "" : " "+ incident.HomeCity} style={{ width: "100%" }}/>
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
                    </div>

                    <div style={{marginBottom: 20}}/>
                </div>
                    
            ) 
            return offenders
        }
    }

    

    render() {
        return(
            <div>
                <div style={{fontSize:17, marginLeft:20, marginBottom:14}}><b>Offender</b></div>
                {this.getOffender()}
            </div>
            
        )
    }
}

export default Offender;
