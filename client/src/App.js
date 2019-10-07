import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                    <div>
                        <NavBar />
                        <Route exact path="/" component={DataView} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
