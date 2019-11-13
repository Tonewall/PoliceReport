import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
import FullReport from './components/FullReport';
import GtpdFilter from './components/GtpdFilter';
import IncidentNumber from './components/IncidentNumber'
import 'bootstrap/dist/css/bootstrap.css';

/* For server debugging */
import DirectQuery from './components/DirectQuerying/DirectQuery';

class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                        <NavBar />
                        <Route exact path="/" component={DataView} />
                        <Route exact path="/full-report" component={FullReport} />
                        <Route exact path="/GTPD-Incident-Search" component={IncidentNumber} />
                        {/* For server debugging */}
                        <Route exact path="/direct-query" component={DirectQuery} />
                        <Route exact path="/GTPD-Filter" component={GtpdFilter} />

                </Router>
            </div>
        );
    }
}

export default App;
