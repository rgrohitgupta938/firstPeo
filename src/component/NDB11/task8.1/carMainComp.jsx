import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Cars from "./cars";
import NewCar from "./newCar";
class CarMainComp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/cars" component={Cars} />
            <Route path="/newCar/:id" component={NewCar} />
            <Route path="/newCar" component={NewCar} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default CarMainComp;
