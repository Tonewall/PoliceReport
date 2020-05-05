import React, { Component } from "react";
import './GtpdFilter.css';
import Date from "./FilterComponents/Date"
import Location from "./FilterComponents/Location"
import Crime from "./FilterComponents/Crime"
import Personnel from "./FilterComponents/Personnel"
import Count from "./FilterComponents/Count"
import {Redirect} from 'react-router-dom'
import CustomColumn from "./FilterComponents/CustomColumn"

class gtpdFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirected: false,
            startDate: null,
            endDate: null,
            streetName: null,
            selectedCrimeType: null,
            selectedCrimeCategory: null,
            selectedShift: null,
            occurredShift: null,
            selectedArrest: null,
            selectedOutcome: null,
            officerName: null,
            selectedAPDBuilding: null,
            selectedAPDLocationType: null,
            selectedBuilding: null,
            selectedDepartment: null,
            selectedGTLocationType: null,
            selectedCount: 1000,
            selectedCaseStatus: null,
            fromTime: null,
            toTime: null,
            selectedCustomTime: null,
            dateTimeOption: null,
            typedName: null,
            selectedName: null,
            selectedMental: null,
        };
        this.dateHandler = this.dateHandler.bind(this)
        this.locationHandler = this.locationHandler.bind(this)
        this.crimeHandler = this.crimeHandler.bind(this)
        this.personnelHandler = this.personnelHandler.bind(this)
        this.customColumnHandler = this.customColumnHandler.bind(this)
        this.countHandler = this.countHandler.bind(this)
    }

    dateHandler = (date) => {
        this.setState({
            endDate: date.endDate, 
            startDate: date.startDate,
            fromTime: date.fromTime,
            toTime: date.toTime,
            selectedCustomTime: date.selectedCustomTime,
            dateTimeOption: date.dateTimeOption
        })
    }

    customColumnHandler = (customColumn) => {
        this.setState({
            selectedColumns: customColumn.selectedColumns
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
            selectedCaseStatus: crime.selectedCaseStatus,
            selectedCitation: crime.selectedCitation,
            selectedMental: crime.selectedMental,
        },function(){console.log(this.state)})
    }

    personnelHandler = (personnel) => {
        this.setState({
            officerName: personnel.officerName, 
            selectedShift: personnel.selectedShift, 
            occurredShift: personnel.selectedOccurredShift,
            typedName: personnel.typedName,
            selectedName: personnel.selectedName,
        })
    }
    countHandler = (count) => {
        this.setState({selectedCount: count})
    }

    handleSubmit = () => {
        this.setState({redirected: true})
    }

    render() {
        return(
            <div className="main filterMain">
                {this.state.redirected ? <Redirect to={{pathname: '/Filter-Result', state: this.state}}/> : null}
                <div className="card filterCard">
                    <h2 className="card-header">Filter</h2>
                    <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4 col-6">
                                    <Location locationHandler={this.locationHandler}/>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <Crime crimeHandler={this.crimeHandler}/>
                                    <Personnel personnelHandler={this.personnelHandler}/>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <Date dateHandler={this.dateHandler}/>
                                    <CustomColumn customColumnHandler={this.customColumnHandler}/>
                                    <Count countHandler={this.countHandler}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="searchButton">
                                        <button onClick={this.handleSubmit} className="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default gtpdFilter;