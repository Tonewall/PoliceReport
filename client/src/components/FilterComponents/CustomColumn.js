import React, { Component } from "react";
import Select from "react-select";


const customOptions = [
    {value: false, label: 'Default'},
    {value: true, label: 'Custom'},
];
const columns = [
    {value: 'Description', label: 'Crime Type'},
    {value: 'Clearing Officer Name', label: 'Clearing Officer Name'},
    {value: 'Clearing Officer ID', label: 'Clearing Officer ID'},
    {value: 'Department', label: 'Department'},
    {value: 'GTID', label: 'GTID'},
    {value: 'Location Code', label: 'Location Code'},
    {value: 'Location Name', label: 'Location Landmark'},
    {value: 'Offender Name', label: 'Offender Name'},
    {value: 'Officer Name', label: 'Officer Name'},
    {value: 'Officer Id', label: 'Officer ID'},
    {value: 'Patrol Zone', label: 'Patrol Zone'},
    {value: 'Report Date', label: 'Report Date'},
    {value: 'Street', label: 'Street'},
    {value: 'Time', label: 'Time'},
    {value: 'Unit', label: 'Unit'},
];


class date extends Component {
    state = {
        selectedCustom: {value: false, label: 'Default'},
        selectedColumns: null,
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
export default date;

