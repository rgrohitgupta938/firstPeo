import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MyFormik from "./myFormik";
class MainComp extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/formik" component={MyFormik} />
          <Redirect from="/" to="/formik" />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
