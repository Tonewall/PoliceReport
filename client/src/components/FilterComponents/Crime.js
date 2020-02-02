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
        newCrimeTypeOptions = [];
        if(selectedCrimeCategory.value !== "Any") {
            for(var i = 0; i < crimeTypeOptions.length; i++) {
                if(crimeTypeOptions[i]['NIBRS_Category'] === selectedCrimeCategory.value) {
                    newCrimeTypeOptions.push(crimeTypeOptions[i]);
                }
            }
        } 
        else {
            newCrimeTypeOptions = crimeTypeOptions;
        }
        this.forceUpdate()
    }
    populateCrimes(data) {
        for(var i = 0; i < data.length; i++) {
            crimeTypeOptions[i] = data[i];
            crimeTypeOptions[i].value = data[i]['NIBRS_Code_Extended'];
            crimeTypeOptions[i].label = data[i]['Description'];
        }
        crimeTypeOptions.sort((a, b) => (a.label > b.label) ? 1 : -1);
        this.forceUpdate()  // If this function runs slow and could not be completed before render call, Select options may not be populated. so force update at the end.
    }
    populateCategories(data) {
        crimeCategoryOptions = []
        let null_category_codes = []
        for(var i = 0; i < data.length; i++) {
            var code_set = data[i]['Aggregated_NIBRS_Code_Extended']==null ? new Set(['']) : new Set(data[i]['Aggregated_NIBRS_Code_Extended'].split(','))
            crimeCategoryOptions[i] = data[i];
            code_set.delete('')
            crimeCategoryOptions[i]['NIBRS_Offense_code'] = Array.from(code_set)
            crimeCategoryOptions[i].value = data[i]['NIBRS_Category'];
            crimeCategoryOptions[i].label = data[i]['NIBRS_Category'];
        }

        crimeCategoryOptions.sort((a, b) => (a.label > b.label) ? 1 : -1);
        crimeCategoryOptions.unshift({value: "Any", label: "Any"})
        this.forceUpdate()  // If this function runs slow and could not be completed before render call, Select options may not be populated. so force update at the end.
    }
    componentDidMount() {
        fetch('/crimeCategories')
            .then(results => {
                results.json().then(data=> {
                    this.populateCategories(data)
                })
            })
            .catch(err => console.error(err))
        fetch('/crimeTypes')
            .then(results => {
                results.json().then(data=> {
                    this.populateCrimes(data)
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
        </div>
        )
    }
}
export default crime;

