import React, { Component } from "react";
import Select from "react-select";


const buildingOptions = [];
var newBuildingOptions = buildingOptions;
const APDBuildingOptions = [];
var newAPDBuildingOptions = APDBuildingOptions;
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


class location extends Component {
    state = {
        streetName: null,
        selectedBuilding: null,
        selectedAPDBuilding: null,
        selectedDepartment: {value: 'bothDepartment', label: 'Both Departments'},
        selectedGTLocationType: {value: 'Any', label: 'Any'},
        selectedAPDLocationType: {value: 'Any', label: 'Any'},
    };
    setDepartment = selectedDepartment => { this.setState({selectedDepartment},
        function() {
            this.props.locationHandler(this.state)
        }); }
    setBuilding = selectedBuilding => { this.setState({selectedBuilding},
        function() {
            this.props.locationHandler(this.state)
        }); }
    setAPDBuilding = selectedAPDBuilding => { this.setState({selectedAPDBuilding},
        function() {
            this.props.locationHandler(this.state)
        }); }



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
        this.setState({selectedGTLocationType},
        function() {
            this.props.locationHandler(this.state)
        });
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
        this.setState({selectedAPDLocationType},
        function() {
            this.props.locationHandler(this.state)
        });
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
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value},
            function() {
                this.props.locationHandler(this.state)
            });
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

    componentDidMount() {
        fetch('/locations')
            .then(results => {
                results.json().then(data=> {
                    this.populateLocations(data)
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        const { selectedDepartment, } = this.state;
        return(
        <div className="main">
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
                        <input type="text" name="streetName" onChange={this.handleChange} className="form-control" id="inputStreet" placeholder="Street"/>
                        </div>
                    </div>
                    {this.changeDepartment(selectedDepartment)}
                        
                    
                </div>
            </div>
        </div>
        )
    }
}
export default location;
