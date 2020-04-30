import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Location extends Component {
    state = {
        incidentNumber: null,
        incident: null,
        landmark: null,
        zone: null,
        ltype: null,
        lcode: null,
        locationDetails: null,

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
        fetch('/location-data/'+this.state.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    if(data.length){
                        this.setState({landmark: data[0].LocationLandmark,
                            zone: data[0].PatrolZone,
                            address: data[0].LocationStreetNumber + ' ' + data[0].LocationStreet,
                            lcode: data[0].LocationCode,
                            locationDetails: data[0].Location})
                    }
                    
                })
            })
            .catch(err => console.error(err))
        fetch('/location-type/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        if(data.length){
                            this.setState({ltype: data[data.length-1].Location})
                        }
                    })
                })
                .catch(err => console.error(err))
    }

    getLandmark() {
        if(this.state.landmark){
            return(
                <input readOnly value={" "+ this.state.landmark} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getType() {
        if(this.state.ltype){
            return(
                <input readOnly value={" "+ this.state.ltype} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCode() {
        if(this.state.lcode){
            return(
                <input readOnly value={" "+ this.state.lcode} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getZone() {
        if(this.state.zone){
            return(
                <input readOnly value={" "+ this.state.zone} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getStreet() {
        if(this.state.address){
            return(
                <input readOnly value={" "+ this.state.address} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getApt() {
        if(this.state.locationDetails){
            return(
                <input readOnly value={" "+ this.state.locationDetails} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }


    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Landmark</label>
                        {this.getLandmark()}
                    </div>
                    <div className='col-2'>
                        <label>Location Type</label>
                        {this.getType()}
                    </div>
                    <div className='col-2'>
                        <label>Location Code</label>
                        {this.getCode()}
                    </div>
                    <div className='col-1'>
                        <label>Zone</label>
                        {this.getZone()}
                    </div>
                </div>
                <div style={{marginTop:10}}></div>
                <div className='row'>
                    <div className='col-12'>
                        <label>Address</label>
                        {this.getStreet()}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <label>Location Details</label>
                        {this.getApt()}
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Location;
