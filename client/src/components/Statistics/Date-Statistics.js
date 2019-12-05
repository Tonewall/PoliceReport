import React, { Component } from 'react';
import Chart from "chart.js";
import "./Statistics.css";
import Select from "react-select";


const yearOptions = [];


class DateStatistics extends Component {
    bothChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            bothData: [],
            bothDayData: [],
            bothCrimeMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            selectedYear: null,
        }
        this.createBothMonths = this.createBothMonths.bind(this);
    };
    setYear = selectedYear => {
        var year = selectedYear.value;
        window.location.replace('/Statistics-Date/'+year)
        // this.setState({selectedYear});
        // this.getBothCount(year)
    };
    componentDidMount() {
        var {year} = this.props.match.params;
        // var date = new Date()
        // var year = date.getUTCFullYear();
        this.getBothCount(year);
        this.setState({selectedYear: {value: year, label: year}})
        
        fetch('/getYears')
            .then(results=> {
                results.json().then(data => {
                    this.populateYears(data)
                })
            })
            .catch(err => console.error(err))

    }

    getBothCount(year) {
        fetch('/getBothCount/'+year)
            .then(results => {
                results.json().then(data => {
                    this.createBothMonths(data)
                })})
            .catch(err => console.error(err))
    }

    createBothMonths(data) {
        this.setState({ bothData: data });
        this.setState({bothCrimeMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
        //increments Crime count for each month
        for(var i = 0; i < this.state.bothData.length; i++) {
            var date = new Date(this.state.bothData[i]['Report Date']);
            var month = date.getMonth();
            var count = this.state.bothCrimeMonthRecord[month];
            count++;
            var prevRecord = [...this.state.bothCrimeMonthRecord];
                prevRecord[month] = count;
                this.setState({bothCrimeMonthRecord: prevRecord});
        }
        this.createbothChart();
    }


    createbothChart() {
        
         const mybothChart = this.bothChart.current.getContext("2d");
         
        
         new Chart(mybothChart, {
             type: "bar",
             data: {
                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                 datasets: [
                     {
                        label: 'All Crime',
                        backgroundColor: 'rgba(97, 144, 255,0.5)',
                        borderColor: 'rgba(97, 144, 255,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                        hoverBorderColor: 'rgba(15, 87, 255,1)',
                        data: this.state.bothCrimeMonthRecord
                     }
                 ]
             }
         });
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
        const {selectedYear} = this.state;
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className=" col-lg-12">
                        <div className="card yearCard shadow p-3 mb-5 bg-white rounded">
                            <label className="col-12 col-form-label">
                                Select Year
                            </label>
                            <div>
                                <Select 
                                value={selectedYear} 
                                onChange={this.setYear} 
                                options={yearOptions} 
                                />
                            </div>
                        </div>
                        <div className="card dataCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                            <h5 className="card-title">{selectedYear && selectedYear.value}</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.bothChart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateStatistics;