import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CourseForm from "./form";
import Display from "./display";
class MainComp extends Component {
  state = {
    details: [],
  };
  handleSubmit = (values, index) => {
    let { details } = this.state;
    let details1 = [...details];
    console.log(typeof index, index);
    +index >= 0 ? (details1[+index] = values) : details1.push(values);
    this.setState({ details: details1 });
  };
  handleDelete = (index) => {
    let { details } = this.state;
    let details1 = [...details];
    details1.splice(index, 1);
    this.setState({ details: details1 });
  };
  render() {
    const { details } = this.state;
    console.log(details);
    return (
      <div className="container">
        <Switch>
          <Route
            path="/edit/:index"
            render={(props) => (
              <CourseForm
                {...props}
                details={details}
                onSubmit={this.handleSubmit}
              />
            )}
          />
          <Route
            path="/details"
            render={(props) => (
              <Display
                {...props}
                details={details}
                onDelete={this.handleDelete}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <CourseForm
                {...props}
                details={details}
                onSubmit={this.handleSubmit}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
