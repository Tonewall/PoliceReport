import React, { Component } from 'react';
import "./Statistics.css";



class LocationStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crimeData: {
                coulumns: [],
                rows: []
            }
        }
    }

    componentDidMount() {
        if(this.props.location.state) {
            console.log(this.props.location.state)
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
        var column = [];
        var row = [];
        for(var i = 0; i < data.length; i++) {
            row[i] = data[i];
            //link to the results page with all of part I crimes for that location
        }
        this.setState({
            crimeData: {
                columns: column,
                rows: row
            }
        })
    }


    



    render() {
        return (
            <div className="regularChartMain">
               
            </div>
        );
    }
}

export default LocationStatistics;