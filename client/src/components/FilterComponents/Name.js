import React, { Component } from "react";
import Select from "react-select";

const nameOption = [
    {value: 'offender', label: 'Offender'},
    {value: 'victim', label: 'Victim'},
    {value: 'complainant', label: 'Complainant/Witness'}, 
]

class name extends Component {
    state = {
        typedName: '',
        selectedName: [{value: 'offender', label: 'Offender'}],
    };

    setNameOption = selectedName => { this.setState({selectedName},
        function() {
            this.props.nameHandler(this.state)
        }); }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value},
            function() {
                this.props.nameHandler(this.state)
            });
    }


    render() {
        const { selectedName } = this.state;
        return(
        <div className="main">
            <div className="card filterTypeCards shiftCard">
                <h4 className="card-header">Master Name Search</h4>
                <div className="card-body">
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Type of Name
                    </label>
                    <div>
                        <Select 
                        value={selectedName} 
                        onChange={this.setNameOption} 
                        options={nameOption} 
                        isMulti={true}
                        placeholder={"Offender"}
                        />
                    </div>
                    <input type="text" name="typedName" onChange={this.handleChange} className="form-control" id="inputName" placeholder="Enter Name" style={{marginTop:'10px'}}/>
                </div>
            </div>
        </div>
        )
    }
}
export default name;

