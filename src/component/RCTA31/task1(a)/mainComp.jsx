import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PersonForm from "./personForm";
import DisplayDetails from "./displayDetails";
class MainComp extends Component {
  state = {
    persons: [
      {
        name: "Brad Williams",
        age: 27,
        country: "USA",
        tech: ["Javascript", "React"],
        currentStatus: "Student",
      },
      {
        name: "Anna Smith",
        age: 31,
        country: "Canada",
        tech: ["Javascript", "React", "Node.js"],
        currentStatus: "Working",
      },
    ],
  };
  handleSubmitPerson = (person, index) => {
    const { persons } = this.state;
    let persons1 = [...persons];
    index ? (persons1[+index] = person) : persons1.push(person);
    this.setState({ persons: persons1 });
  };
  render() {
    const { persons } = this.state;
    return (
      <div className="container">
        <Switch>
          <Route
            path="/persons/add"
            render={(props) => (
              <PersonForm {...props} onSubmit={this.handleSubmitPerson} />
            )}
          />
          <Route
            path="/persons/:index/Edit"
            render={(props) => (
              <PersonForm
                {...props}
                persons={persons}
                onSubmit={this.handleSubmitPerson}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => <DisplayDetails {...props} persons={persons} />}
          />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
