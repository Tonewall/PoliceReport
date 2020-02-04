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

const officerOptions = [{value: '', label: 'Any'}];


class personnel extends Component {
    state = {
        selectedShift: null,
        officerName: '',
        selectedOfficer: {value: '', label: 'Any'},

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

    componentDidMount() {
        fetch('/getOfficers')
            .then(results => {
                results.json().then(data=> {
                    this.getOfficers(data)
                })
            })
            .catch(err => console.error(err))
    }

    getOfficers(data) {
        for(var i = 0; i < data.length; i++) {
            var name = data[i]['FirstName'] + ' ' + data[i]['LastName']

            //James Cornacchia not in the database correctly
            if(data[i]['LastName'] === ' Cornacchia') {
                name = data[i]['FirstName'] + data[i]['LastName']
            }
            var ID = data[i]['LastName'] + ', ' + data[i]['FirstName'] + ' - ' + data[i]['IDNumber']
            officerOptions.push({value: name, label: ID})
        }
    }

    setOfficer = selectedOfficer => {
        this.setState({selectedOfficer})
        this.setState({officerName: selectedOfficer.value},
            function() {
                this.props.personnelHandler(this.state)
            });
    }

    render() {
        const { selectedShift, selectedOfficer } = this.state;
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
                        <label htmlFor="inputStreet" className="col-12 col-form-label">
                            Officer
                        </label>
                        <div className="col-12">
                            <Select 
                            value={selectedOfficer} 
                            onChange={this.setOfficer} 
                            options={officerOptions} 
                            placeholder={"Any"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default personnel;

