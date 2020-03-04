import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './layouts/Navbar';

import Login from './accounts/Login';
import ForgotPassword from './accounts/FrogotPassword'
import Register from './accounts/Register';
import TermsConditions from './accounts/TermsConditions';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server.
  callBackendAPI = async () => {
    const response = await fetch('/expressBackend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Router>
        <Navbar authenticate={false}/>
        <div className="container-fluid">
            <Switch>
              <Route exact strict path="/" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/forgot_password" component={ForgotPassword}/>
              <Route path="/terms_conditions" component={TermsConditions}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;