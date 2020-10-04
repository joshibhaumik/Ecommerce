import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./layout/Layout";
import Store from "./Screens/Store";
import CreateStore from "./Screens/CreateStore";
import RenderItem from "./Screens/RenderItem";
import CreateItem from "./Screens/CreateItem";
import Profile from "./Screens/Profile";
import Cart from "./Screens/Cart";
import Home from "./Screens/Home";
import Notifications from "./Screens/Notifications";
import DoesNotExists from "./Screens/DoesNotExists";
import PrivateRoute from "./features/PrivateRoute";

import { loadCurrentUser } from "../actions/userActions";

const Main = props => {
  
  useEffect(()=> {
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
