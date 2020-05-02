import React, { Component } from 'react';
import NavBar from './layouts/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './accounts/LoginComponent';
import Register from './accounts/RegisterComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div>
                <Router>
                    <NavBar />
                    <Switch>
                        {/* <Route exact path="/" component={""} /> */}
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
 
export default Main;