import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
import FullReport from './components/FullReport';
import GtpdFilter from './components/GtpdFilter';
import IncidentNumber from './components/IncidentNumber'
import FilterResult from './components/FilterResult'
import DateTimeFilter from './components/Statistics/DateTimeFilter'
import LocationShiftFilter from './components/Statistics/LocationShiftFilter'
import StatisticsRedirect from './components/Statistics/StatisticsRedirect'
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
                        <Route exact path="/full-report/:incidentNumber" component={FullReport} />
                        <Route exact path="/GTPD-Incident-Search" component={IncidentNumber} />
                        <Route exact path="/Filter-Result" component={FilterResult} />
                        {/* For server debugging */}
                        <Route exact path="/direct-query" component={DirectQuery} />
                        <Route exact path="/GTPD-Filter" component={GtpdFilter} />
                        <Route exact path="/Statistics/" component={StatisticsRedirect} />
                        <Route exact path="/Date-Time-Filter/" component={DateTimeFilter} />
                        <Route exact path="/Location-Shift-Filter/" component={LocationShiftFilter} />

                </Router>
            </div>
        );
    }
}

export default App;
