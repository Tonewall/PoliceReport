import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { incident_datatable_feeds } from './CommonLibrary.js'
// import { Link } from 'react-router-dom';

class FilterResult extends Component {

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

    populateData = function (data) {
        /* Need to preprocess query result before */
        var datatable_feeds = incident_datatable_feeds(data)
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: datatable_feeds['columns'],
                rows: datatable_feeds['rows']
            }
        });
    }

    /*
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
                        field: 'Location',
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
    */

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/showall')
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
    }


    render() {
        return (
            <div className="main">
                <div className="card">
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            scrollY
                            striped
                            bordered
                            hover
                            maxHeight='66vh'
                            entries={20}
                            data={this.state.crimeData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterResult;