import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Property extends Component {
    state = {
        incidentNumber: null,
        property: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/property-data/'+this.state.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    this.setState({property: data})
                })
            })
            .catch(err => console.error(err))
    }

    getProperty() {
        if(this.state.property){
            var properties = this.state.property.map((incident, index) =>
                <div key={index}>
                    <div className='row'>
                        <div className='col-1'>
                            <label>Seq#</label>
                            <input readOnly value={(incident.SequenceNumber === null) ? "" : " "+ incident.SequenceNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Property</label>
                            <input readOnly value={(incident.Description === null) ? "" : " "+ incident.Description} style={{ width: "100%" }}/>
                        </div>  
                        <div className='col-2'>
                            <label>Make</label>
                            <input readOnly value={(incident.Make === null) ? "" : " "+ incident.Make} style={{ width: "100%" }}/>
                        </div> 
                        <div className='col-2'>
                            <label>Model</label>
                            <input readOnly value={(incident.Model === null) ? "" : " "+ incident.Model} style={{ width: "100%" }}/>
                        </div> 
                        <div className='col-1'>
                            <label>Year</label>
                            <input readOnly value={(incident.VehicleYear === null) ? "" : " "+ incident.VehicleYear} style={{ width: "100%" }}/>
                        </div> 
                        <div className='col-1'>
                            <label>Value</label>
                            <input readOnly value={(incident.ItemValue === null) ? "" : " $"+ incident.ItemValue} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label>Recovered</label>
                            <input readOnly value={(incident.Recovered === null) ? "" : " "+ incident.Recovered} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-2'>
                            <label>Vehicle Type</label>
                            <input readOnly value={(incident.VehicleType === null) ? "" : " "+ incident.VehicleType} style={{ width: "100%" }}/>
                        </div> 
                        <div className='col-2'>
                            <label>Vehicle Style</label>
                            <input readOnly value={(incident.VehicleStyle === null) ? "" : " "+ incident.VehicleStyle} style={{ width: "100%" }}/>
                        </div> 
                        <div className='col-2'>
                            <label>License Plate #</label>
                            <input readOnly value={(incident.LicensePlateNumber === null) ? "" : " "+ incident.LicensePlateNumber} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>License Plate State</label>
                            <input readOnly value={(incident.LicensePlateState === null) ? "" : " "+ incident.LicensePlateState} style={{ width: "100%" }}/>
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-3'>
                            <label>Obtained Date/Time</label>
                            <input readOnly value={((incident.DateObtained === null) ? "" : " "+ incident.DateObtained.substring(0,10)) + ((incident.TimeObtained === null) ? "" : ' ' + new Date(incident.TimeObtained).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-3'>
                            <label>Obtained Officer</label>
                            <input readOnly value={(incident.ObtainedOfficerName === null) ? "" : " "+ incident.ObtainedOfficerName} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-7'>
                            <label>Obtained Address</label>
                            <input readOnly value={(incident.ObtainedAddress === null) ? "" : " "+ incident.ObtainedAddress} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-2'>
                            <label>Obtained City</label>
                            <input readOnly value={(incident.ObtainedCity === null) ? "" : " "+ incident.ObtainedCity} style={{ width: "100%" }}/>
                        </div>
                        <div className='col-1'>
                            <label style={{width:'150%'}}>Zip Code</label>
                            <input readOnly value={(incident.ObtainedZipCode === null) ? "" : " "+ incident.ObtainedZipCode} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-11'>
                            <label>Item Description</label>
                            <input readOnly value={(incident.ItemDescription === null) ? "" : " "+ incident.ItemDescription} style={{ width: "100%" }}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 20}}/>
                </div>
                    
            ) 
            return properties
        }
    }

    

    render() {
        return(
            <div>
                <div style={{fontSize:17, marginLeft:20, marginBottom:14}}><b>Property</b></div>
                {this.getProperty()}
            </div>
            
        )
    }
}

export default Property;
