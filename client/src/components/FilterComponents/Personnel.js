import React, { Component } from "react";
import Select from "react-select";


const shiftOptions = [
    {value: 'aShift', label: 'A'},
    {value: 'bShift', label: 'B'},
    {value: 'cShift', label: 'C'},
    {value: 'cidShift', label: 'CID'},
    {value: 'coreShift', label: 'Core'},
    {value: 'cpShift', label: 'CP'},
    {value: 'csaShift', label: 'CSA'},
    {value: 'csuShift', label: 'CSU'},
    {value: 'dShift', label: 'D'},
    {value: 'dayShift', label: 'Day'},
    {value: 'eveShift', label: 'Eve'},
    {value: 'eventShift', label: 'Event'},
    {value: 'fitShift', label: 'FIT'},
    {value: 'martaShift', label: 'MARTA'},
    {value: 'mornShift', label: 'Morn'},
    {value: 'trafficShift', label: 'Traffic'},
    {value: 'otherShift', label: 'Other'},

]


class personnel extends Component {
    state = {
        selectedShift: null,
        officerName: null,
    };

    setShift = selectedShift => { this.setState({selectedShift},
        function() {
            this.props.personnelHandler(this.state)
        }); }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value},
            function() {
                this.props.personnelHandler(this.state)
            });
    }

    

    render() {
        const { selectedShift } = this.state;
        return(
        <div className="main">
            <div className="card filterTypeCards shiftCard">
                <h4 className="card-header">Personnel</h4>
                <div className="card-body">
                    <label className="col-12 col-form-label">
                        Teams/Shifts
                    </label>
                    <div>
                        <Select 
                        value={selectedShift} 
                        onChange={this.setShift} 
                        options={shiftOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputStreet" className="col-12 col-form-label">Officer Name</label>
                        <div className="col-12">
                        <input type="text" name="officerName" onChange={this.handleChange} className="form-control" id="inputID" placeholder="Any"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default personnel;

