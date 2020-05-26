import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

class FilterResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                coulumns: [],
                rows: []
            },
            selectedColumns: [
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
        }
    }

    populateData = function (data) {
        

        //retrieve the selected columns from filter page
        var selectedColumns = this.state.selectedColumns
        //add incident number to the columns
        selectedColumns.unshift({value: 'Incident Number', field:'Incident Number', label: 'Incident Number', width: 100})
        var rows = [];

        //for every incident, populate a blank row with the selected column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var incidentNumber = data[i]['Incident Number']
            var link = "/full-report/"+incidentNumber
            row['Incident Number'] = <Link to={link}>{incidentNumber}</Link>
            
            for(var j = 1; j < selectedColumns.length; j++) {
                if(data[i][selectedColumns[j].value] == null){ 
                    row[selectedColumns[j].value] = '-'
                } else {
                    row[selectedColumns[j].value] = data[i][selectedColumns[j].value].toString()
                }
            }
            rows.push(row)
        }
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: selectedColumns,
                rows: rows
            }
        });
    }

    componentDidMount() {
        var {personID} = this.props.match.params;
        this.setState({personID}, function(){this.getName()})
        
    }

    getName() {
        fetch('/get-name',
            {
                headers:{'Content-Type' : 'application/json'},
                method: 'post',
                body: JSON.stringify(this.state)
            }
            )

            .then(results => {
                results.json().then(data => {
                    this.setState({typedName: data[0]['FirstName'] +' '+ data[0]['LastName']},
                    function() {this.getData()})
                })
            })
            .catch(err => console.error(err))
    }

    getData() {
        fetch('/filter-repeat-offender',
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
                    <div className="card-body" style={{marginBottom:30, fontSize: 12}}>
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