import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import './DirectQuery.css'

export default class DirectQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {user_query: "", query_result:[], no_history: true, wrong_query: false, error_message: ''}
    }
    
    render() {
        return (
            <div className="direct_query_main_wrapper">
                {
                    this.state.wrong_query ? 
                        <div style={{padding: '10px', fontSize: '20px', fontWeight: 'bold', color: 'red'}}> 
                            {'Database error: '+this.state.error_message} 
                        </div>
                        :
                        this.state.no_history ?
                            null
                            :
                            <div style={{padding: '10px', fontSize: '20px', fontWeight: 'bold', color: 'green'}}> 
                                {'Query execution successful!'} 
                            </div>
                }
                <textarea className="query_box" value = {this.state.user_query} onKeyDown = {this.handle_query_box_key_down}
                            placeholder="SELECT TOP (1000) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [Crime_Report]"
                            onChange={(event)=>{this.setState({user_query: event.target.value});}}/>
                <div style={{ textAlign: "right" }}>
                    <button className="query_button" onClick={this.run_query}>Run query!</button>
                </div>
                {/*<div className="query_result" >{this.state.query_result}</div>*/}
                <div className= "query_result">
                    <MDBDataTable
                        scrollX
                        scrollY
                        striped
                        bordered
                        hover
                        maxHeight="40vh"
                        entries={20}
                        data={this.state.query_result}
                    />
                </div>
            </div>
        );
    }

    handle_query_box_key_down = (event) => {
        if(event.key==="Tab") {
            event.preventDefault()
            const start = event.target.selectionStart
            const end = event.target.selectionEnd
            const field = event.target
            this.setState({user_query : this.state.user_query.substring(0, start) + '\t'+ this.state.user_query.substring(end)},
                            () => {field.selectionStart = start+1;
                                field.selectionEnd = start + 1;
                            })
            event.target.selectionStart = event.target.selectionStart + 1
            event.target.selectionEnd = event.target.selectionStart +1
        }
    }

    run_query = () => {
        var req_body = JSON.stringify({query:this.state.user_query})
        fetch('/direct-query',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: req_body
                }
            )
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(result => result.json().then(data=> {
                this.populateData(data)
            }))
            .catch(error => this.setState({wrong_query:true, error_message: error.message}));
    }

    populateData = function (data) {
        /* Need to preprocess query result before */
        data.forEach(element => {
            Object.keys(element).forEach(key => {
                if(element[key] == null)    element[key]='-'
                else if(element[key] === true) element[key]='true'
                else if(element[key] === false)    element[key]='false'
            });
        });
        this.setState({
            no_history: false,
            wrong_query: false,
            query_result: {
                columns: Object.keys(data[0]).map((key)=>{ return {label: key, field: key, width: 200}}),
                rows: data
            }
        });
    }
}