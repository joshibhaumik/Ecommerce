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
import Loading from "./layout/Loading";
import PrivateRoute from "./features/PrivateRoute";

import { loadCurrentUser } from "../actions/userActions";

const Main = props => {
  
  useEffect(()=> {
    if(props.user._id === undefined) {
      props.loadCurrentUser();
    }
  }, []);
  
  return (
    <Router>
      <Switch>
         <Layout>
          <Loading status={props.isLoading} />
          <Route exact path="/" component={Home} />
          <PrivateRoute auth={props.isAuthenticated} path={"/notifications"} Component={Notifications} />
          <PrivateRoute auth={props.isAuthenticated} path={"/cart"} Component={Cart} />
          <PrivateRoute auth={props.isAuthenticated} path={"/my-store"} Component={Store} />
          <PrivateRoute auth={props.isAuthenticated} path={"/create/store"} Component={CreateStore} />
          <PrivateRoute auth={props.isAuthenticated} path={"/create/item"} Component={CreateItem} />
          <Route path="/store/:storeId" component={Store} />
          <Route exact path="/item/:itemId" component={RenderItem} />
          <PrivateRoute auth={props.isAuthenticated} path={"/user/:userId"} Component={Profile} />
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
