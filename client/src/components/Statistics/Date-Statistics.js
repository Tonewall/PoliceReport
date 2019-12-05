import React, { Component } from 'react';
import Chart from "chart.js";
import "./Charts.css";

class DateStatistics extends Component {
    dispatchChart = React.createRef();
    counselChart = React.createRef();
    dispatchHourChart = React.createRef();
    counselHourChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: [],
            dispatchCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchCallHourRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselData: [],
            counselCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselCallHourRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        this.createDispatchMonths = this.createDispatchMonths.bind(this);
        this.createCounselMonths = this.createCounselMonths.bind(this);
        this.createDispatchHours = this.createDispatchHours.bind(this);
        this.createCounselHours = this.createCounselHours.bind(this);
    }
    componentDidMount() {
        //FETCH DISPATCH DATA
        fetch('/api/get-cad-data')
            .then(results => results.json())
            .then(json => this.createDispatchMonths(json));

        //FETCH COUNSEL DATA
        fetch('/api/get-cad-data')
            .then(results => results.json())
            .then(json => this.createCounselMonths(json));

    }

    createDispatchMonths(data) {
        this.setState({ dispatchData: data });

        //increments call count for each month
        for(var i = 0; i < this.state.dispatchData.length; i++) {
            var date = new Date(this.state.dispatchData[i].IncDate);
            var month = date.getMonth();

            var count = this.state.dispatchCallMonthRecord[month];
            count++;
            var prevRecord = [...this.state.dispatchCallMonthRecord];
                prevRecord[month] = count;
                this.setState({dispatchCallMonthRecord: prevRecord});
        }
        this.createDispatchChart();
        this.createDispatchHours();
    }

    createCounselMonths(data) {
        this.setState({ counselData: data });

        //increments call count for each month
        for(var i = 0; i < this.state.counselData.length; i++) {
            var date = new Date(this.state.counselData[i].IncDate);
            var month = date.getMonth();

            var count = this.state.counselCallMonthRecord[month];
            count++;
            var prevRecord = [...this.state.counselCallMonthRecord];
                prevRecord[month] = count;
                this.setState({counselCallMonthRecord: prevRecord});
        }
        this.createCounselChart();
        this.createCounselHours();
    }

    createDispatchHours() {
        // increments call count for each month
        for(var i = 0; i < this.state.dispatchData.length; i++) {
            var time = new Date(this.state.dispatchData[i].IncTime);
            var hour = time.getHours();
            var count = this.state.dispatchCallHourRecord[hour];
            count++;
            var prevRecord = [...this.state.dispatchCallHourRecord];
                prevRecord[hour] = count;
                this.setState({dispatchCallHourRecord: prevRecord});
        }
        this.createDispatchHourChart();
    }

    createCounselHours() {
        // increments call count for each month
        for(var i = 0; i < this.state.counselData.length; i++) {
            var time = new Date(this.state.counselData[i].IncTime);
            var hour = time.getHours();
            var count = this.state.counselCallHourRecord[hour];
            count++;
            var prevRecord = [...this.state.counselCallHourRecord];
                prevRecord[hour] = count;
                this.setState({counselCallHourRecord: prevRecord});
        }
        this.createCounselHourChart();
    }

    



    createDispatchChart() {
         const myDispatchChart = this.dispatchChart.current.getContext("2d");
        
         new Chart(myDispatchChart, {
             type: "bar",
             data: {
                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                 datasets: [
                     {
                        label: 'All Calls',
                        backgroundColor: 'rgba(97, 144, 255,0.5)',
                        borderColor: 'rgba(97, 144, 255,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                        hoverBorderColor: 'rgba(15, 87, 255,1)',
                        data: this.state.dispatchCallMonthRecord
                     }
                 ]
             }
         });
    }

    createCounselChart() {
       const myCounselChart = this.counselChart.current.getContext("2d");
        
       new Chart(myCounselChart, {
           type: "bar",
           data: {
               labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
               datasets: [
                   {
                       label: 'All Calls',
                       backgroundColor: 'rgba(255,99,132,0.2)',
                       borderColor: 'rgba(255,99,132,1)',
                       borderWidth: 1,
                       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                       hoverBorderColor: 'rgba(255,99,132,1)',
                       data: this.state.counselCallMonthRecord
                   }
               ]
           }
       });
   }

   createDispatchHourChart() {
        const myDispatchHourChart = this.dispatchHourChart.current.getContext("2d");
    
        new Chart(myDispatchHourChart, {
            type: "bar",
            data: {
                labels: ['12 am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12 pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                datasets: [
                    {
                        label: 'All Calls',
                        backgroundColor: 'rgba(90, 225, 175,0.5)',
                        borderColor: 'rgba(90, 225, 175,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(63, 165, 128,0.4)',
                        hoverBorderColor: 'rgba(63, 165, 128,1)',
                        data: this.state.dispatchCallHourRecord
                    }
                ]
            }
        });
    }

    createCounselHourChart() {
        const myCounselHourChart = this.counselHourChart.current.getContext("2d");
    
        new Chart(myCounselHourChart, {
            type: "bar",
            data: {
                labels: ['12 am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12 pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                datasets: [
                    {
                        label: 'All Calls',
                        backgroundColor: 'rgba(242, 151, 60,0.5)',
                        borderColor: 'rgba(242, 151, 60,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(196, 124, 51,0.4)',
                        hoverBorderColor: 'rgba(196, 124, 51,1)',
                        data: this.state.counselCallHourRecord
                    }
                ]
            }
        });
    }


    render() {
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card dispatchCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">CAD Monthly</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.dispatchChart}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-6">
                        <div className="card counselCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">Counseling Center Monthly</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.counselChart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card dispatchCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">CAD Hourly</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.dispatchHourChart}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-6">
                        <div className="card counselCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">Counseling Center Hourly</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.counselHourChart}
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