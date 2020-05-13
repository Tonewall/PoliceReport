import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';

class BuildingInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offenderList: {
                coulumns: [],
                rows: []
            }
        }
    }

    
    populateData = function (data) {
        var columns = [
            {label: 'PersonID', field: 'PersonID', width: 50, sort: 'asc'},
            {label: 'First Name', field: 'FirstName', width: 100, sort: 'asc'},
            {label: 'LastName', field: 'Last Name', width: 100, sort: 'asc'},
            {label: 'DateOfBirth', field: 'Date Of Birth', width: 200, sort: 'asc'},
        ]
        var tempList = []

        for(var i = 0; i < data.length; i++) {
            for(const value in data[i]) {
                if(data[i][value] == null) {
                    data[i][value] = '-'
                }
            }
            tempList.push(data[i])
        }    
        this.setState({
            offenderList: {
                columns: columns,
                rows: tempList
            }
        },
        function() {console.log(this.state)})
    }
    

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/get-repeat-offender')
            .then(results => {
                results.json().then(data => {
                console.log(data)
                // this.populateData(data)
            })})
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="main">
                <div className="card buildingCard">
                    <h2 className="card-header">Repeat Offenders</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={15}
                            data={this.state.offenderList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildingInformation;