import React, { Component } from "react";
import '../GtpdFilter.css';
import Year from "../FilterComponents/Year"
import Crime from "../FilterComponents/Crime"
import Location from "../FilterComponents/Location"
import Personnel from "../FilterComponents/Personnel"
import Select from "react-select";
import {Redirect} from 'react-router-dom'

const typeOptions = [
    {value: "Date", label: "Date"},
    {value: "Time", label: "Time"},
    {value: "Location", label: "Location"},
    {value: "Shift", label: "Shift"}
]
class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirected: false,
            selectedYear: null,
            streetName: null,
            selectedCrimeType: null,
            selectedCrimeCategory: null,
            selectedShift: null,
            selectedArrest: null,
            selectedOutcome: null,
            officerID: null,
            selectedType: {value: "Date", label: "Date"},
            selectedAPDBuilding: null,
            selectedAPDLocationType: null,
            selectedBuilding: null,
            selectedDepartment: null,
            selectedGTLocationType: null,
        };
        this.yearHandler = this.yearHandler.bind(this)
        this.locationHandler = this.locationHandler.bind(this)
        this.crimeHandler = this.crimeHandler.bind(this)
        this.personnelHandler = this.personnelHandler.bind(this)
    }

    setType = selectedType => { 
        this.setState({selectedType})
    };

    yearHandler = (year) => {
        this.setState({
            selectedYear: year
        })
    }

    locationHandler = (location) => {
        this.setState({
            selectedAPDBuilding: location.selectedAPDBuilding, 
            selectedAPDLocationType: location.selectedAPDLocationType, 
            selectedBuilding: location.selectedBuilding, 
            selectedDepartment: location.selectedDepartment, 
            selectedGTLocationType: location.selectedGTLocationType, 
            streetName: location.streetName, 
        })
    }

    crimeHandler = (crime) => {
        this.setState({
            selectedCrimeType: crime.selectedCrimeType, 
            selectedCrimeCategory: crime.selectedCrimeCategory, 
            selectedArrest: crime.selectedArrest, 
            selectedOutcome: crime.selectedOutcome, 
        })
    }

    personnelHandler = (personnel) => {
        this.setState({
            officerID: personnel.officerID, 
            selectedShift: personnel.selectedShift, 
        })
    }

    handleSubmit = () => {
        console.log(this.state)
        this.setState({redirected: true})
    }

    render() {
        const { selectedType } = this.state;
        return(
            <div className="main filterMain">
                {this.state.redirected ? <Redirect to={{pathname: '/Statistics', state: this.state}}/> : null}
                <div className="card filterCard">
                    <h2 className="card-header">Date/Time Statistics Filter</h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-4 col-6">
                                    <Location locationHandler={this.locationHandler}/>                                
                                </div>
                                <div className="col-lg-4 col-6">
                                    <Crime crimeHandler={this.crimeHandler}/>
                                    <Personnel personnelHandler={this.personnelHandler}/>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <Year yearHandler={this.yearHandler}/>
                                    <div className="card filterTypeCards dateCard">
                                        <h4 className="card-header">Type of Statistics</h4>
                                        <div className="card-body">
                                            <div className="col-12 dateFilters">
                                                <label className="col-12 col-form-label">
                                                    Type
                                                </label>
                                                <div>
                                                    <Select 
                                                    value={selectedType} 
                                                    onChange={this.setType} 
                                                    options={typeOptions} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="searchButton">
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default gtpdFilter;