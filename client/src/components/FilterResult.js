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
        }
    }

    populateData = function (data) {
        //retrieve the selected columns from filter page
        var selectedColumns = this.props.location.state.selectedColumns
        //add incident number to the columns
        selectedColumns.unshift({value: 'Incident Number', field:'Incident Number', label: 'Incident Number', width: 100})
        var rows = [];

        //for every incident, populate a blank row with the selected column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var incidentNumber = data[i]['Incident Number']
            var link = "./full-report/"+incidentNumber
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
        var temp = new Date()
        temp = this.props.location.state.startDate
        temp.setMinutes(temp.getMinutes() - 240)
        this.props.location.state.startDate = temp
        temp = this.props.location.state.endDate
        temp.setMinutes(temp.getMinutes() - 240)
        this.props.location.state.endDate = temp
        this.getData();
    }

    getData() {
        fetch('/filter',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(this.props.location.state)
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