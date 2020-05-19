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
        fetch('/get-time/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({incident: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getFrom() {
        if(this.state.incident){
            var date = this.state.incident['IncidentDate']?this.state.incident['IncidentDate'].substring(0,10):''
            var time = ''
            if(this.state.incident['IncidentTime']) {
                time = new Date(this.state.incident['IncidentTime'])
                time.setHours(time.getHours()+5); 
                time = (time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }

            return(
                <input readOnly value={" "+ date + ' ' + time} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getTo() {
        if(this.state.incident){
            var date = this.state.incident['DateIncidentEnded']?this.state.incident['DateIncidentEnded'].substring(0,10):''
            var time = ''
            if(this.state.incident['TimeIncidentEnded']) {
                time = new Date(this.state.incident['TimeIncidentEnded'])
                time.setHours(time.getHours()+5); 
                time = (time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }

            return(
                <input readOnly value={" "+ date + ' ' + time} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getReport() {
        if(this.state.incident){
            var date = this.state.incident['ReportDate']?this.state.incident['ReportDate'].substring(0,10):''
            var time = ''
            if(this.state.incident['ReportTime']) {
                time = new Date(this.state.incident['ReportTime'])
                time.setHours(time.getHours()+5); 
                time = (time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
            return(
                <input readOnly value={" "+ date+' '+time} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    

    

    render() {
        return(
            <div className='row'>
                <div className='col-2'>
                    <label>Report Date/Time</label>
                    {this.getReport()}
                </div>
                <div className='col-2'>
                    <label>From Date/Time</label>
                    {this.getFrom()}
                </div>
                <div className='col-2'>
                    <label>To Date/Time</label>
                    {this.getTo()}
                </div>
            </div>
            
        )
    }
}

export default Time;
