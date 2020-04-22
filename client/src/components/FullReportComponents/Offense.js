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

    getOld() {
        if(this.state.incident && this.state.incident['Offense']){
            return(
                <input readOnly value={" "+ this.state.incident['Offense']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getNib() {
        if(this.state.incident && this.state.incident['NIBRSOffense']){
            return(
                <input readOnly value={" "+ this.state.incident['NIBRSOffense']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getAlc() {
        if(this.state.incident && this.state.incident['Alcohol']!=null){
            return(
                <input readOnly value={" "+ this.state.incident['Alcohol']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getDrugs() {
        if(this.state.incident && this.state.incident['Drug']!=null){
            return(
                <input readOnly value={" "+ this.state.incident['Drug']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getWeapons() {
        if(this.state.incident && this.state.incident['Weapon']!=null){
            return(
                <input readOnly value={" "+ this.state.incident['Weapon']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getPrem() {
        if(this.state.incident && this.state.incident['Premises']){
            return(
                <input readOnly value={" "+ this.state.incident['Premises']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getFrom() {
        if(this.state.incident && this.state.incident['Offn From']){
            return(
                <input readOnly value={" "+ this.state.incident['Offn From']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getUCR() {
        if(this.state.incident && this.state.incident['UCR Changed']){
            var date = this.state.incident['UCR Changed']?this.state.incident['UCR Changed'].substring(0,10):''

            return(
                <input readOnly value={" "+ date} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getProp() {
        if(this.state.incident && this.state.incident['PType']){
            return(
                <input readOnly value={" "+ this.state.incident['PType']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getUC() {
        if(this.state.incident && this.state.incident['UCInc+']){
            return(
                <input readOnly value={" "+ this.state.incident['UCInc+']} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }



    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-1'>
                        <label>Alcohol</label>
                        {this.getAlc()}
                    </div>
                    <div className='col-1'>
                        <label>Drug</label>
                        {this.getDrugs()}
                    </div>
                    <div className='col-1'>
                        <label>Weapon</label>
                        {this.getWeapons()}
                    </div>
                    <div className='col-2'>
                        <label>Old Offense</label>
                        {this.getOld()}
                    </div>
                    <div className='col-2'>
                        <label>NIBRS Offense</label>
                        {this.getNib()}
                    </div>
                    <div className='col-1'>
                        <label>#Premises</label>
                        {this.getPrem()}
                    </div>
                    <div className='col-2'>
                        <label>Offense From</label>
                        {this.getFrom()}
                    </div>
                    <div className='col-2'>
                        <label>Prop. Type</label>
                        {this.getProp()}
                    </div>

                </div>
                <div style={{marginTop:10}}></div>
                <div className='row'>
                    
                    <div className='col-2'>
                        <label>UCR Changed</label>
                        {this.getUCR()}
                    </div>
                    
                    <div className='col-1'>
                        <label>UCInc+</label>
                        {this.getUC()}
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Location;
