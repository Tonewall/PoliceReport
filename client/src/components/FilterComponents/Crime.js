import React, { Component } from "react";
import Select from "react-select";


const crimeTypeOptions = [];
var newCrimeTypeOptions = crimeTypeOptions;
var crimeCategoryOptions = [];
const arrestOptions = [
    {value: 'arrests', label: 'Arrests'},
    {value: 'warnings', label: 'CT Warnings'}
]

const outcomeOptions = [
    {value: 'felony', label: 'Felony'},
    {value: 'misdemeanor', label: 'Misdemeanor'},
];



class crime extends Component {
    state = {
        selectedCrimeType: null,
        selectedCrimeCategory: {value: 'Any', label: 'Any'},
        selectedArrest: null,
        selectedOutcome: null,
    };

    constructor(props) {
        super(props)
        props.crimeHandler(this.state)
    }

    setCrimeType = selectedCrimeType => { 
        this.setState({selectedCrimeType},
        function() {
            this.props.crimeHandler(this.state)
        }); 
    };
    setCrimeCategory = selectedCrimeCategory => { 
        this.setState({selectedCrimeCategory},
        function() {
            this.props.crimeHandler(this.state)
        }); 
    };
    
    setArrest = selectedArrest => { 
        this.setState({selectedArrest},
        function() {
            this.props.crimeHandler(this.state)
        }); 
    }
    setOutcome = selectedOutcome => { 
        this.setState({selectedOutcome},
        function() {
            this.props.crimeHandler(this.state)
        }); 
    }
    setCrimeCategory = selectedCrimeCategory => {
        this.setState({selectedCrimeCategory},
        function() {
            this.props.crimeHandler(this.state)
        });
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
        this.setState({newCrimeTypeOptions: newCrimeTypeOptions})
        console.log("DONE")
        console.log(selectedCrimeCategory)
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
                crimeTypeOptions[i].value = data[i]['UCR_CODE1'];
                crimeTypeOptions[i].label = data[i]['Inc_Desc_PCase'];
            }
        }
        crimeTypeOptions.sort((a, b) => (a.label > b.label) ? 1 : -1);
    }
    populateCategories(data) {
        for(var i = 0; i < data.length; i++) {
            if(data[i]["NIBRS_Category"] === null) {
                crimeCategoryOptions[i+1] = data[i];
                crimeCategoryOptions[i+1].value =  "All Other Offenses";
                crimeCategoryOptions[i+1].label =  "All Other Offenses";
            } else {
                crimeCategoryOptions[i+1] = data[i];
                // crimeCategoryOptions[i+1].value = data[i]['NIBRS_Offense_code'];
                crimeCategoryOptions[i+1].value = data[i]['NIBRS_Category'];
                crimeCategoryOptions[i+1].label = data[i]['NIBRS_Category'];
            }
        }
        crimeCategoryOptions.sort((a, b) => (a.label > b.label) ? 1 : -1);
        crimeCategoryOptions[0] = {value: "Any", label: "Any"}
    }
    componentDidMount() {
        fetch('/crimeCategories')
            .then(results => {
                results.json().then(data => {
                    this.populateCategories(data)

                    fetch('/crimeTypes')
                        .then(results => {
                            results.json().then(data => {
                                this.populateCrimes(data)
                                this.setCrimeCategory({value: 'Any', label: 'Any'})
                            })
                        })
                        .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        const {             
            selectedCrimeType, 
            selectedArrest, 
            selectedOutcome, 
            selectedCrimeCategory, 
        } = this.state;
        return(
        <div className="main">
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
                        options={this.state.newCrimeTypeOptions} 
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
        )
    }
}
export default crime;

