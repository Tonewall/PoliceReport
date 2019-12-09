import React, { Component } from "react";
import Select from "react-select";


const yearOptions = [];


class year extends Component {
    state = {
        selectedYear: null,
    };

    setYear = selectedYear => { 
        this.setState({selectedYear},
        function() {this.props.yearHandler(selectedYear.value)
        })
    };

    componentDidMount() {
        fetch('/getYears')
            .then(results=> {
                results.json().then(data => {
                    this.populateYears(data)
                })
            })
            .catch(err => console.error(err))
    }
    populateYears(data) {
        var count = 0;
        for(var i = 0; i < data.length; i++) {
            if(data[i]['YEAR'] >= 2009) {
                yearOptions[count] = {value: data[i]['YEAR'], label: data[i]['YEAR']};
                count++;
            }
        }
    }

    render() {
        const { selectedYear } = this.state;
        return(
        <div className="main">
            <div className="card filterTypeCards dateCard">
                <h4 className="card-header">Date</h4>
                <div className="card-body">
                    <div className="col-12 dateFilters">
                        <label className="col-12 col-form-label">
                            Year
                        </label>
                        <div>
                            <Select 
                            value={selectedYear} 
                            onChange={this.setYear} 
                            options={yearOptions} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default year;

