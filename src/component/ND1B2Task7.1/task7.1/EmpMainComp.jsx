import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import EmpPage from "./empPage";
import NewEmployee from "./newEmployee";
class EmpMainComp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div>
          <Switch>
            <Route path="/employees/desig/:desig" component={EmpPage} />
            <Route path="/employees/dept/:dept" component={EmpPage} />
            <Route path="/employees/:id" component={NewEmployee} />
            <Route path="/employees" component={EmpPage} />
            <Route path="/newEmployees" component={NewEmployee} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default EmpMainComp;
