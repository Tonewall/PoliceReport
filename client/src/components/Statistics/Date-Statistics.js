import React, { Component } from 'react';
import Chart from "chart.js";
import "./Statistics.css";



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
    componentDidMount() {
        if(this.props.data) {
            var year = this.props.data.selectedYear;
            if (year === null) {
                var date = new Date();
                year = date.getFullYear();
            }
            this.getBothCount(year);
        }
       
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
        var monthArray=[];
        this.setState({ bothData: data });
        for(var i = 0; i < data.length; i++) {
            monthArray[i] = data[i]['COUNT'];
        }
        this.setState({bothCrimeMonthRecord: monthArray})
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
                        label: 'Incidents',
                        backgroundColor: 'rgba(97, 144, 255,0.5)',
                        borderColor: 'rgba(97, 144, 255,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                        hoverBorderColor: 'rgba(15, 87, 255,1)',
                        data: this.state.bothCrimeMonthRecord
                     }
                 ]
             },
             options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
         });
    }



    render() {
        const {selectedYear} = this.state;
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className=" col-lg-12">
                        <div className="card dataCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                            <h5 className="card-title">Incidents by Months for {selectedYear && selectedYear.value}</h5>
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