import React, {Component} from "react";
import "./NavBar.css";


export default class NavBar extends Component {

  render() {
    return (
        <nav className="navbar shadow p-1 mb-5 navbar-expand navbar-light bg-light" id="navBarMain">
            <a className="navbar-brand" href="/">GTPD Crime Analytics</a>        
            <div className="navBarLinks">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Regular Data</a>
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