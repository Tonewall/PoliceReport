import React, {Component} from "react";
import "./NavBar.css";


export default class NavBar extends Component {

  render() {
      var style = {
          fontSize: 25
      }
    return (
        <nav className="navbar shadow p-1 mb-5 navbar-expand navbar-light bg-light" id="navBarMain">
            <a className="navbar-brand" href="/"><div style={style}>GTPD Crime Analytics</div></a>        
            <div className="navBarLinks">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            GTPD
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/GTPD">All Data</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/GTPD-Arrests">Arrests</a>
                            <a className="dropdown-item" href="/GTPD-Filter">Filter</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            APD
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/GTPD">All Data</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/GTPD-Arrests">Arrests</a>
                            <a className="dropdown-item" href="/GTPD-Filter">Filter</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/submit">Submit Record</a>
                    </li>
                </ul>
            </div>
        </nav>
  
    );
  }
  
}