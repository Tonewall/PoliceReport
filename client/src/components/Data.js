import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { incident_datatable_feeds} from "./CommonLibrary.js"
import { Link } from 'react-router-dom';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                coulumns: [],
                rows: []
            }
        }
    }

    
    populateData = function (data) {
        /* Need to preprocess query result before */
        var datatable_feeds = incident_datatable_feeds(data)
        var rows = [];
        for(var i = 0; i < datatable_feeds['rows'].length; i++) {
            var incidentNumber = datatable_feeds['rows'][i]['Incident Number']
            var link = "./full-report/"+incidentNumber
            datatable_feeds['rows'][i]['Incident Number'] = <Link to={link}>{incidentNumber}</Link>
            var row = {
                1: <Link to={link}>{incidentNumber}</Link>,
                Offense: datatable_feeds['rows'][i]['Offense'],
                Department: datatable_feeds['rows'][i]['Department'],
            }
            rows.push(row)
        }
        var columns = [
            {label: "Incident Number", field: "Incident Number", width: 100, sort: 'asc'},
            {label: "Offense", field: "Offense", width: 200, sort: 'asc'},
            {label: "Department", field: "Department", width: 100, sort: 'asc'},
        ]
    //     'Incident Number', 
    // 'Report Date', 
    // 'Time', 
    // 'Offense', 
    // 'Case Status',
    // 'Location',
    // 'Location Landmark', 
    // 'Offender Name', 
    // 'Officer Name', 
    // 'Department', 
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: columns,
                rows: rows
            }
        })
    }
    

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
                <div className="card" style={{marginBottom:30, fontSize: 12}}>
                    <div className="card-body" >
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

export default Data;