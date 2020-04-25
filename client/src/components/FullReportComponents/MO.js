import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

class MO extends Component {
    state = {
        incidentNumber: null,
        MO: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch('/MO/'+ this.state.incidentNumber)
            .then(results => {
                results.json().then(data => {
                    this.setState({MO: data})
                })
            })
            .catch(err => console.error(err))
    }
    getMO() {
        console.log(this.state.MO)
        if(this.state.MO && this.state.MO.length > 0){
            var MO = this.state.MO.map((incident, index) =>
            <div key={index}>
                <div className='row'>
                    <div className='col-1'>
                        <label>Seq #: {incident.SequenceNumber}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <textarea readOnly rows='1' className="form-control" defaultValue={incident.MO}/>
                    </div>
                </div>
            </div>
            ) 
            return MO
        } else {return(<div><textarea readOnly className="form-control" rows="1"></textarea></div>)}
    }
   

    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-12'>
                        <label style={{fontSize:17, marginLeft:20}}>MO</label>
                        {this.getMO()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MO;
