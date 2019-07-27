import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChartView from './components/Chart';
import NavBar from './components/NavBar';
import CategoryChart from './components/CategoryChart';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <NavBar />
                        <Route exact path="/" component={ChartView} />
                        <Route path="/CategoryChart" component={CategoryChart} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
