import React, { Component } from 'react';
import "./Statistics.css";
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';




class LocationStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                columns: [
                    {
                        label: 'Bldg #', 
                        field: 'Max Bldg #', 
                        width: 50, 
                        sort: 'asc'
                    },
                    {
                        label: "Location Landmark",
                        field: "Building Name",
                        width: 300,
                        sort: 'asc'
                    },
                    {
                        label: "Part I",
                        field: "PART I",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Robbery",
                        field: "Robbery",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Larceny",
                        field: "Larceny",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Bicycle Theft",
                        field: "Bicycle Theft",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Assault",
                        field: "Assault",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Burglary",
                        field: "Burglary",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Arson",
                        field: "Arson",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Homicide",
                        field: "Homicide",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Sex Offenses",
                        field: "Sex Offenses",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Motor Vehicle Theft",
                        field: "Motor Vehicle Theft",
                        width: 100,
                        sort: 'asc'
                    },
                ],
                rows: []
            }
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.getLocationRanking();
        }
       
    }

    getLocationRanking() {
        fetch('/getLocationRanking',
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
                this.populate(data)
            })})
            .catch(err => console.error(err))
    }


    populate(data) {
        var rows = [];

        //for every incident, populate a blank row with the selected column data
        for(var i = 0; i < data.length; i++) {
            var row = {}
            var bld = data[i]['Max Bldg #']
            row['Max Bldg #'] = <div style={{color:'blue', cursor:'pointer'}}  ><u  onClick={this.onClick} data-name={bld}>{bld}</u></div>
            row['Building Name'] = data[i]['Building Name']
            
            for(var j = 2; j < this.state.crimeData.columns.length; j++) {
                if(data[i][this.state.crimeData.columns[j].field] == null){ 
                    row[this.state.crimeData.columns[j].field] = '-'
                } else {
                    row[this.state.crimeData.columns[j].field] = data[i][this.state.crimeData.columns[j].field].toString()
                }
            }
            rows.push(row)
        }
        this.setState({
            no_history: false,
            wrong_query: false,
            crimeData: {
                columns: this.state.crimeData.columns,
                rows: rows
            }
        });
    }


    onClick(event) {
        this.setState({buildingNum: event.target.dataset.name},
            function() {
                this.setState({redirected: true})
            });
    }

    onCLick(event) {
        this.setState({buildingNum: event.target.dataset.name},
            function() {
                this.setState({redirected:true})
            });
    }



    render() {
        return (
            <div className="regularChartMain">
                {this.state.redirected ? <Redirect to={{pathname: '/Building-Result/'+this.state.buildingNum}}/> : null}
               <div className="card locationStatsCard">
                    <h2 className="card-header">Campus Locations with Part I Crimes ({this.props.location.state.startDate!=null && this.props.location.state.startDate.toLocaleDateString()} - {this.props.location.state.endDate!=null && this.props.location.state.endDate.toLocaleDateString()})</h2>
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

export default LocationStatistics;