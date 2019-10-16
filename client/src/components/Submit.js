import React, { Component } from 'react';
import './Submit.css';

class Submit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crimeData:{
                name: "",
                title: "",
                description: "",
                location: "",
                date: "",
                time: "",
                type: ""
            },
        }
    }
    componentDidMount() {
        

    }

    render() {
        return (
            <div className="main">
                <div className="card">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputName4">Officer's Name</label>
                        <input type="text" class="form-control" id="inputName4" placeholder="Name"/>
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputTitle4">Title</label>
                        <input type="text" class="form-control" id="inputTitle4" placeholder="Short Description"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputDescription">Description</label>
                        <textarea type="text" class="form-control" id="inputDescription" rows="5" placeholder="Description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="inputLocation">Location</label>
                        <input type="text" class="form-control" id="inputLocation" placeholder="Location"/>
                    </div>
                    
                    
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputDate2">Date</label>
                            <input type="date" class="form-control" id="inputDate2" placeholder=""/>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputTime">Time</label>
                            <input type="time" class="form-control" id="inputTime"/>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="inputState">Type</label>
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>Theft</option>
                            <option>Robbery</option>
                            <option>Underage Drinking</option>
                            <option>Traffic Violation</option>
                            <option>Public Misconduct</option>
                            <option>Other</option>
                        </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Submit;