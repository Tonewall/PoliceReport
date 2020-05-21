import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';


class BuildingInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirected: false,
            personID: null,
            selectedName: [{value: 'offender', label: 'Offender'}],
            offenderList: {
                coulumns: [],
                rows: []
            }
        }
        this.onClick = this.onClick.bind(this)
    }

    
    populateData = function (data) {
        var columns = [
            {label: 'PersonID', field: 'PersonID', width: 50, sort: 'asc'},
            {label: 'First Name', field: 'First Name', width: 100, sort: 'asc'},
            {label: 'Last Name', field: 'Last Name', width: 100, sort: 'asc'},
            {label: 'DOB', field: 'DOB', width: 50, sort: 'asc'},
            {label: 'Race', field: 'Race', width: 50, sort: 'asc'},
            {label: 'Sex', field: 'Sex', width: 50, sort: 'asc'},
            {label: 'Height', field: 'Height', width: 50, sort: 'asc'},
            {label: 'Last Arrest', field: 'Max ArrDate', width: 100, sort: 'asc'},
            {label: 'Last Address', field: 'Max Address', width: 200, sort: 'asc'},
        ]
        var tempList = []

        for(var i = 0; i < data.length; i++) {
            var personID = data[i]['PersonID']
            data[i]['PersonID'] = <div style={{color:'blue', cursor:'pointer'}}  ><u  onClick={this.onClick} data-name={personID}>{personID}</u></div>
            var k = 0;
            for(const value in data[i]) {
                if(value !== 'PersonID') {
                    if(data[i][value] == null) {
                        data[i][value] = '-'
                    }
                }
                
            }
            tempList.push(data[i])
        }    
        this.setState({
            offenderList: {
                columns: columns,
                rows: tempList
            }
        })
    }
    

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/get-repeat-offender')
            .then(results => {
                results.json().then(data => {
                this.populateData(data)
            })})
            .catch(err => console.error(err))
    }


    onClick(event) {
        this.setState({personID: event.target.dataset.name},
            function() {
                this.setState({redirected: true})
            });
    }

    render() {
        return (
            <div className="main">
                {this.state.redirected ? <Redirect to={{pathname: '/Offender-Result/'+this.state.personID}}/> : null}
                <div className="card buildingCard">
                    <h2 className="card-header">Repeat Offenders</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={30}
                            data={this.state.offenderList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildingInformation;