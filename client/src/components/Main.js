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
import DoesNotExists from "./DoesNotExists";
import PrivateRoute from "./features/PrivateRoute";

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
          <PrivateRoute path={"/notifications"} Component={Notifications} />
          <PrivateRoute path={"/cart"} Component={Cart} />
          <PrivateRoute path={"/stores/create"} Component={CreateStore} />
          <Route path="/store/:storeId" component={Store} />
          <PrivateRoute path={"/items/create"} Component={CreateItem} />
          <Route exact path="/item/:itemId" component={RenderItem} />
          <PrivateRoute path={"/user/:userId"} Component={Profile} />
          {/* <Route exact path="/:str" component={DoesNotExists} /> */}
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
