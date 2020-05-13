import React, {Component} from "react";
import "./NavBar.css";


export default class NavBar extends Component {

  render() {
      var style = {
          fontSize: 25
      }
      var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    "White": "#fafdff",
    };
    return (
        <nav className="navbar shadow p-1 mb-5 navbar-expand navbar-light bg-light" id="navBarMain">
            <a className="navbar-brand" href="/"><div style={style}>GTPD Crime Analytics</div></a>        
            <div className="navBarLinks">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Records
                        </a>
                        <div className="dropdown-menu" style={{backgroundColor:bgColors.White}} aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/">All Data</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/GTPD-Filter">Filter</a>
                            <a className="dropdown-item" href="/GTPD-Incident-Search">Search by Incident Number</a>
                            <a className="dropdown-item" href="/Repeat-Offenders">Repeat Offenders</a>
                            <a className="dropdown-item" href="/Building-Information">Buildings Information</a>
                            <a className="dropdown-item" href="/Officers">Officers</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Statistics
                        </a>
                        <div className="dropdown-menu"aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/Date-Time-Filter">Date/Time</a>
                            <a className="dropdown-item" href="/Location-Stats-Filter">Location Ranking</a>
                        </div>
                        {/* <a className="nav-link" href="/Date-Time-Filter">Statistics</a> */}
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Statistics
                        </a>
                        <div className="dropdown-menu" style={{backgroundColor:bgColors.White}} aria-labelledby="navbarDropdown">
                            <a className="dropdown-item disabled" href="/">GTPD</a>
                            <a className="dropdown-item" href="/Location-Shift-Filter">By Location/Shift</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item disabled" href="/">All</a>
                            <a className="dropdown-item" href="/Date-Time-Filter">By Date/Time</a>
                        </div>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/submit">Submit Record</a>
                    </li> */}
                </ul>
            </div>
        </nav>
  
    );
  }
  
}