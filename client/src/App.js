import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
// import FullReport from './components/FullReport';
import GtpdFilter from './components/GtpdFilter';
import IncidentNumber from './components/IncidentNumber'
import FilterResult from './components/FilterResult'
import DateTimeFilter from './components/Statistics/DateTimeFilter'
import LocationStatsFilter from './components/Statistics/LocationStatsFilter'
import LocationStatistics from './components/Statistics/LocationStatistics'
import StatisticsRedirect from './components/Statistics/StatisticsRedirect'
import BuildingInformation from './components/BuildingInformation'
import BuildingResult from './components/BuildingResult'
import FullReportNew from './components/FullReportNew'
import RepeatOffender from './components/RepeatOffender'
import OffenderResult from './components/OffenderResult'
import 'bootstrap/dist/css/bootstrap.css';
import {server} from './config'
import Cookies from 'js-cookie'
import queryString from 'query-string'


class App extends Component {

    constructor(props) {
        super()
        this.state =
        {
            verifying_user: true,
            logging_in: false,
            authorized: false
        }
    }

    componentDidMount() {
        fetch(server + '/verify_user',
            {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'  // include cookies
            }
        )
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                    if (data.authorized) {
                        // user is logged in and authorized to access
                        this.setState({ verifying_user: false, logging_in: false, authorized: true })
                    }
                    else {
                        if (data.logged_in) {
                            // user is logged in, but not authorized to access
                            this.setState({ verifying_user: false, logging_in: false, authorized: false })
                        }
                        else {
                            // user is not logged in
                            this.setState({ verifying_user: false, logging_in: true, authorized: false })

                            var appURL = window.location.protocol + '//' + window.location.host
                            // check if the url is holding SSO ticket
                            var values = queryString.parse(window.location.search)
                            if (values.ticket === undefined) {
                                Cookies.set('savedURL', window.location.href)
                                // couldn't find ticket, redirect to cas login page
                                window.location.href = 'https://login.gatech.edu/cas/login?service=' + encodeURIComponent(appURL)
                            }
                            else {
                                // ticket found, need to validate it
                                fetch(server + '/validate_ticket',
                                    {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'post',
                                        body: JSON.stringify({ "service": encodeURIComponent(appURL), "ticket": values.ticket }),
                                        credentials: 'include'
                                    }
                                )
                                    .then(function (response) {
                                        if (!response.ok) {
                                            throw Error(response.statusText);
                                        }
                                        return response
                                    })
                                    .then(results => {
                                        results.json().then(data => {
                                            if (data.success) {
                                                // ticket validation success, redirect to the original webpage
                                                if (Cookies.get('savedURL'))
                                                    window.location.href = Cookies.get('savedURL');
                                                else
                                                    window.location.href = appURL;
                                            }
                                            else {
                                                // ticket validation fail, redirect to SSO login page
                                                if (data.login_failed)
                                                    window.location.href = 'https://login.gatech.edu/cas/login?service=' + encodeURIComponent(appURL)
                                                else
                                                    this.setState({ verifying_user: false, logging_in: false, authorized: false })
                                            }
                                        })
                                    })
                                    .catch(err => console.error(err))
                            }
                        }
                    }
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            this.state.authorized
                ?
                <div className="mainBody">
                    <Router>
                        <NavBar />
                        <Route exact path="/" component={DataView} />
                        {/* <Route exact path="/full-report/:incidentNumber" component={FullReport} /> */}
                        <Route exact path="/GTPD-Incident-Search" component={IncidentNumber} />
                        <Route exact path="/Filter-Result" component={FilterResult} />
                        {/* For server debugging */}
                        <Route exact path="/GTPD-Filter" component={GtpdFilter} />
                        <Route exact path="/Statistics/" component={StatisticsRedirect} />
                        <Route exact path="/Date-Time-Filter/" component={DateTimeFilter} />
                        <Route exact path="/Location-Stats-Filter/" component={LocationStatsFilter} />
                        <Route exact path="/Location-Statistics/" component={LocationStatistics} />
                        <Route exact path="/Building-Information" component={BuildingInformation} />
                        <Route exact path="/full-report/:incidentNumber" component={FullReportNew} />
                        <Route exact path="/Repeat-Offenders" component={RepeatOffender} />
                        <Route exact path="/Offender-Result/:personID" component={OffenderResult} />
                        <Route exact path="/Building-Result/:buildingNum" component={BuildingResult} />
                    </Router>
                </div>
                :
                (
                    (this.state.verifying_user || this.state.logging_in)
                        ?
                        <div></div>
                        :
                        <div>Not authorized. Please contact GTPD OIT for authorization.</div>
                )
        );
    }
}

export default App;