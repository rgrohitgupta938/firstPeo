import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Persons from "./persons";
import AddPerson from "./addPerson";
import Person from "./person";
import DeletePerson from "./deletePerson";
class PersonMainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/persons/:id/delete" component={DeletePerson} />
          <Route path="/persons/:id/edit" component={AddPerson} />
          <Route path="/persons/add" component={AddPerson} />
          <Route path="/persons/:id" component={Person} />
          <Route path="/persons" component={Persons} />
        </Switch>
      </div>
    );
  }
}
export default PersonMainComp;
