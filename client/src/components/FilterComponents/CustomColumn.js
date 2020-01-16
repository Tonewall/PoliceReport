import React, { Component } from "react";
import Select from "react-select";


const customOptions = [
    {value: false, label: 'Default'},
    {value: true, label: 'Custom'},
];
const columns = [
    {value: 'reportDate', label: 'Report Date'},
    {value: 'time', label: 'Time'},
    {value: 'crimeType', label: 'Crime Type'},
    {value: 'street', label: 'Street'},
    {value: 'locationLandmark', label: 'Location Landmark'},
    {value: 'locationCode', label: 'Location Code'},
    {value: 'offenderName', label: 'Offender Name'},
    {value: 'gtid', label: 'GTID'},
    {value: 'department', label: 'Department'},
    {value: 'patrolZone', label: 'Patrol Zone'},
    {value: 'officerName', label: 'Officer Name'},
    {value: 'officerId', label: 'Officer ID'},
    {value: 'unit', label: 'Unit'},
    {value: 'clearingOfficerName', label: 'Clearing Officer Name'},
    {value: 'clearingOfficerId', label: 'Clearing Officer ID'},
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

