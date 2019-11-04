import React, { Component } from "react";
import './GtpdFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

//options for the dropdown selects
const locationOptions = [
    {value: 'barnesAndNobles', label: 'Barnes & Nobles'},
    {value: 'collegeOfComputing', label: 'College of Computing'},
    {value: 'crc', label: 'CRC'},
    {value: 'culc', label: 'Culc'},
    {value: 'eastCampusHousing', label: 'East Campus Housing'},
    {value: 'greekHousing', label: 'Greek Housing'},
    {value: 'gtpd', label: 'GTPD'},
    {value: 'klaus', label: 'Klaus'},
    {value: 'library', label: 'Library'},
    {value: 'northAve', label: 'North Aveue Apartments'},
    {value: 'offCampus', label: 'Off Campus'},
    {value: 'stamps', label: 'Stamps'},
    {value: 'studentCenter', label: 'Student Center'},
    {value: 'westCampusHousing', label: 'West Campus Housing'},
    {value: 'zOne', label: 'Zone One'},
    {value: 'zTwo', label: 'Zone Two'},
    {value: 'zThree', label: 'Zone Three'},
    {value: 'zFour', label: 'Zone Four'},
];
const typeOptions = [
    {value: 'aggravatedAssault', label: 'Aggravated Assault'},
    {value: 'arson', label: 'Arson'},
    {value: 'autoTheft', label: 'Auto Theft'},
    {value: 'burglary', label: 'Burglary'},
    {value: 'drugsNarcotics', label: 'Drugs/Narcotics'},
    {value: 'larceny', label: 'Larceny'},
    {value: 'loitering', label: 'Loitering'},
    {value: 'publicDisturbance', label: 'Public Disturbance'},
    {value: 'robbery', label: 'Robbery'},
    {value: 'rape', label: 'Rape'},
    {value: 'trafficRelated', label: 'Traffic Related'},
    {value: 'trespassing', label: 'Trespassing'},
    {value: 'underageDrinking', label: 'Underage Drinking'},
    {value: 'other', label: 'Other'},

];
const shiftOptions = [
    {value: 'mornShift', label: 'Morn'},
    {value: 'dayShift', label: 'Day'},
    {value: 'eveShift', label: 'Eve'}
]
const arrestOptions = [
    {value: 'arrests', label: 'Arrests'},
    {value: 'warnings', label: 'Warnings'}
]




class gtpdFilter extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        selectedLocation: null,
        selectedType: null,
        selectedShift: null,
        selectedArrest: null,
    };

    handleStartChange = date => {
        this.setState({
          startDate: date
        });
    };
    handleEndChange = date => {
        this.setState({
          endDate: date
        });
    };

    //for the dropdown selects
    setLocation = selectedLocation => {
        this.setState({selectedLocation});
    };
    setType = selectedType => {
        this.setState({selectedType});
    };
    setShift = selectedShift => {
        this.setState({selectedShift});
    }
    setArrest = selectedArrest => {
        this.setState({selectedArrest});
    }
    
    render() {
        const { selectedLocation } = this.state;
        const { selectedType } = this.state;
        const { selectedShift } = this.state;
        const { selectedArrest } = this.state;

        var inputStyle = {
            marginLeft:18,
            marginTop:2
        }


        return(
        <div className="main filterMain">
            <div className="card filterCard">
                <h2 className="card-header">Filter</h2>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards locationsCard">
                                    <h4 className="card-header">Location/Zones</h4>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label for="inputStreet" className="col-12 col-form-label">Type in the Street Name</label>
                                            <div className="col-12">
                                            <input type="text" className="form-control" id="inputStreet" placeholder="Street"/>
                                            </div>
                                        </div>
                                        <label className="col-12 col-form-label">
                                            or Choose a Location/Zones
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedLocation} 
                                            onChange={this.setLocation} 
                                            options={locationOptions} 
                                            />
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards typeCard">
                                    <h4 className="card-header">Type</h4>
                                    <div className="card-body">
                                        <div>
                                            <Select 
                                            value={selectedType} 
                                            onChange={this.setType} 
                                            options={typeOptions} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card filterTypeCards shiftCard">
                                    <h4 className="card-header">Shift</h4>
                                    <div className="card-body">
                                        <div>
                                            <Select 
                                            value={selectedShift} 
                                            onChange={this.setShift} 
                                            options={shiftOptions} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards dateCard">
                                    <h4 className="card-header">Date</h4>
                                    <div className="card-body">
                                        <div className="col-12">
                                            <label className="dateLabel">Start Date:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleStartChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="dateLabel">End Date:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleEndChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card filterTypeCards arrestCard">
                                    <h4 className="card-header">Arrest or Warning</h4>
                                    <div className="card-body">
                                        <div>
                                            <Select 
                                            value={selectedArrest} 
                                            onChange={this.setArrest} 
                                            options={arrestOptions} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row searchButton">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default gtpdFilter;