import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Store from "./Store";
import CreateStore from "./CreateStore";
import RenderItem from "./RenderItem";
import CreateItem from "./CreateItem";
import Profile from "./Profile";

const Main = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/store" component={Store} />
          <Route path="/store/create" component={CreateStore} />
          <Route path="/item/:itemId" component={RenderItem} />
          <Route path="/item/create" component={CreateItem} />
          <Route path="/user/:userId" component={Profile} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default Main;
