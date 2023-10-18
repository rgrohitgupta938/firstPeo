import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import MobPage from "./mobPage";
import NewMobile from "./newMobile";
class MobMainComp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/mobile/brand/:bran" component={MobPage} />
            <Route path="/mobile/OS/:os" component={MobPage} />
            <Route path="/mobile/ROM/:ro" component={MobPage} />
            <Route path="/mobile/RAM/:ra" component={MobPage} />
            <Route path="/mobile/:id" component={NewMobile} />
            <Route path="/mobile" component={MobPage} />
            <Route path="/newMobile" component={NewMobile} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default MobMainComp;
