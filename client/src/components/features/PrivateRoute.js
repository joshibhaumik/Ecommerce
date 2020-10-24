import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import Login from "../Modals/LoginModal";
import { connect } from "react-redux";

const PrivateRoute = props => {
  const [login, toggleLogin] = useState(true);
  const { Component, auth, path, history } = props;
  return (
    <Route
      exact
      path={path}
      location={props.location}
      key={props.location.key}
      render={(location, match) => {
        if (auth) {
          return <Component key={props.location.key} match={match} />;
        } else {
          return (
            <Login
              show={login}
              handleClose={() => {
                toggleLogin(false);
                history.push("/");
              }}
            />
          );
        }
      }}
    />
  );
};
const mapStateToProps = state => ({
  auth: state.user.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(PrivateRoute));
