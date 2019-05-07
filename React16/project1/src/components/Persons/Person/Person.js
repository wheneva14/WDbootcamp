import React from 'react';

import './Person.css';
import AuthContext from "../../../containers/AuthCon";

class Person extends React.Component {
    static contextType = AuthContext;

    render() {
        return (
            
        <div className="Person">
        
            { this.context.aa ? "LOGGEDIN" : "NOOOOO"}
        
            <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
        )
    }
}



export default Person;