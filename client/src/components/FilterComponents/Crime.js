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
    {value: 'F', label: 'Felony'},
    {value: 'M', label: 'Misdemeanor'},
];
const caseStatusOptions = [
    {value: 'A', label: 'A'},
    {value: 'CA', label: 'CA'},
    {value: 'CE', label: 'CE'},
    {value: 'CO', label: 'CO'},
    {value: 'I', label: 'I'},
    {value: 'L', label: 'L'},
    {value: 'U', label: 'U'},
];

const citationOptions = [
    {value: '16-', label: 'Crimes and Offenses (Title 16)'},
    {value: '40-', label: 'Motor Vehicle and Traffic (Title 40)'},
    {value: 'Other', label: 'Other'}
]
const mentalOptions = [
    {value: 'EMS', label: 'EMS'},
    {value: 'Injury', label: 'Injury'},
    {value: 'Suicide', label: 'Suicide'},
    {value: '1013', label: '1013'},
]
// const mentalOptions = [
//     {value: 'Drug', label: 'Drug'},
//     {value: 'Alcohol', label: 'Alcohol'},
//     {value: 'Weapon', label: 'Weapon'},
// ]



class crime extends Component {
    state = {
        selectedCrimeType: null,
        selectedCrimeCategory: {value: 'Any', label: 'Any'},
        selectedArrest: null,
        selectedOutcome: null,
        selectedCaseStatus: {value: 'Any', label: 'Any'},
        selectedCitation: null,
        selectedMental: null,
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
    setCaseStatus = selectedCaseStatus => {
        this.setState({selectedCaseStatus},
        function() {
            this.props.crimeHandler(this.state)
        });
    }
    setMental = selectedMental => {
        this.setState({selectedMental},
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
    setCitation = selectedCitation => {
        this.setState({selectedCitation},
            function() {
                this.props.crimeHandler(this.state)
            })
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
            selectedCaseStatus,
            selectedMental,
            selectedCitation
        } = this.state;
        return(
        <div className="main">
           <div className="card filterTypeCards typeCard">
                <h4 className="card-header">Crime</h4>
                <div className="card-body">
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Injury/Mental Health
                    </label>
                    <div>
                        <Select 
                        value={selectedMental} 
                        onChange={this.setMental} 
                        options={mentalOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    {/* <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Drug/Alcohol/Weapon
                    </label>
                    <div>
                        <Select 
                        value={selectedDrug} 
                        onChange={this.setDrug} 
                        options={drugOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div> */}
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Citation
                    </label>
                    <div>
                        <Select 
                        value={selectedCitation} 
                        onChange={this.setCitation} 
                        options={citationOptions} 
                        isMulti={true}
                        placeholder={"Any"}
                        />
                    </div>
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
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
                    <label className="col-12 col-form-label" style={{fontSize: 13}}>
                        Case Status
                    </label>
                    <div>
                        <Select
                        value={selectedCaseStatus}
                        onChange={this.setCaseStatus}
                        options={caseStatusOptions}
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

