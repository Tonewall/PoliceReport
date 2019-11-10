import React, { Component } from "react";
import './GtpdFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

//options for the dropdown selects
const buildingOptions = [
    {value: 'barnesAndNobles', label: 'Barnes & Nobles'},
    {value: 'collegeOfComputing', label: 'College of Computing'},
    {value: 'crc', label: 'CRC'},
    {value: 'culc', label: 'CULC'},
    {value: 'gtpd', label: 'GTPD'},
    {value: 'klaus', label: 'Klaus'},
    {value: 'library', label: 'Library'},
    {value: 'stamps', label: 'Stamps'},
    {value: 'studentCenter', label: 'Student Center'},
];
const crimeTypeOptions = [
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
const arrestOptions = [
    {value: 'arrests', label: 'Arrests'},
    {value: 'warnings', label: 'CT Warnings'}
]
const departmentOptions = [
    {value: 'gtpDepartment', label: 'Georgia Tech Police Department'},
    {value: 'apDepartment', label: 'Atlanta Police Department'},
    {value: 'bothDepartment', label: 'Both Departments'},
];
const gtLocationTypeOptions = [
    {value: 'campusHousing', label: 'Campus Housing'},
    {value: 'greekHousing', label: 'Greek Housing'},
    {value: 'offCampus', label: 'Off Campus'},
    {value: 'noncam', label: 'NONCAM'},
];
const apdLocationTypeOptions = [
    {value: 'apd', label: 'APD 1'},
    {value: 'apd', label: 'APD 2'},
    {value: 'apd', label: 'APD 3'},
    {value: 'apd', label: 'APD 4'},
];
const zoneOptions = [
    {value: 'zOne', label: 'Zone One'},
    {value: 'zTwo', label: 'Zone Two'},
    {value: 'zThree', label: 'Zone Three'},
    {value: 'zFour', label: 'Zone Four'},
];
const outcomeOptions = [
    {value: 'felony', label: 'Felony'},
    {value: 'misdemeanor', label: 'Misdemeanor'},
];
const dateOptions = [
    {value: 'week', label: 'Past Week'},
    {value: 'month', label: 'Past Month'},
    {value: 'halfYear', label: 'Past Half Year'},
    {value: 'year', label: 'Past Year'},
];



class gtpdFilter extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        selectedBuilding: null,
        selectedCrimeType: null,
        selectedShift: null,
        selectedArrest: null,
        selectedDepartment: {value: 'bothDepartment', label: 'Both Departments'},
        selectedGTLocationType: null,
        selectedZone: null,
        selectedOutcome: null,
        selectedDate: null,
        selectedAPDLocationType: null,
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
    setBuilding = selectedBuilding => {
        this.setState({selectedBuilding});
    };
    setCrimeType = selectedCrimeType => {
        this.setState({selectedCrimeType});
    };
    setShift = selectedShift => {
        this.setState({selectedShift});
    }
    setArrest = selectedArrest => {
        this.setState({selectedArrest});
    }
    changeDepartment(department) {
        if(department == null) {
            return;  
        }
        if(department.value === "gtpDepartment") {
            return(
                <div className="GTFilters">
                    <label className="col-12 col-form-label">
                        Georgia Tech Location Type
                    </label>
                    <div>
                        <Select 
                        value={this.selectedGTLocationType} 
                        onChange={this.setGTLocationType} 
                        options={gtLocationTypeOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Buildings
                    </label>
                    <div>
                        <Select 
                        value={this.selectedBuilding} 
                        onChange={this.setBuilding} 
                        options={buildingOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Zones
                    </label>
                    <div>
                        <Select 
                        value={this.selectedZone} 
                        onChange={this.setZone} 
                        options={zoneOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                </div>
            )
        } else if (department.value === "apDepartment") {
            return (
                <div className="GTFilters">
                    <label className="col-12 col-form-label">
                        Atlanta Location Type
                    </label>
                    <div>
                        <Select 
                        value={this.selectedAPDLocationType} 
                        onChange={this.setAPDLocationType} 
                        options={apdLocationTypeOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                </div>
            )
        } else if (department.value === "bothDepartment") {
            return(
                <div className="BothFilters">
                    <label className="col-12 col-form-label">
                        Georgia Tech Location Type
                    </label>
                    <div>
                        <Select 
                        value={this.selectedGTLocationType} 
                        onChange={this.setGTLocationType} 
                        options={gtLocationTypeOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Georgia Tech Buildings
                    </label>
                    <div>
                        <Select 
                        value={this.selectedBuilding} 
                        onChange={this.setBuilding} 
                        options={buildingOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Georgia Tech Zones
                    </label>
                    <div>
                        <Select 
                        value={this.selectedZone} 
                        onChange={this.setZone} 
                        options={zoneOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Atlanta Location Type
                    </label>
                    <div>
                        <Select 
                        value={this.selectedAPDLocationType} 
                        onChange={this.setAPDLocationType} 
                        options={apdLocationTypeOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                </div>
            )
        }
    }
    setDepartment = selectedDepartment => {
        this.setState({selectedDepartment});
    }
    
    setGTLocationType = selectedGTLocationType => {
        this.setState({selectedGTLocationType});
    }
    setAPDLocationType = selectedAPDLocationType => {
        this.setState({selectedAPDLocationType});
    }
    setZone = selectedZone => {
        this.setState({selectedZone});
    }
    setOutcome = selectedOutcome => {
        this.setState({selectedOutcome});
    }
    setDate = selectedDate => {
        this.setState({selectedDate});
        //for the dropdown date ranges
        if(selectedDate.value === "week") {
            var date = new Date();
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
            this.setState({
                startDate: newDate
            });
        } else if(selectedDate.value === "month") {
            newDate = new Date();
            var newMonth = newDate.getMonth() - 1;
            newDate.setMonth(newMonth);
            this.setState({
                startDate: newDate
            });
        }else if(selectedDate.value === "halfYear") {
            date = new Date();
            newDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
            this.setState({
                startDate: newDate
            });
        }else if(selectedDate.value === "year") {
            newDate = new Date();
            var newYear = newDate.getFullYear() - 1;
            newDate.setYear(newYear);
            this.setState({
                startDate: newDate
            });
        }
    }
    
    render() {
        //check in one line
        const {
            selectedCrimeType, 
            selectedShift, 
            selectedArrest, 
            selectedDepartment, 
            selectedOutcome, 
            selectedDate, 
        } = this.state;
        // const { selectedCrimeType } = this.state;
        // const { selectedShift } = this.state;
        // const { selectedArrest } = this.state;
        // const { selectedDepartment } = this.state;
        // const { selectedGTLocationType } = this.state;
        // const { selectedZone } = this.state;
        // const { selectedOutcome } = this.state;
        // const { selectedDate } = this.state;


        return(
        <div className="main filterMain">
            <div className="card filterCard">
                <h2 className="card-header">Filter</h2>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards locationsCard">
                                    <h4 className="card-header">Location</h4>
                                    <div className="card-body">
                                        <label className="col-12 col-form-label">
                                            Department
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedDepartment} 
                                            onChange={this.setDepartment} 
                                            options={departmentOptions} 
                                            placeholder={"Both Departments"}
                                            />
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputStreet" className="col-12 col-form-label">Street Name</label>
                                            <div className="col-12">
                                            <input type="text" className="form-control" id="inputStreet" placeholder="Street"/>
                                            </div>
                                        </div>
                                        {this.changeDepartment(selectedDepartment)}
                                        
                                            {/* {selectedDepartment == "gtpDepartment" &&
                                            <div className="GTFilters">
                                            <label className="col-12 col-form-label">
                                                Location Type
                                            </label>
                                            <div>
                                                <Select 
                                                value={selectedGTLocationType} 
                                                onChange={this.setGTLocationType} 
                                                options={gtLocationTypeOptions} 
                                                isMulti={true}
                                                placeholder={"Any"}
                                                />
                                            </div>
                                            <label className="col-12 col-form-label">
                                                Buildings
                                            </label>
                                            <div>
                                                <Select 
                                                value={selectedBuilding} 
                                                onChange={this.setBuilding} 
                                                options={buildingOptions} 
                                                isMulti={true}
                                                placeholder={"Any"}
                                                />
                                            </div>
                                            <label className="col-12 col-form-label">
                                                Zones
                                            </label>
                                            <div>
                                                <Select 
                                                value={selectedZone} 
                                                onChange={this.setZone} 
                                                options={zoneOptions} 
                                                isMulti={true}
                                                placeholder={"Any"}
                                                />
                                            </div>
                                            </div>

                                        } */}
                                            
                                        
                                    </div>
                                </div>                                
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards typeCard">
                                    <h4 className="card-header">Crime</h4>
                                    <div className="card-body">
                                        <label className="col-12 col-form-label">
                                            Type
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedCrimeType} 
                                            onChange={this.setCrimeType} 
                                            options={crimeTypeOptions} 
                                            isMulti={true}
                                            placeholder={"Any"}
                                            />
                                        </div>
                                        <label className="col-12 col-form-label">
                                            Arrests/Warnings
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedArrest} 
                                            onChange={this.setArrest} 
                                            options={arrestOptions} 
                                            isMulti={true}
                                            placeholder={"Any"}
                                            />
                                        </div>
                                        <label className="col-12 col-form-label">
                                            Felony/Misdemeanor
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedOutcome} 
                                            onChange={this.setOutcome} 
                                            options={outcomeOptions} 
                                            isMulti={true}
                                            placeholder={"Any"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
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
                                            <label htmlFor="inputStreet" className="col-12 col-form-label">Officer ID</label>
                                            <div className="col-12">
                                            <input type="text" className="form-control" id="inputStreet" placeholder="Any"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card filterTypeCards dateCard">
                                    <h4 className="card-header">Date</h4>
                                    <div className="card-body">
                                        <label className="col-12 col-form-label">
                                            Date Range
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedDate} 
                                            onChange={this.setDate} 
                                            options={dateOptions} 
                                            placeholder={"Custom"}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="dateLabel">From:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleStartChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="dateLabel">To:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleEndChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="searchButton">
                                    <button type="submit" className="btn btn-primary">Search</button>
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