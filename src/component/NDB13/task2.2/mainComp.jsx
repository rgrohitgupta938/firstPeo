import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import auth from "../../../services/authService";
import Main from "./main";
import Logout from "./logout";
import MyDetails from "./myDetails";
import Company from "./company";
import MyJunior from "./myJunior";
import Tracker from "./tracker";
class MainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/company" component={Company} />
            <Route path="/myDetails" component={MyDetails} />
            <Route path="/myJunior" component={MyJunior} />
            <Route path="/tracker" component={Tracker} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default MainComp;
