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
        this.populateYears()
    }
    populateYears(data) {
        var date = new Date();
        var currentYear = date.getFullYear();
        var count = 0;
        for(var i = currentYear; i >= 2009; i--) {
            yearOptions[count] = {value: i, label: i};
            count++;
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
                        <label className="col-12 col-form-label" style={{fontSize: 13}}>
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

