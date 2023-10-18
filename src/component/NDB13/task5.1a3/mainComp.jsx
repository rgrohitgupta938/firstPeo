import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import Logout from "./logout";
import User from "./user";
import Orders from "./orders";
class MainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/orders/:type" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/logout" component={Logout} />
          <Redirect from="/" to="/user" />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
