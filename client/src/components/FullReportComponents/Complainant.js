import React, { Component } from "react";
import {server} from './config'

class Complainant extends Component {
    state = {
        incidentNumber: null,
        complainant: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch(server+'/get_complainant/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({complainant: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getOffender() {
        if(this.state.complainant){
            var complainants = this.state.complainant.map((incident, index) =>
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
                    </div>
                    <div className='row'>
                        <div className='col-1'/>
                        <div className='col-6'>
                            <label>Address</label>
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
            return complainants
        }
    }

    

    render() {
        return(
            <div>
                <div style={{fontSize:17, marginLeft:20, marginBottom:14}}><b>Complainant/Witness</b></div>
                {this.getOffender()}
            </div>
            
        )
    }
}

export default Complainant;
