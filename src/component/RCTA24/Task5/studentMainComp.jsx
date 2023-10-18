import React, { Component } from "react";
import NavBar from "./navbar";
import Student from "./student";
import Students from "./students";
import AddStudent from "./addStudent";
import DeleteStudent from "./deleteStudent";
import { Redirect, Route, Switch } from "react-router-dom";
class StudentMainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/students/courses/:txt" component={Students} />

          <Route path="/students/:id/delete" component={DeleteStudent} />
          <Route path="/students/:id/edit" component={AddStudent} />
          <Route path="/students/:id" component={Student} />
          <Route path="/students" component={Students} />
          <Route path="/addStudent" component={AddStudent} />
        </Switch>
      </div>
    );
  }
}
export default StudentMainComp;
