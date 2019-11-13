import React, { Component } from "react";
import './IncidentNumber.css';

class incidentNumber extends Component {

    render() {
        return(
        <div className="main">
            <div className="card IncidentNumberCard">
                <h2 className="card-header">Search by Incident Number</h2>
                <div className="card-body">
                    <input type="text" className="form-control" id="inputIncidentNumber" placeholder="Incident Number"/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="searchButton">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default incidentNumber;