import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './Header';

function Main() {
  const [auth, toggleAuth] = useState(true);

  return (
    <Router>
      <Switch>
        {auth ? (
          <>
            <Header />
          </>
        ) : (
          <>
            <div>this is another div</div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default Main;
