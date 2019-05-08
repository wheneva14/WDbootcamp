import React from "react";
// import Aux from "../../hoc/Aux";

const cockpit = (props)=> {
    const assignedClasses = [];
    let btnClass = '';
      
    if(props.showPersons) {
        btnClass = "Red";
    }
    if ( props.persons.length <= 2 ) {
      assignedClasses.push( "red" ); // classes = ['red']
    }
    if ( props.persons.length <= 1 ) {
      assignedClasses.push( "bold" ); // classes = ['red', 'bold']
    }

    return (
        <React.Fragment>
            <h1>Hi, I'm RRRRRRRRRApp</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
            className={btnClass}
            onClick={props.clicked}>Toggle Persons</button>
            <br></br>
            <button onClick={props.login}>LOG IN</button>
        </React.Fragment>
    )
}

export default cockpit;