import React, { Component } from "react";
import './GtpdFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

//options for the dropdown selects
const buildingOptions = [];
var newBuildingOptions = buildingOptions;
const APDBuildingOptions = [];
var newAPDBuildingOptions = APDBuildingOptions;
const crimeTypeOptions = [];
var newCrimeTypeOptions = crimeTypeOptions;
const crimeCategoryOptions = [
    {value: 'Any', label: 'Any'},
    {value: 'All Other Offenses', label: 'All Other Offenses'},
    {value: 'Animal Cruelty', label: 'Animal Cruelty'},
    {value: 'Arson', label: 'Arson'},
    {value: 'Assault Offenses', label: 'Assault Offenses'},
    {value: 'Bad Checks', label: 'Bad Checks'},
    {value: 'Bribery', label: 'Bribery'},
    {value: 'Burglary/Breaking & Entering', label: 'Burglary/Breaking & Entering'},
    {value: 'Counterfeiting/Forgery', label: 'Counterfeiting/Forgery'},
    {value: 'Curfew/Loitering/Vagrancy', label: 'Curfew/Loitering/Vagrancy'},
    {value: 'Destruction/Damage/Vandalism', label: 'Destruction/Damage/Vandalism'},
    {value: 'Disorderly Conduct', label: 'Disorderly Conduct'},
    {value: 'Driving Under Influence', label: 'Driving Under Influence'},
    {value: 'Drug/Narcotic Offenses', label: 'Drug/Narcotic Offenses'},
    {value: 'Drunkenness', label: 'Drunkenness'},
    {value: 'Embezzlement', label: 'Embezzlement'},
    {value: 'Extortion/Blackmail', label: 'Extortion/Blackmail'},
    {value: 'Family Offenses, Nonviolent', label: 'Family Offenses, Nonviolent'},
    {value: 'Fondling', label: 'Fondling'},
    {value: 'Fraud Offenses', label: 'Fraud Offenses'},
    {value: 'Gambling Offenses', label: 'Gambling Offenses'},
    {value: 'Homicide Offenses', label: 'Homicide Offenses'},
    {value: 'Kidnapping/Abduction', label: 'Kidnapping/Abduction'},
    {value: 'Larceny/Theft Offenses', label: 'Larceny/Theft Offenses'},
    {value: 'Liquor Law Violations', label: 'Liquor Law Violations'},
    {value: 'Motor Vehicle Theft', label: 'Motor Vehicle Theft'},
    {value: 'Peeping Tom', label: 'Peeping Tom'},
    {value: 'Pornography/Obscene Material', label: 'Pornography/Obscene Material'},
    {value: 'Prostitution Offenses', label: 'Prostitution Offenses'},
    {value: 'Robbery', label: 'Robbery'},
    {value: 'Sex Offenses, Forcible', label: 'Sex Offenses, Forcible'},
    {value: 'Sex Offenses, Nonforcible', label: 'Sex Offenses, Nonforcible'},
    {value: 'Stolen Property Offenses', label: 'Stolen Property Offenses'},
    {value: 'Trespass of Real Property', label: 'Trespass of Real Property'},
    {value: 'Weapons Law Violations', label: 'Weapons Law Violations'},
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
    {value: 'bothDepartment', label: 'Both Departments'},
    {value: 'gtpDepartment', label: 'Georgia Tech Police Department'},
    {value: 'apDepartment', label: 'Atlanta Police Department'},
];
const gtLocationTypeOptions = [
    {value: 'Any', label: 'Any'},
    {value: 'Academic', label: 'Academic'},
    {value: 'Administration', label: 'Administration'},
    {value: 'Athletic', label: 'Athletic'},
    {value: 'Greek', label: 'Greek'},
    {value: 'Green Space', label: 'Green Space'},
    {value: 'Housing', label: 'Housing'},
    {value: 'Inactive', label: 'Inactive'},
    {value: 'Mixed Use', label: 'Mixed Use'},
    {value: 'Parking', label: 'Parking'},
    {value: 'Religious', label: 'Religious'},
    {value: 'Research', label: 'Research'},
    {value: 'Restaurant', label: 'Restaurant'},
    {value: 'Retail', label: 'Retail'},
    {value: 'Vacant', label: 'Vacant'},
];
const apdLocationTypeOptions = [
    {value: 'Any', label: 'Any'},
    {value: 'APD-Apts', label: 'APD-Apts'},
    {value: 'APD-Bank', label: 'APD-Bank'},
    {value: 'APD-Bar', label: 'APD-Bar'},
    {value: 'APD-Bar/Club', label: 'APD-Bar/Club'},
    {value: 'Church', label: 'Church'},
    {value: 'APD-Condos', label: 'APD-Condos'},
    {value: 'APD-Food', label: 'APD-Food'},
    {value: 'APD-Gas/Conv', label: 'APD-Gas/Conv'},
    {value: 'APD-Hotel', label: 'APD-Hotel'},
    {value: 'APD-Mixed Use', label: 'APD-Mixed Use'},
    {value: 'APD-Offices', label: 'APD-Offices'},
    {value: 'APD-Other', label: 'APD-Other'},
    {value: 'APD-Parking', label: 'APD-Parking'},
    {value: 'APD-Rail', label: 'APD-Rail'},
    {value: 'APD-Retail', label: 'APD-Retail'},
    {value: 'APD-School', label: 'APD-School'},
    {value: 'APD-Shelter', label: 'APD-Shelter'},
    {value: 'APD-Store', label: 'APD-Store'},
    {value: 'APD-Theatre', label: 'APD-Theatre'},
]

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
        selectedAPDBuilding: null,
        selectedCrimeType: null,
        selectedCrimeCategory: null,
        selectedShift: null,
        selectedArrest: null,
        selectedDepartment: {value: 'bothDepartment', label: 'Both Departments'},
        selectedGTLocationType: {value: 'Any', label: 'Any'},
        selectedOutcome: null,
        selectedDate: null,
        selectedAPDLocationType: {value: 'Any', label: 'Any'},
    };

    //for the dropdown selects
    setBuilding = selectedBuilding => { this.setState({selectedBuilding}); };
    setAPDBuilding = selectedAPDBuilding => { this.setState({selectedAPDBuilding}); };
    setCrimeType = selectedCrimeType => { this.setState({selectedCrimeType}); };
    setCrimeCategory = selectedCrimeCategory => { this.setState({selectedCrimeCategory}); };
    setShift = selectedShift => { this.setState({selectedShift}); }
    setArrest = selectedArrest => { this.setState({selectedArrest}); }
    setDepartment = selectedDepartment => { this.setState({selectedDepartment}); }
    setOutcome = selectedOutcome => { this.setState({selectedOutcome}); }
    
    //Changing the location filters based on the department chosen
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
                        value={this.state.selectedGTLocationType} 
                        onChange={this.setGTLocationType} 
                        options={gtLocationTypeOptions} 
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
                    <label className="col-12 col-form-label">
                        APD Buildings
                    </label>
                    <div>
                        <Select 
                        value={this.selectedAPDBuilding} 
                        onChange={this.setAPDBuilding} 
                        options={newAPDBuildingOptions} 
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
                        value={this.state.selectedGTLocationType} 
                        onChange={this.setGTLocationType} 
                        options={gtLocationTypeOptions} 
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        Georgia Tech Buildings
                    </label>
                    <div>
                        <Select 
                        value={this.state.selectedBuilding} 
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
                        value={this.state.selectedAPDLocationType} 
                        onChange={this.setAPDLocationType} 
                        options={apdLocationTypeOptions} 
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label">
                        APD Buildings
                    </label>
                    <div>
                        <Select 
                        value={this.selectedAPDBuilding} 
                        onChange={this.setAPDBuilding} 
                        options={newAPDBuildingOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                </div>
            )
        }
    }
    //changing the building options based on the locationtype
    setGTLocationType = selectedGTLocationType => {
        this.setState({selectedGTLocationType});
        //populating the newbuildingoptions with the desired buildings
        var j = 0;
        newBuildingOptions = [];
        if(selectedGTLocationType.value !== "Any") {
            for(var i = 0; i < buildingOptions.length; i++) {
                if(buildingOptions[i]['Loc Type'] === selectedGTLocationType.value) {
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
        //populating the newAPDbuildingoptions with the desired buildings
        var j = 0;
        newAPDBuildingOptions = [];
        if(selectedAPDLocationType.value !== "Any") {
            for(var i = 0; i < APDBuildingOptions.length; i++) {
                if(APDBuildingOptions[i]['Loc Type'] === selectedAPDLocationType.value) {
                    newAPDBuildingOptions[j] = APDBuildingOptions[i];
                    j++;
                }
            }
        } else {
            newAPDBuildingOptions = APDBuildingOptions;
        }
    }

    setCrimeCategory = selectedCrimeCategory => {
        this.setState({selectedCrimeCategory});
        //populating the newbuildingoptions with the desired buildings
        var j = 0;
        newCrimeTypeOptions = [];
        if(selectedCrimeCategory.value !== "Any") {
            for(var i = 0; i < crimeTypeOptions.length; i++) {
                if(crimeTypeOptions[i]['NIBRS_Category'] === selectedCrimeCategory.value) {
                    newCrimeTypeOptions[j] = crimeTypeOptions[i];
                    j++;
                }
            }
        } else {
            newCrimeTypeOptions = crimeTypeOptions;
        }
    }


    //changing the date based on the date range chosen
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

    componentDidMount() {
        this.getLocations();
        this.getCrimeTypes();
    }

    //populating locations
    populateLocations(data) {
        var gtCount = 0;
        var apdCount = 0;
        for(var i = 0; i < data.length; i++) {
            if(data[i]["Loc Code"] === "APD") {
                APDBuildingOptions[apdCount] = data[i];
                APDBuildingOptions[apdCount].value =  data[i]['Building Name'];
                APDBuildingOptions[apdCount].label =  data[i]['Building Name'];
                apdCount++;
            } else {
                buildingOptions[gtCount] = data[i];
                buildingOptions[gtCount].value = data[i]['Building Name'];
                buildingOptions[gtCount].label = data[i]['Building Name'];
                gtCount++;
            }
        }
        buildingOptions.sort((a, b) => (a.value > b.value) ? 1 : -1);
        APDBuildingOptions.sort((a, b) => (a.value > b.value) ? 1 : -1);
    }
    populateCrimes(data) {
        for(var i = 0; i < data.length; i++) {
            if(data[i]["NIBRS_Category"] === null) {
                crimeTypeOptions[i] = data[i];
                crimeTypeOptions[i].value =  data[i]['Inc_Desc_PCase'];
                crimeTypeOptions[i].label =  data[i]['Inc_Desc_PCase'];
                crimeTypeOptions[i]['NIBRS_Category'] =  "All Other Offenses";
            } else {
                crimeTypeOptions[i] = data[i];
                crimeTypeOptions[i].value = data[i]['Inc_Desc_PCase'];
                crimeTypeOptions[i].label = data[i]['Inc_Desc_PCase'];
            }
        }
        crimeTypeOptions.sort((a, b) => (a.value > b.value) ? 1 : -1);
    }
    getLocations() {
        fetch('/locations')
            .then(results => {
                results.json().then(data=> {
                    this.populateLocations(data)
                })
            })
            .catch(err => console.error(err))
    }
    getCrimeTypes() {
        fetch('/crimeTypes')
            .then(results => {
                results.json().then(data=> {
                    this.populateCrimes(data)
                })
            })
            .catch(err => console.error(err))
    }

    handleSubmit(){
        console.log(this.state)
    }
    
    render() {
        const {
            selectedCrimeType, 
            selectedShift, 
            selectedArrest, 
            selectedDepartment, 
            selectedOutcome, 
            selectedDate, 
            selectedCrimeCategory,
        } = this.state;


        return(
        <div className="main filterMain">
            <div className="card filterCard">
                <h2 className="card-header">Filter</h2>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
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
                                            Category
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedCrimeCategory} 
                                            onChange={this.setCrimeCategory} 
                                            options={crimeCategoryOptions} 
                                            placeholder={"Any"}
                                            />
                                        </div>
                                        <label className="col-12 col-form-label">
                                            Type
                                        </label>
                                        <div>
                                            <Select 
                                            value={selectedCrimeType} 
                                            onChange={this.setCrimeType} 
                                            options={newCrimeTypeOptions} 
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