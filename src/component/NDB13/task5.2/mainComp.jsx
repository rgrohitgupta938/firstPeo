import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import auth from "./authservice";
import Main from "./main";
import Logout from "./logout";
import MyDetails from "./myDetails";
import Company from "./company";
import MyJunior from "./myJunior";

class MainComp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/company" component={Company} />
            <Route path="/myDetails" component={MyDetails} />
            <Route path="/myJunior" component={MyJunior} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default MainComp;
