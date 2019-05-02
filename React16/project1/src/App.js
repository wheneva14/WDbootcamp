import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      { id:"0", name: 'Max', age: 28 },
      { id:"1", name: 'Manu', age: 29 },
      { id:"2", name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    display : true
  }



  nameChangedHandler = (id, event) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id == id;
    })
    const person = {...this.state.persons[personIndex]};
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    
    this.setState( {
      persons: persons
    } )
  }

  toggleDisplay = () => {
    this.setState({
      display : !this.state.display
    })
  }

  deletePerson = (index) => {
    const people = [...this.state.persons];
    people.splice(index, 1);
    this.setState({
      persons : people
    })
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button 
            style={style}
            onClick={this.toggleDisplay}>toggle</button>

          {this.state.persons.map((el, index) => {
            return <Person 
              name={el.name} 
              age={el.age} 
              click={this.deletePerson.bind(this, index)}
              key={el.id}
              changed={this.nameChangedHandler.bind(this,index)}></Person>
          })}

          
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
