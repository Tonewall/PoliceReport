import React, { Component } from 'react';
import Chart from "chart.js";
import "./Statistics.css";

class DateStatistics extends Component {
    bothChart = React.createRef();
    counselChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            bothData: [],
            bothDayData: [],
            bothCrimeMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        this.createBothMonths = this.createBothMonths.bind(this);
    }
    componentDidMount() {
        //FETCH Both DATA
        fetch('/getBothCount')
            .then(results => {
                results.json().then(data => {
                this.createBothMonths(data)
            })})
            .catch(err => console.error(err))

    }

    createBothMonths(data) {
        this.setState({ bothData: data });
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
         console.log(this.state.bothCrimeMonthRecord)
        
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


    render() {
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className=" col-lg-12">
                        <div className="card dispatchCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">Data</h5>
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