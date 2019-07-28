import React, { Component } from 'react';
import Chart from "chart.js";
import "./CategoryChart.css";

class CategoryCharts extends Component {
    dispatchChart = React.createRef();
    counselChart = React.createRef();
    dispatchDoughnut = React.createRef();
    counselDoughnut = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: [],
            dispatchMonth1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchMonth5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchCategory: [0, 0, 0, 0, 0],
            counselData: [],
            counselMonth1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselMonth5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselCategory: [0, 0, 0, 0, 0]
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
            var type = this.state.dispatchData[i].IncType;
            switch(type) {
                case 514:
                    var count = this.state.dispatchMonth1[month];
                    count++;
                    var prevRecord = [...this.state.dispatchMonth1];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth1: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.dispatchCategory[0];
                    count++;
                    prevRecord = [...this.state.dispatchCategory];
                        prevRecord[0] = count;
                        this.setState({dispatchCategory: prevRecord});
                    break;


                case 574:
                    count = this.state.dispatchMonth2[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth2];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth2: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.dispatchCategory[1];
                    count++;
                    prevRecord = [...this.state.dispatchCategory];
                        prevRecord[1] = count;
                        this.setState({dispatchCategory: prevRecord});
                    break;


                case 505:
                    count = this.state.dispatchMonth3[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth3];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth3: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.dispatchCategory[2];
                    count++;
                    prevRecord = [...this.state.dispatchCategory];
                        prevRecord[2] = count;
                        this.setState({dispatchCategory: prevRecord});
                    break;


                case 578:
                    count = this.state.dispatchMonth4[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth4];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth4: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.dispatchCategory[3];
                    count++;
                    prevRecord = [...this.state.dispatchCategory];
                        prevRecord[3] = count;
                        this.setState({dispatchCategory: prevRecord});
                    break;


                default:
                    count = this.state.dispatchMonth5[month];
                    count++;
                    prevRecord = [...this.state.dispatchMonth5];
                        prevRecord[month] = count;
                        this.setState({dispatchMonth5: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.dispatchCategory[4];
                    count++;
                    prevRecord = [...this.state.dispatchCategory];
                        prevRecord[4] = count;
                        this.setState({dispatchCategory: prevRecord});
                    break;
                
            }
        }
        this.createDispatchChart();
        this.createDispatchDougnut();
    }

    createCounselMonths(data) {
        this.setState({ counselData: data });

        //increments call count for each month
        for(var i = 0; i < this.state.counselData.length; i++) {
            var date = new Date(this.state.counselData[i].IncDate);
            var month = date.getMonth();
            var type = this.state.counselData[i].IncType;
            switch(type) {
                case 514:
                    var count = this.state.counselMonth1[month];
                    count++;
                    var prevRecord = [...this.state.counselMonth1];
                        prevRecord[month] = count;
                        this.setState({counselMonth1: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.counselCategory[0];
                    count++;
                    prevRecord = [...this.state.counselCategory];
                        prevRecord[0] = count;
                        this.setState({counselCategory: prevRecord});
                    break;

                case 574:
                    count = this.state.counselMonth2[month];
                    count++;
                    prevRecord = [...this.state.counselMonth2];
                        prevRecord[month] = count;
                        this.setState({counselMonth2: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.counselCategory[1];
                    count++;
                    prevRecord = [...this.state.counselCategory];
                        prevRecord[1] = count;
                        this.setState({counselCategory: prevRecord});
                    break;

                case 505:
                    count = this.state.counselMonth3[month];
                    count++;
                    prevRecord = [...this.state.counselMonth3];
                        prevRecord[month] = count;
                        this.setState({counselMonth3: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.counselCategory[2];
                    count++;
                    prevRecord = [...this.state.counselCategory];
                        prevRecord[2] = count;
                        this.setState({counselCategory: prevRecord});
                    break;

                case 578:
                    count = this.state.counselMonth4[month];
                    count++;
                    prevRecord = [...this.state.counselMonth4];
                        prevRecord[month] = count;
                        this.setState({counselMonth4: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.counselCategory[3];
                    count++;
                    prevRecord = [...this.state.counselCategory];
                        prevRecord[3] = count;
                        this.setState({counselCategory: prevRecord});
                    break;

                default:
                    count = this.state.counselMonth5[month];
                    count++;
                    prevRecord = [...this.state.counselMonth5];
                        prevRecord[month] = count;
                        this.setState({counselMonth5: prevRecord});

                    //Increment Category for Doughnut Graph
                    count = this.state.counselCategory[4];
                    count++;
                    prevRecord = [...this.state.counselCategory];
                        prevRecord[4] = count;
                        this.setState({counselCategory: prevRecord});
            }
      }
        this.createCounselChart();
        this.createCounselDougnut();
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
           }
       });
   }

   createDispatchDougnut() {
    const myDispatchDoughnut = this.dispatchDoughnut.current.getContext("2d");
     
        new Chart(myDispatchDoughnut, {
            type: "doughnut",
            data: {
                datasets: [{
                    data: this.state.dispatchCategory,
                    backgroundColor: [
                        "rgba(15, 87, 255, 0.5)",
                        "rgba(204, 102, 0, 0.5)",
                        "rgba(0, 170, 01, 0.5)",
                        "rgba(204, 0, 0, 0.5)",
                        "rgba(64, 64, 64, 0.5)"
                      ],
                      borderColor: [
                        "#rgba(15, 87, 255, 1)",
                        "rgba(204, 102, 0, 1)",
                        "rgba(0, 170, 0, 1)",
                        "rgba(204, 0, 0, 1)",
                        "rgba(64, 64, 64, 1)"
                      ],
                      borderWidth: [1, 1, 1, 1, 1]
                }],
                labels: [
                    'Safety Escort-Transport',
                    'Welfare Check',
                    'Suicide of Attempt',
                    'Counseling Center Transfers',
                    'Other',
                ],
                
            }
        });
    }

   createCounselDougnut() {
    const myCounselDoughnut = this.counselDoughnut.current.getContext("2d");
     
        new Chart(myCounselDoughnut, {
            type: "doughnut",
            data: {
                datasets: [{
                    data: this.state.counselCategory,
                    backgroundColor: [
                        "rgba(15, 87, 255, 0.5)",
                        "rgba(204, 102, 0, 0.5)",
                        "rgba(0, 170, 01, 0.5)",
                        "rgba(204, 0, 0, 0.5)",
                        "rgba(64, 64, 64, 0.5)"
                      ],
                      borderColor: [
                        "#rgba(15, 87, 255, 1)",
                        "rgba(204, 102, 0, 1)",
                        "rgba(0, 170, 0, 1)",
                        "rgba(204, 0, 0, 1)",
                        "rgba(64, 64, 64, 1)"
                      ],
                      borderWidth: [1, 1, 1, 1, 1]
                }],
                labels: [
                    'Category 1',
                    'Category 2',
                    'Category 3',
                    'Category 4',
                    'Other',
                ],
                
            }
        });
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className=" col-lg-8">
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
                    <div className=" col-lg-4">
                        <div className="card dispatchCategory shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">CAD Categories</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.dispatchDoughnut}
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-lg-8">
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
                    <div className=" col-lg-4">
                        <div className="card counselCategory shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">Counseling Center Categories</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.counselDoughnut}
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