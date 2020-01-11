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
        this.forceUpdate()
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
        this.forceUpdate()  // If this function runs slow and could not be completed before render call, Select options may not be populated. so force update at the end.
    }
    populateCategories(data) {
        crimeCategoryOptions = []
        let null_category_codes = []
        for(var i = 0; i < data.length; i++) {
            if(data[i]["NIBRS_Category"] === null) {    // All codes referring to this will be put into 'All other offenses' category
                var code_set = data[i]['NIBRS_Offense_code']==null ? new Set(['']) : new Set(data[i]['NIBRS_Offense_code'].split(','))
                code_set.delete('')
                null_category_codes = Array.from(code_set)
            } else {
                crimeCategoryOptions[i] = data[i];
                var code_set = data[i]['NIBRS_Offense_code']==null ? new Set(['']) : new Set(data[i]['NIBRS_Offense_code'].split(','))
                code_set.delete('')
                crimeCategoryOptions[i]['NIBRS_Offense_code'] = Array.from(code_set)
                crimeCategoryOptions[i].value = data[i]['NIBRS_Category'];
                crimeCategoryOptions[i].label = data[i]['NIBRS_Category'];
            }
        }

        // put null_category_codes into 'All other offenses' category.
        crimeCategoryOptions.forEach((item) => {if (item.label=='All Other Offenses') item['NIBRS_Offense_code'] = item['NIBRS_Offense_code'].concat(null_category_codes)})

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

