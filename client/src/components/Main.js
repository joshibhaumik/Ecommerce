import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./Layout";
import Store from "./Store";
import CreateStore from "./CreateStore";
import RenderItem from "./RenderItem";
import CreateItem from "./CreateItem";
import Profile from "./Profile";
import Cart from "./Cart";
import Home from "./Home";
import Notifications from "./Notifications";

import { loadCurrentUser } from "../actions/userActions";

const Main = props => {
  
  useEffect(()=> {
    document.title = "Welcome to the Online Store";
    props.loadCurrentUser();
  }, []);
  
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/store/create" component={CreateStore} />
          <Route exact path="/items/create" component={CreateItem} />
          <Route exact path="/item/:itemId" component={RenderItem} />
          <Route exact path="/user/:userId" component={Profile} />
        </Layout>
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.user.isLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCurrentUser: () => dispatch(loadCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
