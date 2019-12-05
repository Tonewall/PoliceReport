import React, { Component } from "react";
import './IncidentNumber.css';

class incidentNumber extends Component {


    handleLoginChange(typed) {
        var link = '/full-report/' + typed;
        document.getElementById("link").setAttribute("href",link)
    }

    render() {
        return(
        <div className="main">
            <div className="card IncidentNumberCard">
                <h2 className="card-header">Search by Incident Number</h2>
                <div className="card-body">
                    <input type="text" className="form-control" onChange={e => this.handleLoginChange(e.target.value)}placeholder="Incident Number"/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="searchButton">
                            <a id="link" href="/full-report/0000000000">
                            <button className="btn btn-primary">
                                Search
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default incidentNumber;