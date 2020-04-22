import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Location extends Component {
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

    getLandmark() {
        if(this.state.incident && this.state.incident['Location Landmark']){
            return(
                <input readOnly value={" "+ this.state.incident['Location Landmark']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getType() {
        if(this.state.incident && this.state.incident['LType']){
            return(
                <input readOnly value={" "+ this.state.incident['LType']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCode() {
        if(this.state.incident && this.state.incident['Location Code']){
            return(
                <input readOnly value={" "+ this.state.incident['Location Code']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getZone() {
        if(this.state.incident && this.state.incident['Patrol Zone']){
            return(
                <input readOnly value={" "+ this.state.incident['Patrol Zone']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getStreet() {
        if(this.state.incident && this.state.incident['Address']){
            return(
                <input readOnly value={" "+ this.state.incident['Address']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getApt() {
        if(this.state.incident && this.state.incident['Apt-Rm-Ste']){
            return(
                <input readOnly value={" "+ this.state.incident['Apt-Rm-Ste']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }

    getIntersection() {
        if(this.state.incident && this.state.incident['Intersection']){
            return(
                <input readOnly value={" "+ this.state.incident['Intersection']} style={{ width: "100%" }}/>
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
                    <div className='col-6'>
                        <label>Address</label>
                        {this.getStreet()}
                    </div>
                    <div className='col-1'>
                        <label>Apt</label>
                        {this.getApt()}
                    </div>
                    <div className='col-4'>
                        <label>Intersection</label>
                        {this.getIntersection()}
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Location;
