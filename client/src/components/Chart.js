import React, { Component } from 'react';
import Chart from "chart.js";
import "./Charts.css";

class Charts extends Component {
    dispatchChart = React.createRef();
    counselChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: [],
            dispatchCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselData: [],
            counselCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        this.createDispatchMonths = this.createDispatchMonths.bind(this);
        this.createCounselMonths = this.createCounselMonths.bind(this);
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


    render() {
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card dispatchCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">CAD</h5>
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
                                <h5 className="card-title">Counseling Center</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.counselChart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts;