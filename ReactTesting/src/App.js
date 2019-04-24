import React from "react";
import {Route, NavLink, Switch, BrowserRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <h1>HOME</h1>
            </React.Fragment>
        )
    }
}

function First(props) {
    return (
        <React.Fragment>
            <h1>First</h1>
        </React.Fragment>
    )
}

const Second = (props) => {
    return (
        <React.Fragment>
            <h1>Second</h1>
        </React.Fragment>
    )
}
const Third = (props) => {
    return (
        <React.Fragment>
            <h1>Third</h1>
        </React.Fragment>
    )
}

export default class App extends React.Component {
    
    render() {
        return (
            <BrowserRouter>
                
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/First">First</NavLink>
                <NavLink to="/Second">Second</NavLink>
                <NavLink to="/Third">Third</NavLink>

                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/First" component={First}/>
                    <Route path="/Second" component={Second}/>
                    <Route path="/Third" component={Third}/>
                </Switch>
            </BrowserRouter>
        )
    }
}