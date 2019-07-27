import React, { Component } from 'react';
import Chart from "chart.js";
import "./Charts.css";

class Charts extends Component {
    dispatchChart = React.createRef();
    counselChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: []
        }
        this.getDispatchData = this.getDispatchData.bind(this);
    }
    
    componentDidMount() {
        console.log("inside chart.js");
        fetch('/api/get-cad-data')
            .then(results => results.json())
            .then(json => this.getDispatchData(json));

        //DISPATCH CHART
        const myDispatchChart = this.dispatchChart.current.getContext("2d");
        
        new Chart(myDispatchChart, {
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
                        data: [65, 59, 80, 81, 56, 55, 40, 44, 32, 90, 72, 13, 3, 69]
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });


        //COUNSEL CHART
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
                        data: [23, 78, 45, 86, 21, 44, 77, 120, 44, 66, 99, 35, 59, 42]
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }

    getDispatchData(data) {
        this.setState({ dispatchData: data });
        console.log(this.state.dispatchData);
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card dispatchCard">
                            <div className="card-body">
                                <h5 className="card-title">Dispatch</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.dispatchChart}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-6">
                        <div className="card counselCard">
                            <div className="card-body">
                                <h5 className="card-title">Counsel</h5>
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