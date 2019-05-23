import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from './store/actions/index';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from './containers/Auth/Logout/Logout';

import { Route, Switch, Redirect } from "react-router-dom";
// import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {



    return (
      <div>
        <Layout>
          
            { this.props.isAuth ? 
              <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to='/'/>
              </Switch>
              :
              <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to='/'/>
              </Switch>
            }
            
            
          
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuth: Boolean(state.auth.token)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
