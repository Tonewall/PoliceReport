import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Incident extends Component {
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

        fetch('/get-offense/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        console.log(data)
                        this.setState({incident: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getIncidentType() {
        if(this.state.incident){
            var incidentType = this.state.incident.map((incident, index) =>
                <input readOnly key={index} value={(incident.OffenseDescription === null) ? "" : " "+ incident.OffenseDescription} style={{ width: "100%" }}/>            ) 
            return incidentType
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }

    }
    getIncidentCount() {
        if(this.state.incident){
            var incidentCounts = this.state.incident.map((incident, index) =>
                <input readOnly key={index} value={(incident.Counts === null) ? "" : " "+ incident.Counts} style={{ width: "100%" }}/>
            ) 
            return incidentCounts
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        } 
    }
    getIncidentCode() {
        if(this.state.incident){
            var incidentCodes = this.state.incident.map((incident, index) =>
                    <input readOnly key={index} value={(incident.OffenseCode === null) ? "" : " "+ incident.OffenseCode} style={{ width: "100%" }}/>            ) 
            return incidentCodes
        } else {
            return(
                <div>
                    <input readOnly value={""} style={{ width: "100%" }}/>
                </div>
            )
        }
    }
    getStatute() {
        if(this.state.incident){
            var statutes = this.state.incident.map((incident, index) =>
                <input readOnly key={index} value={(incident.Statute === null) ? "" : " "+ incident.Statute} style={{ width: "100%" }}/>            ) 
            return statutes
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
                <div className='col-7'>
                    <label>Offense</label>
                    {this.getIncidentType()}
                        
                </div>
                <div className='col-1'>
                    <label>Count</label>
                    {this.getIncidentCount()}
                </div>
                <div className='col-1'>
                    <label style={{width:'200%'}}>Offense Code</label>
                    {this.getIncidentCode()}
                </div>
                <div className='col-3'>
                    <label>Statute</label>
                    {this.getStatute()}
                </div>
            </div>
            
        )
    }
}

export default Incident;
