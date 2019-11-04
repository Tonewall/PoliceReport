import React, { Component } from "react";
import './GtpdFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class gtpdFilter extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date()
    };

    handleStartChange = date => {
        this.setState({
          startDate: date
        });
    };
    handleEndChange = date => {
        this.setState({
          endDate: date
        });
    };
    
    render() {
        var inputStyle = {
            marginLeft:18,
            marginTop:2
        }
        return(
        <div className="main filterMain">
            <div className="card filterCard">
                <h2 className="card-header">Filter</h2>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards locationsCard">
                                    <h4 className="card-header">Location/Zones</h4>
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label for="inputStreet" className="col-12 col-form-label">Street</label>
                                                <div className="col-12">
                                                <input type="text" className="form-control" id="inputStreet" placeholder="Street"/>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="barnesAndNobles"></input>
                                                <label className="form-check-label" style={inputStyle} for="barnesAndNobles">
                                                Barnes and Nobles
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="collegeOfComputing"></input>
                                                <label className="form-check-label" style={inputStyle} for="collegeOfComputing">
                                                College of Computing
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="crc"></input>
                                                <label className="form-check-label" style={inputStyle} for="crc">
                                                CRC
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="culc"></input>
                                                <label className="form-check-label" style={inputStyle} for="culc">
                                                CULC
                                                </label>
                                            </div>
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="greekHousing"></input>
                                                <label className="form-check-label" style={inputStyle} for="greekHousing">
                                                Greek Housing
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="klaus"></input>
                                                <label className="form-check-label" style={inputStyle} for="klaus">
                                                Klaus
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="library"></input>
                                                <label className="form-check-label" style={inputStyle} for="library">
                                                Library
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="northAve"></input>
                                                <label className="form-check-label" style={inputStyle} for="northAve">
                                                North Avenue Apartments
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="offCampus"></input>
                                                <label className="form-check-label" style={inputStyle} for="offCampus">
                                                Off Campus
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="stamps"></input>
                                                <label className="form-check-label" style={inputStyle} for="stamps">
                                                Stamps
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="studentCenter"></input>
                                                <label className="form-check-label" style={inputStyle} for="studentCenter">
                                                Student Center
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="vanLeer"></input>
                                                <label className="form-check-label" style={inputStyle} for="vanLeer">
                                                Van Leer
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="westHousing"></input>
                                                <label className="form-check-label" style={inputStyle} for="westHousing">
                                                West Campus Housing
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="zoneOne"></input>
                                                <label className="form-check-label" style={inputStyle} for="zoneOne">
                                                Z1
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="zoneTwo"></input>
                                                <label className="form-check-label" style={inputStyle} for="zoneTwo">
                                                Z2
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="zoneThree"></input>
                                                <label className="form-check-label" style={inputStyle} for="zoneThree">
                                                Z3
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="zoneFour"></input>
                                                <label className="form-check-label" style={inputStyle} for="zoneFour">
                                                Z4
                                                </label>
                                            </div>
                                        </div>
                                    </div>                                
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards typeCard">
                                    <h4 className="card-header">Type</h4>
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="assault"></input>
                                            <label className="form-check-label" style={inputStyle} for="assault">
                                            Assault
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="burglary"></input>
                                            <label className="form-check-label" style={inputStyle} for="burglary">
                                            Burglary
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="larceny"></input>
                                            <label className="form-check-label" style={inputStyle} for="larceny">
                                            Larceny
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="publicDisturbance"></input>
                                            <label className="form-check-label" style={inputStyle} for="publicDisturbance">
                                            Public Disturbance
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="possesionOfDrugs"></input>
                                            <label className="form-check-label" style={inputStyle} for="possesionOfDrugs">
                                            Possession of Drugs
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="robbery"></input>
                                            <label className="form-check-label" style={inputStyle} for="robbery">
                                            Robbery
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="trespassing"></input>
                                            <label className="form-check-label" style={inputStyle} for="trespassing">
                                            Trespassing
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="underageDrinking"></input>
                                            <label className="form-check-label" style={inputStyle} for="underageDrinking">
                                            Underage Drinking
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="otherType"></input>
                                            <label className="form-check-label" style={inputStyle} for="otherType">
                                            Other
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card filterTypeCards shiftCard">
                                    <h4 className="card-header">Shift</h4>
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="shiftA"></input>
                                            <label className="form-check-label" style={inputStyle} for="shiftA">
                                            Shift A
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="shiftB"></input>
                                            <label className="form-check-label" style={inputStyle} for="shiftB">
                                            Shift B
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="shiftC"></input>
                                            <label className="form-check-label" style={inputStyle} for="shiftC">
                                            Shift C
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card filterTypeCards dateCard">
                                    <h4 className="card-header">Date</h4>
                                    <div className="card-body">
                                        <div className="col-12">
                                            <label className="dateLabel">Start Date:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleStartChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="dateLabel">End Date:</label>
                                        </div>
                                        <div className="col-12">
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleEndChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card filterTypeCards arrestCard">
                                    <h4 className="card-header">Arrest</h4>
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="arrestMade"></input>
                                            <label className="form-check-label" style={inputStyle} for="arrestMade">
                                            Arrest Made
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="arrestNotMade"></input>
                                            <label className="form-check-label" style={inputStyle} for="arrestNotMade">
                                            Arrest Not Made
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row searchButton">
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
export default gtpdFilter;