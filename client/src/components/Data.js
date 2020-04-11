import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
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

        var rows = [];
        var columns = [
            {value: 'Incident Number', field:'Incident Number', label: 'Incident Number', width: 100},
            {value: 'Offense', field:'Offense', label: 'Offense', width: 200},
            {value: 'Location', field:'Location', label: 'Location', width: 250},
            {value: 'Location Landmark', field:'Location Landmark', label: 'Landmark', width: 200},
            {value: 'From', field:'From', label: 'From Date/Time', width: 100},
            {value: 'To', field:'To', label: 'To Date/Time', width: 100},
            {value: 'Average Day', field:'Average Day', label: 'Avg Day', width: 100},
            {value: 'Average Time', field:'Average Time', label: 'Avg Time', width: 100},
            {value: 'Occurred Shift', field:'Occurred Shift', label: 'Occurred Shift', width: 100},
            {value: 'Case Status', field:'Case Status', label: 'Status', width: 50},
            {value: 'Department', field:'Department', label: 'Dept', width: 50},
        ]

        //for every incident, populate a blank row with the column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var incidentNumber = data[i]['Incident Number']
            var link = "./full-report/"+incidentNumber
            row['Incident Number'] = <Link to={link}>{incidentNumber}</Link>
            
            for(var j = 1; j < columns.length; j++) {
                if(data[i][columns[j].value] == null){ 
                    row[columns[j].value] = '-'
                } else {
                    row[columns[j].value] = data[i][columns[j].value].toString()
                }
            }
            rows.push(row)
        }

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