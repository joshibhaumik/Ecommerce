import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./layout/Layout";
import Store from "./Screens/Store";
import MyStore from "./Screens/MyStore";
import CreateStore from "./Screens/CreateStore";
import RenderItem from "./Screens/RenderItem";
import CreateItem from "./Screens/CreateItem";
import Profile from "./Screens/Profile";
import Cart from "./Screens/Cart";
import Home from "./Screens/Home";
import Notifications from "./Screens/Notifications";
import DoesNotExists from "./Screens/DoesNotExists";
import Loading from "./layout/Loading";
import PrivateRoute from "./features/PrivateRoute";

import { loadCurrentUser } from "../actions/userActions";

const Main = props => {
  useEffect(() => {
    if (props.user._id === undefined) {
      props.loadCurrentUser();
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Layout>
          <Loading status={props.isLoading} />
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path={"/notifications"}
            Component={Notifications}
          />
          <PrivateRoute
            path={"/cart"}
            Component={Cart}
          />
          <PrivateRoute
            path={"/my-store"}
            Component={MyStore}
          />
          <PrivateRoute
            path={"/create/store"}
            Component={CreateStore}
          />
          <PrivateRoute
            path={"/create/item"}
            Component={CreateItem}
          />
          <Route path="/store/:storeId" component={Store} />
          <Route exact path="/item/:itemId" component={RenderItem} />
          <PrivateRoute
            path={"/user/:userId"}
            Component={Profile}
          />
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
  };
};

export default connect(
  mapStateToProps,
  { loadCurrentUser }
)(Main);
