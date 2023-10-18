import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Stars from "./stars";
import Details from "./details";
import Cricket from "./cricket";
import Football from "./football";
import AddStar from "./addStar";
class SportStarMainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/details/:id" component={Details} />
          <Route path="/stars/cricket" component={Cricket} />
          <Route path="/stars/football" component={Football} />
          <Route path="/stars/new" component={AddStar} />
          <Route path="/stars" component={Stars} />
          
        </Switch>
      </div>
    );
  }
}
export default SportStarMainComp;
