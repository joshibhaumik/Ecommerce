import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import Login from "../Modals/LoginModal";

const PrivateRoute = props => {
  const [login, toggleLogin] = useState(true);
  const { Component } = props;
  return (
    <Route
      exact
      path={props.path}
      component={() => {
        if (props.auth) {
            return <Component />
        } else {
            return <Login show={login} handleClose={()=>{
                toggleLogin(false);
                props.history.push("/");
            }} />
        }
      }}
    />
  );
};

export default withRouter(PrivateRoute);
