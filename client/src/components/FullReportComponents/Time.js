import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class Time extends Component {
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

    getFrom() {
        if(this.state.incident){
            var date = this.state.incident['From Date']?this.state.incident['From Date'].substring(0,10):''
            var time = ''
            if(this.state.incident['From Time']) {
                time = new Date(this.state.incident['From Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }

            return(
                <input readOnly value={" "+ date + ' ' + time} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getTo() {
        if(this.state.incident){
            var date = this.state.incident['To Date']?this.state.incident['To Date'].substring(0,10):''
            var time = ''
            if(this.state.incident['To Time']) {
                time = new Date(this.state.incident['To Time']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }

            return(
                <input readOnly value={" "+ date + ' ' + time} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getReport() {
        if(this.state.incident){
            var date = this.state.incident['Report Date']?this.state.incident['Report Date'].substring(0,10):''

            return(
                <input readOnly value={" "+ date} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    

    

    render() {
        return(
            <div className='row'>
                <div className='col-2'>
                    <label>Report Date</label>
                    {this.getReport()}
                </div>
                <div className='col-2'>
                    <label>From Date</label>
                    {this.getFrom()}
                </div>
                <div className='col-2'>
                    <label>To Date</label>
                    {this.getTo()}
                </div>
            </div>
            
        )
    }
}

export default Time;
