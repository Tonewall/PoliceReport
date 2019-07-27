import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import "./Charts.css";
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
class Chart extends Component {

    componentDidMount() {
        console.log("inside chart.js");
        fetch('/api/get-cad-data')
            .then(results => results.text())
            .then(text => console.log(text));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card dispatchCard">
                            <div className="card-body">
                                <h5 class="card-title">Dispatch</h5>
                                <HorizontalBar data={data} />
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-6">
                        <div className="card counselCard">
                            <div className="card-body">
                                <h5 class="card-title">Counsel</h5>
                                <HorizontalBar data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chart;