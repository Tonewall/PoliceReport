import React, { Component } from "react";
import Select from "react-select";


const customOptions = [
    {value: false, label: 'Default'},
    {value: true, label: 'Custom'},
];
const columns = [
    /*DEFAULT*/
    {value: 'Offense', label: 'Offense'},
    {value: 'Location', label: 'Location'},
    {value: 'Landmark', label: 'Landmark'},
    {value: 'Department', label: 'Department'},
    {value: 'Date/Time', label: 'Date/Time'},
    {value: 'Average Date/Time', label: 'Average Date/Time'},
    {value: 'Occurred Shift', label: 'Occurred Shift'},
    {value: 'Case Status', label: 'Case Status'},
    /*OPTIONAL*/
    {value: 'Unit', label: 'Unit'},
    {value: 'Offenders', label: 'Offenders'},
    {value: 'Victims', label: 'Victims'},
    {value: 'Property', label: 'Property'},
    {value: 'Officer', label: 'Officer'},
];


class CustomColumn extends Component {
    state = {
        selectedCustom: {value: false, label: 'Default'},
        selectedColumns: [
            {value: 'Offense', label: 'Offense'},
            {value: 'Location', label: 'Location'},
            {value: 'Landmark', label: 'Landmark'},
            {value: 'Department', label: 'Department'},
            {value: 'Date/Time', label: 'Date/Time'},
            {value: 'Average Date/Time', label: 'Average Date/Time'},
            {value: 'Occurred Shift', label: 'Occurred Shift'},
            {value: 'Case Status', label: 'Case Status'},
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