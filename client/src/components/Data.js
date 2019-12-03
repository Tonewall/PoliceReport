import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
// import { Link } from 'react-router-dom';
var incident_keys = [
    'OCA Number', 
    'Report Date', 
    'Offense', 
    'NIBRSOffense', 
    'SRSOffense', 
    'Case Status', 
    'Case Disposition', 
    'VClear', 
    'Video', 
    'Premises', 
    'UCInc+', 
    'Arson', 
    'GT', 
    'GTstatus', 
    'GTtype', 
    'PType', 
    'Location Code', 
    'LType', 
    'Location Landmark', 
    'Address', 
    'St Num', 
    'Street', 
    'Street Name', 
    'Quad', 
    'Intersection', 
    'Int', 
    'Apt-Rm-Ste', 
    'In-Out', 
    'MO', 
    'Patrol Zone', 
    'CC Zone', 
    'From Date', 
    'From Time', 
    'To Date', 
    'To Time', 
    'DTEdit', 
    '8399', 
    'Offenses', 
    'Entered Autos', 
    'Officer Name', 
    'Unit', 
    'Attempt-Complete', 
    'Adult-Juvenile', 
    'CSR', 
    'Clery', 
    'Clery2', 
    'Clery+', 
    'CSArr', 
    'CSRef', 
    'CSDVS', 
    'CSA', 
    'Alert Num', 
    'APDClery', 
    'Offn From', 
    'Disp From', 
    'Location Code From', 
    'UCR Changed', 
    'Clear Date', 
    'Weapon', 
    'Weapon-NIBRS', 
    'Premise Type', 
    'Stranger', 
    'Theft Location', 
    'Recovery Location', 
    'Related OCA', 
    'Shot', 
    'Carjack', 
    'Alcohol', 
    'Drug', 
    'Gang', 
    'Void', 
    'Juv Arr', 
    'Copy', 
    'Greek source', 
    'FIT', 
    'FV', 
    'EMS', 
    'Suicide', 
    '1013', 
    'Injured', 
    'ArrAdd', 
    'RO', 
    'K9', 
    'Longitude', 
    'Latitude', 
    'Exceptional Clearance', 
    'Method of Entry'
]

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

    populateData = function (data) {
        /* Need to preprocess query result before */
        data.forEach(element => {
            Object.keys(element).forEach(key => {
                if(element[key] == null)    element[key]='-'
                else if(element[key] === true) element[key]='true'
                else if(element[key] === false)    element[key]='false'
            });
        });
        var incident_columns = new Array(incident_keys.length)
        for(var i=0;i<incident_keys.length;i++)
        {
            incident_columns[i] = {label: incident_keys[i], field: incident_keys[i], width: 200}
        }
        var incident_rows = new Array(data.length)
        for(i=0;i<incident_rows.length;i++)
        {
            let temp_arr = new Array(incident_columns.length)
            let aliased_i = i   // avoid racing
            let j=0
            incident_columns.forEach((key)=>
                {
                    temp_arr[j] = data[aliased_i][key['field']]
                    j+=1
                })
            incident_rows[i] = temp_arr
        }
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: incident_columns,
                rows: incident_rows
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
                            maxHeight='70vh'
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