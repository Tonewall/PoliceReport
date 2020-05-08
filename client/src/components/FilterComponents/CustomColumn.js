import React, { Component } from "react";
import Select from "react-select";


const customOptions = [
    {value: false, label: 'Default'},
    {value: true, label: 'Custom'},
];
const columns = [
    /*DEFAULT*/
    {value: 'Offense', field:'Offense', label: 'Offense', width: 200},
    {value: 'Location', field:'Location', label: 'Location', width: 250},
    {value: 'Location Landmark', field:'Location Landmark', label: 'Landmark', width: 200},
    {value: 'From', field:'From', label: 'From Date/Time', width: 100},
    {value: 'To', field:'To', label: 'To Date/Time', width: 100},
    {value: 'Average Day', field:'Average Day', label: 'Avg Day', width: 100},
    {value: 'Average Time', field:'Average Time', label: 'Avg Time', width: 100},
    {value: 'Occurred Shift', field:'Occurred Shift', label: 'Occurred Shift', width: 100},
    {value: 'Case Status', field:'Case Status', label: 'Status', width: 50},
    {value: 'Department', field:'Department', label: 'Dept', width: 50},
    /*OPTIONAL*/
    {value: 'Unit', field: 'Unit', label: 'Unit', width: 50},
    {value: 'Offender Name', field: 'Offenders', label: 'Offenders', width: 100},
    {value: 'Victims', field: 'Victim', label: 'Victims', width: 100},
    {value: 'Property', field: 'Property', label: 'Property', width: 200},
    {value: 'Officer Name', field: 'Officer', label: 'Officer', width: 200},
    {value: 'Report Date', field: 'Report Date', label: 'Report Date', width: 200},
    {value: 'ViolationCode', field: 'ViolationCode', label: 'Violation Code', width: 100},
];


class CustomColumn extends Component {
    state = {
        selectedCustom: {value: false, label: 'Default'},
        selectedColumns: [
            {value: 'Offense', field:'Offense', label: 'Offense', width: 200},
            {value: 'Location', field:'Location', label: 'Location', width: 250},
            {value: 'Location Landmark', field:'Location Landmark', label: 'Landmark', width: 200},
            {value: 'From', field:'From', label: 'From Date/Time', width: 100},
            {value: 'To', field:'To', label: 'To Date/Time', width: 100},
            {value: 'Average Day', field:'Average Day', label: 'Avg Day', width: 100},
            {value: 'Average Time', field:'Average Time', label: 'Avg Time', width: 100},
            {value: 'Occurred Shift', field:'Occurred Shift', label: 'Occurred Shift', width: 100},
            {value: 'Case Status', field:'Case Status', label: 'Status', width: 50},
            {value: 'Department', field:'Department', label: 'Dept', width: 50},
        ],
    };

    constructor(props) {
        super(props)
        props.customColumnHandler(this.state)
    }

    setCustom = selectedCustom => {
        this.setState({selectedCustom},
            function() {
                this.props.customColumnHandler(this.state)
            }); 
    }
    setColumns = selectedColumns => {
        this.setState({selectedColumns},
            function() {
                this.props.customColumnHandler(this.state)
            }); 
    }

    changeCustomColumn(selectedCustom) {
        if(selectedCustom.value) {
            return(
                <div>
                    <Select 
                    value={this.state.selectedColumns} 
                    onChange={this.setColumns} 
                    options={columns} 
                    isMulti={true}
                    />
                </div>
            )
        } else {
            return
        }
        
    }
    

    render() {
        const { selectedCustom } = this.state;
        return(
            <div className="main">
                <div className="card filterTypeCards dateCard">
                    <h4 className="card-header">Custom Columns</h4>
                    <div className="card-body">
                        <div className="col-12 dateFilters">
                            <div>
                                <Select 
                                value={selectedCustom} 
                                onChange={this.setCustom} 
                                options={customOptions} 
                                />
                            </div>
                            {this.changeCustomColumn(selectedCustom)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomColumn;