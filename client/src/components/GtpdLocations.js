import React, { Component } from "react";
import './GtpdLocations.css';


class gtpdLocations extends Component {


    
    render() {
        var inputStyle = {
            marginLeft:18,
            marginTop:2
        }
        return(
        <div className="main">
            <div className="card filterCard">
            <h2 className="card-header">Filter</h2>
                <div className="card-body">
                <form>
                    <div className="row">
                    <div className="col-6">

                    <div className="card locationsCard">
                        <h2 className="card-header">Location</h2>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label for="inputStreet" className="col-sm-2 col-form-label">Street</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputStreet" placeholder="Street"/>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    Student Center
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    Klaus
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    CULC
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    Barnes and Nobles
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    CRC
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    Stamps
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    Van Leer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                                    <label className="form-check-label" style={inputStyle} for="gridCheck1">
                                    College of Computing
                                    </label>
                                </div>
                            </div>
                        </div>
                    
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default gtpdLocations;