import React, { Component } from 'react';
import "./Data.css";

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dispatchData: [],
            dispatchCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dispatchCallHourRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselData: [],
            counselCallMonthRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            counselCallHourRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    }
    componentDidMount() {
        //FETCH DISPATCH DATA
        fetch('/api/get-cad-data')
            .then(results => results.json())
            .then(json => console.log(json));

        //FETCH COUNSEL DATA
        fetch('/api/get-cad-data')
            .then(results => results.json());

    }


    render() {
        return (
            <div className="main">
                Test
            </div>
        );
    }
}

export default Data;