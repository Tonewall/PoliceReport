import React, { Component } from "react";
import './GtpdFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

//options for the dropdown selects
const buildingOptions = [
    {value: '10th and Home Family Housing', label: '10th and Home Family Housing', type: 'Housing'},
    {value: 'Alpha Gamma Delta', label: 'Alpha Gamma Delta', type: 'Greek'},
    {value: 'Alpha Sigma Phi', label: 'Alpha Sigma Phi', type: 'Greek'},
    {value: 'Alpha Xi Delta', label: 'Alpha Xi Delta', type: 'Greek'},
    {value: 'Baker Building', label: 'Baker Building', type: 'Research'},
    {value: 'Beringause Building', label: 'Beringause Building', type: 'Administration'},
    {value: 'Broadband Institute Residential Laboratory', label: 'Broadband Institute Residential Laboratory', type: 'Academic'},
    {value: 'Brock Football Practice Facility', label: 'Brock Football Practice Facility', type: 'Athletic'},
    {value: 'Campus Safety Facility', label: 'Campus Safety Facility', type: 'Administration'},
    {value: 'CATEA', label: 'CATEA', type: 'Academic'},
    {value: 'Centennial Research Building', label: 'Centennial Research Building', type: 'Research'},
    {value: 'Center Street Apartments', label: 'Center Street Apartments', type: 'Housing'},
    {value: 'Chandler Stadium', label: 'Chandler Stadium', type: 'Athletic'},
    {value: 'Dalney Parking Deck', label: 'Dalney Parking Deck', type: 'Parking'},
    {value: 'Engineered Biosystems Building (EBB)', label: 'Engineered Biosystems Building (EBB)', type: 'Research'},
    {value: 'Facilities Operations Garage/Warehouse', label: 'CFacilities Operations Garage/WarehouseRC', type: 'Administration'},
    {value: 'Facilities, 955 Fowler', label: 'Facilities, 955 Fowler', type: 'Administration'},
    {value: 'Ford ES&T (Environmental Science & Technology)', label: 'Ford ES&T (Environmental Science & Technology)', type: 'Academic'},
    {value: 'Georgia Public Broadcasting - GTRI', label: 'Georgia Public Broadcasting - GTRI', type: 'Academic'},
    {value: 'Georgia Tech Water Sports', label: 'Georgia Tech Water Sports', type: 'Athletic'},
    {value: 'Golf Practice Facility', label: 'Golf Practice Facility', type: 'Athletic'},
    {value: 'Graduate Living Center', label: 'Graduate Living Center', type: 'Housing'},
    {value: 'Griffin Track', label: 'Griffin Track', type: 'Athletic'},
    {value: 'GTRI Conference Center & Parking Deck', label: 'GTRI Conference Center & Parking Deck', type: 'Research'},
];
var newBuildingOptions = [];
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
    {value: 'Any', label: 'Any'},
    {value: 'Housing', label: 'Housing'},
    {value: 'Greek', label: 'Greek'},
    {value: 'Research', label: 'Research'},
    {value: 'Administration', label: 'Administration'},
    {value: 'Academic', label: 'Academic'},
    {value: 'Athletic', label: 'Athletic'},
    {value: 'Parking', label: 'Parking'},
    {value: 'Religious', label: 'Religious'},
    {value: 'Mixed Use', label: 'Mixed Use'},
    {value: 'Green Space', label: 'Green Space'},
    
];
const apdLocationTypeOptions = [
    {value: 'apd', label: 'APD 1'},
    {value: 'apd', label: 'APD 2'},
    {value: 'apd', label: 'APD 3'},
    {value: 'apd', label: 'APD 4'},
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
        selectedGTLocationType: {value: 'Any', label: 'Any'},
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
                        options={newBuildingOptions} 
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
                        options={newBuildingOptions} 
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
        //populating the newbuildingoptions with the desired buildings
        var j = 0;
        newBuildingOptions = [];
        if(selectedGTLocationType.value !== "Any") {
            for(var i = 0; i < buildingOptions.length; i++) {
                if(buildingOptions[i].type === selectedGTLocationType.value) {
                    newBuildingOptions[j] = buildingOptions[i];
                    j++;
                }
            }
        } else {
            newBuildingOptions = buildingOptions;
        }
    }
    setAPDLocationType = selectedAPDLocationType => {
        this.setState({selectedAPDLocationType});
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
                            </div>
                            <div className="col-lg-4 col-6">

                                <div className="card filterTypeCards dateCard">
                                    <h4 className="card-header">Date</h4>
                                    <div className="card-body">
                                        <div className="col-12 dateFilters">
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
                                        </div>
                                        
                                        <div className="col-12">
                                            <label className="dateLabel">From:</label>
                                        </div>
                                        <div className="col-12 dateFilters">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleStartChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="dateLabel">To:</label>
                                        </div>
                                        <div className="col-12 dateFilters">
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