import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Store from "./Store";
import CreateStore from "./CreateStore";
import RenderItem from "./RenderItem";
import CreateItem from "./CreateItem";
import Profile from "./Profile";
import Cart from "./Cart";
import Home from "./Home";

const Main = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
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

export default Main;
