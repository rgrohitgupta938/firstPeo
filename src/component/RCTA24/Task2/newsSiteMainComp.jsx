import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import SearchComp from "./searchComp";
class NewsSiteMainComp extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/search" component={SearchComp} />
            <Route path="/search/:txt" component={SearchComp} />
            
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default NewsSiteMainComp;
