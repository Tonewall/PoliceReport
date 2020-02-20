import React, { Component } from "react";
import Select from "react-select";


const countOptions = [
    {value: '1000', label: '1000'},
    {value: '2500', label: '2500'},
    {value: '5000', label: '5000'},
    {value: '10000', label: '10000'},
    {value: 'All', label: 'All'},
];


class count extends Component {
    state = {
        selectedCount: {value: '1000', label: '1000'},
    };

    setCount = selectedCount => { 
        this.setState({selectedCount},
        function() {this.props.countHandler(selectedCount.value)
        })
    };

    render() {
        const { selectedCount } = this.state;
        return(
        <div className="main">
            <div className="card filterTypeCards dateCard">
                <h4 className="card-header">Count</h4>
                <div className="card-body">
                    <div className="col-12 dateFilters">
                        <label className="col-12 col-form-label" style={{fontSize: 13}}>
                            Number of Incidents
                        </label>
                        <div>
                            <Select 
                            value={selectedCount} 
                            onChange={this.setCount} 
                            options={countOptions} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default count;

