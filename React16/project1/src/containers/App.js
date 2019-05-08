import React, { Component } from 'react';
import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import PropTypes from "prop-types";
import withClass from "../hoc/withClass";
import AuthContext from "./AuthCon";



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      persons: [
        { id: 'asfa1', name: 'Max', age: 28 },
        { id: 'vasdf1', name: 'Manu', age: 29 },
        { id: 'asdf11', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: true,
      auth: false
    }
  }

  loginHandler = () => {
    this.setState(prevState => ({
      auth: !prevState.auth
    }))
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    let persons = null;
    
    if ( this.state.showPersons ) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>
      ;
      
    }

    return (
        <div className="App">
        <Cockpit
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}
          ></Cockpit>
          <AuthContext.Provider value={{aa : this.state.auth}}>
            {persons}
          </AuthContext.Provider>
        
      </div>
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// Person.propTypes = {
//   click: PropTypes.func,
//   name: PropTypes.string,
//   age: PropTypes.number,
//   changed: PropTypes.func
// }

export default App;
