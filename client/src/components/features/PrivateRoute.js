import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import Login from "../Modals/LoginModal";

const PrivateRoute = props => {
  const [login, toggleLogin] = useState(true);
  const { Component, auth, path, history } = props;
  return (
    <Route
      exact
      path={path}
      component={() => {
        if (auth) {
            return <Component />
        } else {
            return <Login show={login} handleClose={()=>{
                toggleLogin(false);
                history.push("/");
            }} />
        }
      }}
    />
  );
};

export default withRouter(PrivateRoute);
