import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from './config'

class Personnel extends Component {
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
        fetch(server+'/incident-number-integrated/'+this.state.incidentNumber)
                .then(results => {
                    results.json().then(data => {
                        this.setState({incident: data})
                    })
                })
                .catch(err => console.error(err))
    }

    getGTType() {
        if(this.state.incident && this.state.incident['GTtype']){
            return(
                <input readOnly value={" "+ this.state.incident['GTtype']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getGTStatus() {
        if(this.state.incident && this.state.incident['GTstatus']){
            return(
                <input readOnly value={" "+ this.state.incident['GTstatus']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getEMS() {
        if(this.state.incident && this.state.incident['EMS']){
            return(
                <input readOnly value={" "+ this.state.incident['EMS']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getSuicide() {
        if(this.state.incident && this.state.incident['Suicide']){
            return(
                <input readOnly value={" "+ this.state.incident['Suicide']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getInjured() {
        if(this.state.incident && this.state.incident['Injured']){
            return(
                <input readOnly value={" "+ this.state.incident['Injured']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    get1013() {
        if(this.state.incident && this.state.incident['1013']){
            return(
                <input readOnly value={" "+ this.state.incident['1013']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getClery() {
        if(this.state.incident && this.state.incident['Clery']){
            return(
                <input readOnly value={" "+ this.state.incident['Clery']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCleryOther() {
        if(this.state.incident && this.state.incident['Clery+']){
            return(
                <input readOnly value={" "+ this.state.incident['Clery+']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCSArr() {
        if(this.state.incident && this.state.incident['CSArr']){
            return(
                <input readOnly value={" "+ this.state.incident['CSArr']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCSRef() {
        if(this.state.incident && this.state.incident['CSRef']){
            return(
                <input readOnly value={" "+ this.state.incident['CSRef']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    get8399() {
        if(this.state.incident && this.state.incident['8399']){
            return(
                <input readOnly value={" "+ this.state.incident['8399']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getCSDVS() {
        if(this.state.incident && this.state.incident['CSDVS']){
            return(
                <input readOnly value={" "+ this.state.incident['CSDVS']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getRepeat() {
        if(this.state.incident && this.state.incident['RO']){
            return(
                <input readOnly value={" "+ this.state.incident['RO']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    

    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-2'>
                        <label>GT Type</label>
                        {this.getGTType()}
                    </div>
                    <div className='col-2'>
                        <label>GT Status</label>
                        {this.getGTStatus()}
                    </div>
                    <div className='col-2'>
                        <label>Repeat Offender</label>
                        {this.getRepeat()}
                    </div>
                    <div className='col-1'>
                        <label>EMS</label>
                        {this.getEMS()}
                    </div>
                    <div className='col-1'>
                        <label>Suicide</label>
                        {this.getSuicide()}
                    </div>
                    <div className='col-1'>
                        <label>Injured</label>
                        {this.getInjured()}
                    </div>
                    <div className='col-1'>
                        <label>1013</label>
                        {this.get1013()}
                    </div>
                    <div className='col-1'>
                        <label>8399</label>
                        {this.get8399()}
                    </div>
                </div>
                <div style={{marginTop:10}}></div>
                <div className='row'>
                    <div className='col-6'></div>
                    <div className='col-1'>
                        <label>Clery</label>
                        {this.getClery()}
                    </div>
                    <div className='col-1'>
                        <label>Clery+</label>
                        {this.getCleryOther()}
                    </div>
                    <div className='col-1'>
                        <label>CSArr</label>
                        {this.getCSArr()}
                    </div>
                    <div className='col-1'>
                        <label>CSRef</label>
                        {this.getCSRef()}
                    </div>
                    <div className='col-1'>
                        <label>CSDVS</label>
                        {this.getCSDVS()}
                    </div>

                </div>
            </div>
            
            
        )
    }
}

export default Personnel;
