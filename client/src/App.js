import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
import FullReport from './components/FullReport';
import Submit from './components/Submit';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                    <div>
                        <NavBar />
                        <Route exact path="/" component={DataView} />
                        <Route exact path="/full-report" component={FullReport} />
                        <Route exact path="/submit" component={Submit} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
