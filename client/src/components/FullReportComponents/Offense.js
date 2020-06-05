import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {server} from '../../config'

class Location extends Component {
    state = {
        incidentNumber: null,
        drug: null,
        weapon: null,
        premises: null,
    };

    componentDidMount(){
        this.setState({incidentNumber: this.props.incidentNumber},
            function() {
                this.getIncidentData();
            })
        
    }

    getIncidentData() {
        fetch(server+'/drug-data/'+this.state.incidentNumber,
        {
            credentials: 'include'
        })
                .then(results => {
                    if(results.status !== 400) {
                        results.json().then(data => {
                            this.setState({drug: data[0]})
                        }
                    )
                    }
                })
                .catch(err => console.error(err))
        fetch(server+'/weapon-data/'+this.state.incidentNumber,
        {
            credentials: 'include'
        })
                .then(results => {
                    if(results.status !== 400) {
                        results.json().then(data => {
                            var weapons = ''
                            for(var i = 0; i < data.length; i++) {
                                var code = (data[i]['Weapon']===null)?'':data[i]['Weapon']+' - '
                                var desc = (data[i]['Description']===null)?'':data[i]['Description']
                                weapons += (code + desc + ', ')
                            }
                            this.setState({weapon: weapons})
                        }
                    )
                    }
                })
                .catch(err => console.error(err))
        fetch(server+'/premise-data/'+this.state.incidentNumber,
        {
            credentials: 'include'
        })
                .then(results => {
                    if(results.status !== 400) {
                        results.json().then(data => {
                            
                            this.setState({premise: data})
                        }
                    )
                    }
                })
                .catch(err => console.error(err))
    }
    getDrugs() {
        if(this.state.drug && this.state.drug.DrugRelated){
            return(
                <input readOnly value={" "+ this.state.drug.DrugRelated} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }
    getWeapons() {
        if(this.state.weapon){
            return(
                <textarea readOnly rows='1' className="form-control" defaultValue={this.state.weapon}/>
            )
        } else {return(<div><textarea readOnly className="form-control" rows="1"></textarea></div>)}
    }
    getPrem() {
        if(this.state.premise){
            return(
                <input readOnly value={" "+ this.state.premise.length} style={{ width: "100%" }}/>
            )
        } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    }



    

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-1'>
                        <label>Drug</label>
                        {this.getDrugs()}
                    </div>
                    <div className='col-2'>
                        <label>#Premises</label>
                        {this.getPrem()}
                    </div>
                    <div className='col-9'>
                        <label>Weapon</label>
                        {this.getWeapons()}
                    </div>

                </div>
            </div>
            
            
        )
    }
}

export default Location;
