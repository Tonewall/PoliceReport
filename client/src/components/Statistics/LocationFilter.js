import React, { Component } from "react";
import Select from "react-select";


const buildingOptions = [];
var newBuildingOptions = buildingOptions;
const MOOptions = [
    {value: 'Any', label: 'Any'},
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

const zoneOptions = [
    {value: 'Any', label: 'Any'},
    {value: 'Z1', label: 'Z1'},
    {value: 'Z2', label: 'Z2'},
    {value: 'Z3', label: 'Z3'},
    {value: 'Z4', label: 'Z4'},
]

const locationCodeOptions = [
    {value: 'Any', label: 'Any'},
    {value: 'ONCAM', label: 'ONCAM'},
    {value: 'ONCAMRES', label: 'ONCAMRES'},
    {value: 'NONCAM', label: 'NONCAM'},
    {value: 'PUB', label: 'PUB'},
    {value: 'NONCLERY', label: 'NONCLERY'},
    {value: 'MARTA', label: 'MARTA'},
]


class location extends Component {
    state = {
        streetName: null,
        selectedBuilding: null,
        selectedGTLocationType: {value: 'Any', label: 'Any'},
        selectedZone: null,
        selectedLocationCode:null,
        MO: null,
    };

    constructor(props) {
        super(props)
        props.locationHandler(this.state)
    }


    setBuilding = selectedBuilding => { this.setState({selectedBuilding},
        function() {
            this.props.locationHandler(this.state)
        }); }
    setZone = selectedZone => { this.setState({selectedZone},
        function() {
            this.props.locationHandler(this.state)
        }); }
    setLocationCode = selectedLocationCode => { this.setState({selectedLocationCode},
        function() {
            this.props.locationHandler(this.state)
        }); }
    setMO = MO => { this.setState({MO},
        function() {
            this.props.locationHandler(this.state)
        }); }



    //Changing the location filters based on the department chosen
    getFilter() {
        return(
        <div className="GTFilters">
            <label className="col-12 col-form-label" style={{fontSize: 13}}>
                Location Type
            </label>
            <div>
                <Select 
                value={this.state.selectedGTLocationType} 
                onChange={this.setGTLocationType} 
                options={gtLocationTypeOptions} 
                />
            </div>
            <label className="col-12 col-form-label" style={{fontSize: 13}}>
                Zones
            </label>
            <div>
                <Select 
                value={this.state.selectedZone} 
                onChange={this.setZone} 
                options={zoneOptions} 
                placeholder={"Any"}
                />
            </div>
            <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
            <label className="col-12 col-form-label" style={{fontSize: 13}}>
                Location Code
            </label>
            <div>
                <Select 
                value={this.selectedLocationCode} 
                onChange={this.setLocationCode} 
                options={locationCodeOptions} 
                placeholder={"Any"}
                />
            </div>
            <label className="col-12 col-form-label" style={{fontSize: 13}}>
                MO
            </label>
            <div>
                <Select 
                value={this.selectedMO} 
                onChange={this.setMO} 
                options={MOOptions} 
                placeholder={"Any"}
                />
            </div>
        </div>
        )
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
                if(buildingOptions[i]&&buildingOptions[i]['Loc Type'] === selectedGTLocationType.value) {
                    newBuildingOptions[j] = buildingOptions[i];
                    j++;
                }
            }
        } else {
            newBuildingOptions = buildingOptions;
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
        for(var i = 0; i < data.length; i++) {
            if(data[i]["Loc Code"] !== "APD") {
                buildingOptions[i] = data[i];
                buildingOptions[i].value = data[i]['Building Name'];
                buildingOptions[i].label = data[i]['Building Name'];
                buildingOptions[i].x = data[i]['X_Coord'];
                buildingOptions[i].y = data[i]['Y_Coord'];
            }
        }
        buildingOptions.sort((a, b) => (a.value > b.value) ? 1 : -1);
    }
    populateMO(data) {
        for(var i = 0; i < data.length; i++) {
            MOOptions[i+1] = data[i];
            MOOptions[i+1].value =  data[i]['MO'];
            MOOptions[i+1].label =  data[i]['MO'];
        }
    }

    componentDidMount() {
        fetch('/locations')
            .then(results => {
                results.json().then(data=> {
                    this.populateLocations(data)
                })
            })
            .catch(err => console.error(err))
        fetch('/get-distinct-mo')
            .then(results => {
                results.json().then(data=> {
                    this.populateMO(data)
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return(
        <div className="main">
            <div className="card filterTypeCards locationsCard">
                <h4 className="card-header">Location</h4>
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="inputStreet" className="col-12 col-form-label" style={{fontSize: 13}}>Street Name</label>
                        <div className="col-12">
                        <input type="text" name="streetName" onChange={this.handleChange} className="form-control" id="inputStreet" placeholder="Street"/>
                        </div>
                    </div>
                    {this.getFilter()}
                        
                    
                </div>
            </div>
        </div>
        )
    }
}
export default location;

