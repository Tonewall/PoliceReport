import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                coulumns: [],
                rows: []
            },
        }
        //this.createData = this.createData.bind(this);
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
                  width: 100
                },
                {
                  label: 'Description',
                  field: 'description',
                  sort: 'asc',
                  width: 400
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
    

    populateData = function (data) {
        this.setState({
            crimeData: {
                columns: [
                    {
                        label: 'CaseId',
                        field: 'CaseId',
                        sort: 'asc',
                        width: 50
                    },
                    {
                        label: 'Date',
                        field: 'Date',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Time',
                        field: 'Time',
                        sort: 'asc',
                        width: 400
                    },
                    {
                        label: 'Location',
                        field: 'location',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Officer',
                        field: 'Officer',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'Description',
                        field: 'Description',
                        sort: 'asc',
                        width: 100
                    }
                ],
                rows: data
            }
        }
        )
    }

    componentDidMount() {
        this.getData();
        //FETCH DISPATCH DATA
        // fetch('/api/get-cad-data')
        //     .then(results => results.json())
        //     .then(json => console.log(json));

    }
    getData() {
        fetch('/showall')
            .then(results => results.json().then(data => {
                console.log(data)
                //this.populateData(data)
            }))
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