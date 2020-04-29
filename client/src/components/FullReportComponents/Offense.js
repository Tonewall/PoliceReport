import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";

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
        fetch('/drug-data/'+this.state.incidentNumber)
                .then(results => {
                    if(results.status !== 400) {
                        results.json().then(data => {
                            this.setState({drug: data[0]})
                        }
                    )
                    }
                })
                .catch(err => console.error(err))
        // fetch('/weapon-data/'+this.state.incidentNumber)
        //         .then(results => {
        //             if(results.status !== 400) {
        //                 results.json().then(data => {
        //                     this.setState({weapon: data[0]})
        //                 }
        //             )
        //             }
        //         })
        //         .catch(err => console.error(err))
        fetch('/premise-data/'+this.state.incidentNumber)
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
    // getWeapons() {
    //     if(this.state.weapon){
    //         return(
    //             <input readOnly value={" "+ this.state.weapon['Weapon']} style={{ width: "100%" }}/>
    //         )
    //     } else {return(<div><input readOnly value={""} style={{ width: "100%" }}/></div>)}
    // }
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
                    <div className='col-1'>
                        <label>Weapon</label>
                        {/* {this.getWeapons()} */}
                    </div>
                    <div className='col-1'>
                        <label>#Premises</label>
                        {this.getPrem()}
                    </div>

                </div>
            </div>
            
            
        )
    }
}

export default Location;
