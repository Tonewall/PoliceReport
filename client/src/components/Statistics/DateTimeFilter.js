import React, { Component } from "react";
import '../GtpdFilter.css';
import Year from "../FilterComponents/Year"
import Crime from "../FilterComponents/Crime"
import Location from "../FilterComponents/Location"
import Personnel from "../FilterComponents/Personnel"

class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedYear: null,
            streetName: null,
            selectedCrimeType: null,
            selectedCrimeCategory: null,
            selectedShift: null,
            selectedArrest: null,
            selectedOutcome: null,
            officerID: null,
        };
        this.yearHandler = this.yearHandler.bind(this)
        this.locationHandler = this.locationHandler.bind(this)
        this.crimeHandler = this.crimeHandler.bind(this)
        this.personnelHandler = this.personnelHandler.bind(this)
    }

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
    }

    render() {
        return(
        <div className="main filterMain">
            <div className="card filterCard">
                <h2 className="card-header">Stats Filter</h2>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-4 col-6">
                                <Location locationHandler={this.locationHandler}/>                                
                            </div>
                            <div className="col-lg-4 col-6">
                                <Crime crimeHandler={this.crimeHandler}/>
                            </div>
                            <div className="col-lg-4 col-6">
                                <Year yearHandler={this.yearHandler}/>
                                <Personnel personnelHandler={this.personnelHandler}/>
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