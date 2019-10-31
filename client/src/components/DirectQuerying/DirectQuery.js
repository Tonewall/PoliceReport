import React, { Component } from "react";
import './DirectQuery.css'

export default class DirectQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {user_query: "", query_result:""}
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
        fetch('/direct-query/'+this.state.user_query)
            .then(result => result.json().then(data=> {
                console.log(data)
                this.setState({query_result: JSON.stringify(data)});
            }))
    }

    render() {
        return (
            <div className="direct_query_main_wrapper">
                <textarea className="query_box" value = {this.state.user_query} onKeyDown = {this.handle_query_box_key_down}
                            placeholder="SELECT TOP (1000) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [Crime_Report]"
                            onChange={(event)=>{this.setState({user_query: event.target.value});}}/>
                <div style={{ textAlign: "right" }}>
                    <button className="query_button" onClick={this.run_query}>Run query!</button>
                </div>
                <div className="query_result" >{this.state.query_result}</div>
            </div>
        );
    }
}