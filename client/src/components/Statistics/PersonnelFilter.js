import React, { Component } from "react";
import Select from "react-select";
import {server} from '../../config'

const shiftOptions = [
    {value: 'dayShift', label: 'Day'},
    {value: 'eveShift', label: 'Eve'},
    {value: 'mornShift', label: 'Morn'},
    {value: 'coreShift', label: 'Core'},
    {value: 'srtShift', label: 'SRT'},
    {value: 'csuShift', label: 'CSU'},
    {value: 'trafficShift', label: 'Traff'},
    {value: 'cidShift', label: 'CID'},
    {value: 'eventShift', label: 'Event'},
    {value: 'cpShift', label: 'CP'},
    {value: 'fitShift', label: 'FIT'},
    {value: 'otherShift', label: 'Other'},    
]
const occurredShiftOptions = [
    {value: 'dayShift', label: 'Day'},
    {value: 'eveShift', label: 'Eve'},
    {value: 'mornShift', label: 'Morn'},   
]

const officerOptions = [{value: '', label: 'Any'}];


class personnel extends Component {
    state = {
        selectedShift: null,
        officerName: '',
        name: null,
        selectedOfficer: {value: '', label: 'Any'},
        selectedOccurredShift: null,
    };

    setShift = selectedShift => { this.setState({selectedShift},
        function() {
            this.props.personnelHandler(this.state)
        }); }
    setOccurredShift = selectedOccurredShift => { this.setState({selectedOccurredShift},
        function() {
            this.props.personnelHandler(this.state)
        }); }

    componentDidMount() {
        fetch(server+'/getOfficers',
        {
            credentials: 'include'
        })
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
        const { selectedShift, selectedOfficer, selectedOccurredShift } = this.state;
        return(
        <div className="main">
            <div className="card filterTypeCards shiftCard">
                <h4 className="card-header">Personnel</h4>
                <div className="card-body">
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Occurred Shift (Shift of Occurrence)
                    </label>
                    <div>
                        <Select 
                        value={selectedOccurredShift} 
                        onChange={this.setOccurredShift} 
                        options={occurredShiftOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Officer
                    </label>
                    <div>
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
        )
    }
}
export default personnel;

