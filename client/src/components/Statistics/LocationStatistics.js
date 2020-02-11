import React, { Component } from 'react';
import "./Statistics.css";
import { MDBDataTable } from 'mdbreact';




class LocationStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                columns: [
                    {
                        label: "Location Landmark",
                        field: "location",
                        width: 200,
                        sort: 'asc'
                    },
                    {
                        label: "Part I",
                        field: "partI",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Robbery",
                        field: "robbery",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Larceny",
                        field: "larceny",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Bicycle Theft",
                        field: "bicycleTheft",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Assault",
                        field: "assault",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Burglary",
                        field: "burglary",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Arson",
                        field: "arson",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Homicide",
                        field: "homicide",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Sex Offenses",
                        field: "sexOffenses",
                        width: 100,
                        sort: 'asc'
                    },
                    {
                        label: "Motor Vehicle Theft",
                        field: "motor",
                        width: 100,
                        sort: 'asc'
                    },
                ],
                rows: []
            }
        }
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
        console.log(data)
        var row = [];
        for (var i = 0; i < data.length; i++) {
            row[i] = {
                location: data[i]['Building Name'], 
                partI: data[i]['PART I'], 
                robbery: data[i]['Robbery'], 
                larceny: data[i]['Larceny'],
                bicycleTheft: data[i]['Bicycle Theft'], 
                assault: data[i]['Assault'],
                burglary: data[i]['Burglary'],
                arson: data[i]['Arson'],
                homicide: data[i]['Homicide'],
                sexOffenses: data[i]['Sex Offenses'],
                motor: data[i]['Motor Vehicle Theft']
            }
        }
        this.setState({crimeData: {rows: row, columns: this.state.crimeData.columns}})
    }


    



    render() {
        return (
            <div className="regularChartMain">
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