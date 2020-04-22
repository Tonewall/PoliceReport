import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class OffenseDesc extends Component {
    state = {
        incidentNumber: null,
        offenseDescription: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/offense-description/'+this.state.incidentNumber)
        .then(results => {
            results.json().then(data=> {
                this.setState({offenseDescription: data})
            })
        })
        .catch(err => console.error(err))
    }

    getOffense() {
        if(this.state.offenseDescription){
            var offenseDescription = this.state.offenseDescription.map((incident, index) =>
                <div className='row' key={index}>
                    <div className='col-1'>
                        <label>Seq#</label>
                        <input readOnly value={(incident.SequenceNumber === null) ? "" : " "+ incident.SequenceNumber} style={{ width: "100%" }}/>
                    </div>
                    <div className='col-1'>
                        <label>Counts</label>
                        <input readOnly value={(incident.Counts === null) ? "" : " "+ incident.Counts} style={{ width: "100%" }}/>
                    </div>  
                    <div className='col-1'>
                        <label>Code</label>
                        <input readOnly value={(incident.OffenseCode === null) ? "" : " "+ incident.OffenseCode} style={{ width: "100%" }}/>
                    </div> 
                    <div className='col-1'>
                        <label>Complete</label>
                        <input readOnly value={(incident.AttemptComplete === null) ? "" : " "+ incident.AttemptComplete} style={{ width: "100%" }}/>
                    </div> 
                    <div className='col-5'>
                        <label>Offense Description</label>
                        <input readOnly value={(incident.OffenseDescription === null) ? "" : " "+ incident.OffenseDescription} style={{ width: "100%" }}/>
                    </div> 
                    <div className='col-2'>
                        <label>Statute</label>
                        <input readOnly value={(incident.Statute === null) ? "" : " "+ incident.Statute} style={{ width: "100%" }}/>
                    </div> 
                    <div className='col-1'>
                        <label>Type</label>
                        <input readOnly value={(incident.OffenseType === null) ? "" : " "+ incident.OffenseType} style={{ width: "100%" }}/>
                    </div> 
                </div>
            ) 
            return offenseDescription
        }
    }
    

    render() {
        return(
            <div>
                {this.getOffense()}
            </div>
            
        )
    }
}

export default OffenseDesc;
