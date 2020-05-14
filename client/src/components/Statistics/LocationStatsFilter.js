import React, { Component } from "react";
import Date from "./DateLocationFilter"
import {Redirect} from 'react-router-dom'



class LocationStatsFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
        };
        this.dateHandler = this.dateHandler.bind(this)
    }

    dateHandler = (date) => {
        this.setState({
            endDate: date.endDate, 
            startDate: date.startDate
        })
    }

    handleSubmit = () => {
        this.setState({redirected: true})
        // fetch('/getLocationRanking',
        //         {
        //             headers:{'Content-Type' : 'application/json'},
        //             method: 'post',
        //             body: JSON.stringify(this.state)
        //         }
        //     )
    }

    render() {
        return(
            <div className="main filterMain">
                {this.state.redirected ? <Redirect to={{pathname: '/Location-Statistics', state: this.state}}/> : null}
                <div className="card locationCard filterCard">
                    <h2 className="card-header">Locations Ranking Filter</h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <Date dateHandler={this.dateHandler}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="searchButton">
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LocationStatsFilter;