import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChartView from './components/Chart';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={ChartView} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
