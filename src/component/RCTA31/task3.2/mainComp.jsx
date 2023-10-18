import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FormDD from "./formDD";
class MainComp extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/formDD" component={FormDD} />
          <Redirect from="/" to="/formDD" />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
