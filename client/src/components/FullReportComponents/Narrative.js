import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

class Narrative extends Component {
    state = {
        incidentNumber: null,
        incident: null,
        supplements: null,
        narrative: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        if(this.state.incidentNumber != null) {
            if(this.state.incidentNumber.length === 9) {
                fetch(server+'/narrative_APD/'+this.state.incidentNumber)
                    .then(results => {
                        results.json().then(data => {
                            if(data) {
                                var narrativeAPD = ''
                                var field = 'Expr'
                                for(var i = 1; i < 25; i++){
                                    var temp = field+i
                                    narrativeAPD += data[temp]
                                }
                                this.setState({narrative: {Narrative: narrativeAPD}})
                            }
                        })
                    })
                    .catch(err => console.error(err))
            } else {
                fetch(server+'/narrative_GTPD/'+this.state.incidentNumber)
                    .then(results => {
                        results.json().then(data => {
                            this.setState({narrative: data})
                        })
                    })
                    .catch(err => console.error(err))
            }
        }
        fetch(server+'/supplements/'+ this.state.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    this.setState({supplements: data})
                })
            })
            .catch(err => console.error(err))
    }

    getNarrative() {
        if(this.state.narrative){
            return (
                <textarea readOnly rows='5' className="form-control" defaultValue={this.state.narrative['Narrative']}></textarea>
            )
        } else {return(<div><textarea readOnly className="form-control" rows="1"></textarea></div>)}
    }
    getSupplements() {
        if(this.state.supplements && this.state.supplements.length > 0){
            var incidentType = this.state.supplements.map((incident, index) =>
            <div key={index}>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label>Seq #: {incident.SequenceNumber}</label>
                    </div>
                    <div className='col-3'>
                        <label>Date: {incident.DateEntered==null?'':incident.DateEntered.substring(0,10)}</label>
                    </div>
                    <div className='col-3'>
                        <label>Officer: {incident.OfficerName}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <textarea readOnly rows='5' className="form-control" defaultValue={incident.Text}/>
                    </div>
                </div>
            </div>
            ) 
            return incidentType
        } else {return(<div><textarea readOnly className="form-control" rows="1"></textarea></div>)}
    }
   

    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-12'>
                        <label style={{fontSize:17, marginLeft:20}}>Narrative</label>
                        {this.getNarrative()}
                    </div>
                </div>
                <hr className="gap"></hr>
                <div className='row'>
                    <div className='col-12'>
                        <label style={{fontSize:17, marginLeft:20}}>Supplements</label>
                        {this.getSupplements()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Narrative;
