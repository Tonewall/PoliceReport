import React, { Component } from "react";
import './FullReport.css';

class fullReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crimeData: []
        }
        try {
            this.state = {
                crimeData: this.props.location.query.crimeData
            }
        }
        catch(e) {
            console.error(e)
        }
    }

    getReport() {
        if (this.state.crimeData.length === 0 || this.state.crimeData === undefined) {
          return (
            <div className="errorMessage">
              No Report Selected, Please Return Back to the Home Page
            </div>
          );
        } else {
            console.log(this.state.crimeData);
        }
        
    }
    render() {
        return(
        <div className="main">
            <div className="card fullReportCard">
            <h2 className="card-header">Full Report</h2>
                <div className="card-body">
                    <div className="fullReportInfo">
                        {this.getReport()}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default fullReport;