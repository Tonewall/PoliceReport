import React, {Component} from "react";
import "./NavBar.css";


export default class NavBar extends Component {

  render() {
    return (
        <nav className="navbar shadow p-1 mb-5 navbar-expand navbar-primary bg-light" id="navBarMain">
            <a className="navbar-brand" href="/">Counseling Web App</a>        
            <div className="navBarLinks">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Regular Chart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/CategoryChart">Category Chart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/LineChart">Line Chart</a>
                    </li>
                </ul>
            </div>
        </nav>
  
    );
  }
  
}