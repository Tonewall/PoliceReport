import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { incident_datatable_feeds } from './CommonLibrary.js'
import { Link } from 'react-router-dom';

class FilterResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                coulumns: [],
                rows: []
            },
        }
    }

    populateData = function (data) {
        /* Need to preprocess query result before */
        var datatable_feeds = incident_datatable_feeds(data)
        for(var i = 0; i < datatable_feeds['rows'].length; i++) {
            var incidentNumber = datatable_feeds['rows'][i]['Incident Number']
            var link = "./full-report/"+incidentNumber
            datatable_feeds['rows'][i]['Incident Number'] = <Link to={link}>{incidentNumber}</Link>
        }
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: datatable_feeds['columns'],
                rows: datatable_feeds['rows']
            }
        });
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/filter',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(this.state)
                }
            )
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
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

export default FilterResult;