import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData:{
                coulumns: [],
                rows: []
            },
        }
        // this.generateFullReport = this.generateFullReport.bind(this);
    }
    createData() {
            this.setState({crimeData : {
              columns: [
                {
                    label: 'Info',
                    field: 'info',
                    sort: 'asc',
                    width: 50
                },
                {
                  label: 'Type',
                  field: 'type',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'Description',
                  field: 'description',
                  sort: 'asc',
                  width: 300
                },
                {
                  label: 'Location',
                  field: 'location',
                  sort: 'asc',
                  width: 200
                },
                {
                  label: 'Crime Date',
                  field: 'date',
                  sort: 'asc',
                  width: 150
                },
                {
                    label: 'Time',
                    field: 'time',
                    sort: 'asc',
                    width: 100
                }
              ],
              rows: [
                  {
                    info: <MDBBtn outline color="primary" size="sm"
                           >
                            <Link to= {{pathname:"/full-report", query: {crimeData: this.state.crimeData}}}>
                                Info
                            </Link>
                          </MDBBtn>,
                    type: 'Murder',
                    description: 'some description',
                    location: 'CULC',
                    date: '2019/04/25',
                    time: '12:14pm',
                  },
                  {
                    info:  <MDBBtn outline color="primary" size="sm"
                               >
                                <Link to= {{pathname:"/full-report", query: {crimeData: this.state.crimeData}}}>
                                    Info
                                </Link>
                            </MDBBtn>,
                    type: 'Theft',
                    description: 'some description',
                    location: 'Barnes & Nobles',
                    date: '2019/10/02',
                    time: '1:00pm',
                  },
                  {
                    info:  <MDBBtn outline color="primary" size="sm"
                               >
                                <Link to= {{pathname:"/full-report", query: {crimeData: this.state.crimeData}}}>
                                    Info
                                </Link>
                            </MDBBtn>,
                    type: 'Antifa Protest',
                    description: 'some description',
                    location: 'Everywhere',
                    date: '2017/09/18',
                    time: '11:34pm',
                  },
                  {
                    info: <MDBBtn outline color="primary" size="sm"
                           >
                            <Link to= {{pathname:"/full-report", query: {crimeData: this.state.crimeData}}}>
                                Info
                            </Link>
                        </MDBBtn>,
                    type: 'Theft',
                    description: 'some description',
                    location: 'CULC',
                    date: '2019/02/17',
                    time: '11:28am',
                  },
                  {
                    info:  <MDBBtn outline color="primary" size="sm"
                               >
                                <Link to= {{pathname:"/full-report", query: {crimeData: this.state.crimeData}}}>
                                    Info
                                </Link>
                            </MDBBtn>,
                    type: 'Underage Drinking',
                    description: 'some description',
                    location: 'Delta Sig',
                    date: '2019/09/20',
                    time: '7:26pm',
                  },
              ]
            }
        });
    }
    componentDidMount() {
        //FETCH DISPATCH DATA
        // fetch('/api/get-cad-data')
        //     .then(results => results.json())
        //     .then(json => console.log(json));
        // this.getData();

        //FETCH COUNSEL DATA
        // fetch('/api/get-cad-data')
        //     .then(results => results.json());

    }
    // generateFullReport(crimeData) {
    //     if (!crimeData) {
    //         this.setState({
    //           errors: "Search must be run before report can be generated."
    //         });
    //       } else {
    //         fetch(`/api/reports/update-last-report/`, {
    //           method: "POST",
    //           headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //           },
    //           body: JSON.stringify({ reportType: this.state.reportType })
    //         })
    //           .then(response => response.json())
    //           .catch(error => console.log("error fetching data from backend", error));
    //       }
    // }
    getData() {
        fetch('')
            .then(response => response.json())
            .then(response => console.log(response))
            .then(err => console.error(err))
    }

    render() {
        return (
            <div className="main">
                <div className="card">
                    <div className="card-body">
                        <MDBDataTable
                            striped
                            bordered
                            hover
                            entries={20}
                            data={this.state.crimeData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Data;