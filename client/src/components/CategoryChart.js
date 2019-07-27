import React, { Component } from 'react';
import Chart from "chart.js";
import "./CategoryChart.css";

class CategoryCharts extends Component {
    dispatchChart = React.createRef();
    counselChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: [],
            dispatchMonth1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselData: [],
            counselMonth1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        this.createDispatchMonths = this.createDispatchMonths.bind(this);
        this.createCounselMonths = this.createCounselMonths.bind(this);
    }
    componentDidMount() {
        console.log("inside chart.js");

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
            var type = this.state.dispatchData[i].IncType;
            var recordType;
            switch(type) {
                case 514:
                    var count = this.state.dispatchMonth1[month];
                    count++;
                    var prevRecord = [...this.state.dispatchMonth1];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth1: prevRecord});
                    break;
                case 574:
                    count = this.state.dispatchMonth2[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth2];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth2: prevRecord});
                    break;
                case 505:
                    count = this.state.dispatchMonth3[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth3];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth3: prevRecord});
                    break;
                case 578:
                    count = this.state.dispatchMonth4[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth4];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth4: prevRecord});
                    break;
                default:
                    count = this.state.dispatchMonth5[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth5];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth5: prevRecord});
                
            }

            

        }
        this.createDispatchChart();
       

    }

    createCounselMonths(data) {
        this.setState({ counselData: data });

        //increments call count for each month
        for(var i = 0; i < this.state.counselData.length; i++) {
            var date = new Date(this.state.counselData[i].IncDate);
            var month = date.getMonth();
            var type = this.state.counselData[i].IncType;
            var recordType;
            switch(type) {
                case 514:
                    var count = this.state.counselMonth1[month];
                    count++;
                    var prevRecord = [...this.state.counselMonth1];
                        prevRecord[month] = count;
                        this.setState({counselMonth1: prevRecord});
                    break;
                case 574:
                    count = this.state.counselMonth2[month];
                    count++;
                    prevRecord = [...this.state.counselMonth2];
                        prevRecord[month] = count;
                        this.setState({counselMonth2: prevRecord});
                    break;
                case 505:
                    count = this.state.counselMonth3[month];
                    count++;
                    prevRecord = [...this.state.counselMonth3];
                        prevRecord[month] = count;
                        this.setState({counselMonth3: prevRecord});
                    break;
                case 578:
                    count = this.state.counselMonth4[month];
                    count++;
                    prevRecord = [...this.state.counselMonth4];
                        prevRecord[month] = count;
                        this.setState({counselMonth4: prevRecord});
                    break;
                default:
                    count = this.state.counselMonth5[month];
                    count++;
                    prevRecord = [...this.state.counselMonth5];
                        prevRecord[month] = count;
                        this.setState({counselMonth5: prevRecord});
                
            }

            

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
                         label: 'Safety Escort-Transport',
                         backgroundColor: 'rgba(97, 144, 255, 0.5)',
                         borderColor: 'rgba(97, 144, 255,1)',
                         borderWidth: 2,
                         hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                         hoverBorderColor: 'rgba(15, 87, 255,1)',
                         data: this.state.dispatchMonth1
                     },
                     {
                        label: 'Welfare Check',
                        backgroundColor: 'rgba(255, 153, 51, 0.5)',
                        borderColor: 'rgba(255, 153, 51, 1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(204, 102, 0, 0.4)',
                        hoverBorderColor: 'rgba(204, 102, 0, 1)',
                        data: this.state.dispatchMonth2
                    },
                    {
                        label: 'Suicide or Attempt',
                        backgroundColor: 'rgba(51, 255, 51, 0.5)',
                        borderColor: 'rgba(51, 255, 51,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(0, 170, 0,0.4)',
                        hoverBorderColor: 'rgba(0, 170, 0,1)',
                        data: this.state.dispatchMonth3
                    },
                    {
                        label: 'Counseling Center Transfers',
                        backgroundColor: 'rgba(255, 51, 51, 0.5)',
                        borderColor: 'rgba(255, 51, 51,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(204, 0, 0,0.4)',
                        hoverBorderColor: 'rgba(204, 0, 0,1)',
                        data: this.state.dispatchMonth4
                    },
                    {
                        label: 'Other',
                        backgroundColor: 'rgba(160, 160, 160, 0.5)',
                        borderColor: 'rgba(160, 160, 160,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(64, 64, 64,0.4)',
                        hoverBorderColor: 'rgba(64, 64, 64,1)',
                        data: this.state.dispatchMonth5
                    }
                 ]
             },
             options: {
                 //Customize chart options
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
                    label: 'Category 1',
                    backgroundColor: 'rgba(97, 144, 255, 0.5)',
                    borderColor: 'rgba(97, 144, 255,1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                    hoverBorderColor: 'rgba(15, 87, 255,1)',
                    data: this.state.counselMonth1
                },
                {
                   label: 'Category 2',
                   backgroundColor: 'rgba(255, 153, 51, 0.5)',
                   borderColor: 'rgba(255, 153, 51, 1)',
                   borderWidth: 2,
                   hoverBackgroundColor: 'rgba(204, 102, 0, 0.4)',
                   hoverBorderColor: 'rgba(204, 102, 0, 1)',
                   data: this.state.counselMonth2
               },
               {
                   label: 'Category 3',
                   backgroundColor: 'rgba(51, 255, 51, 0.5)',
                   borderColor: 'rgba(51, 255, 51,1)',
                   borderWidth: 2,
                   hoverBackgroundColor: 'rgba(0, 170, 0,0.4)',
                   hoverBorderColor: 'rgba(0, 170, 0,1)',
                   data: this.state.counselMonth3
               },
               {
                   label: 'Category 4',
                   backgroundColor: 'rgba(255, 51, 51, 0.5)',
                   borderColor: 'rgba(255, 51, 51,1)',
                   borderWidth: 2,
                   hoverBackgroundColor: 'rgba(204, 0, 0,0.4)',
                   hoverBorderColor: 'rgba(204, 0, 0,1)',
                   data: this.state.counselMonth4
               },
               {
                   label: 'Other',
                   backgroundColor: 'rgba(160, 160, 160, 0.5)',
                   borderColor: 'rgba(160, 160, 160,1)',
                   borderWidth: 2,
                   hoverBackgroundColor: 'rgba(64, 64, 64,0.4)',
                   hoverBorderColor: 'rgba(64, 64, 64,1)',
                   data: this.state.counselMonth5
               }
            ]
           },
           options: {
               //Customize chart options
           }
       });
   }


    render() {
        return (
            <div>
                <div className="row">
                    <div className=" col-12">
                        <div className="card dispatchCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">Dispatch</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.dispatchChart}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" col-12">
                        <div className="card counselCard shadow p-3 mb-5 bg-white rounded">
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

export default CategoryCharts;