import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./navbar";
import About from "./about";
import Offices from "./offices";
import Employees from "./employees";
import Office from "./office";
import Employee from "./employee";
import NewEmployee from "./newEmployee";
class MainComponent extends Component {
  state = {
    emps: [
      {
        id: "JX103",
        name: "Jack Wilson",
        dept: "Technology",
        designation: "Manager",
      },
      {
        id: "JX125",
        name: "Mary Gomes",
        dept: "Operations",
        designation: "Vice President",
      },
      {
        id: "JX086",
        name: "George Mason",
        dept: "Finance",
        designation: "Trainee",
      },
      { id: "JX259", name: "Jim Smith", dept: "HR", designation: "Executive" },
      {
        id: "JX009",
        name: "Tim Watson",
        dept: "Marketing",
        designation: "Manager",
      },
      {
        id: "JX188",
        name: "Anna Gates",
        dept: "Technology",
        designation: "Trainee",
      },
      {
        id: "JX423",
        name: "Bob Andrews",
        dept: "Technology",
        designation: "Trainee",
      },
      {
        id: "JX525",
        name: "Ted Cotton",
        dept: "Technology",
        designation: "Vice President",
      },
      {
        id: "JX636",
        name: "William Smith",
        dept: "Finance",
        designation: "Executive",
      },
      {
        id: "JX749",
        name: "Billy Norton",
        dept: "Finance",
        designation: "Executive",
      },
      {
        id: "JX859",
        name: "Julia Smith",
        dept: "Marketing",
        designation: "Executive",
      },
      {
        id: "JX968",
        name: "Meg Conte",
        dept: "Technology",
        designation: "Trainee",
      },
      {
        id: "JX156",
        name: "Corey Andrews",
        dept: "Technology",
        designation: "Manager",
      },
      {
        id: "JX157",
        name: "Larry King",
        dept: "Operations",
        designation: "Manager",
      },
      {
        id: "JX058",
        name: "Michael Mason",
        dept: "Finance",
        designation: "Manager",
      },
      {
        id: "JX269",
        name: "Wally Smith",
        dept: "HR",
        designation: "Executive",
      },
      {
        id: "JX080",
        name: "Tara Reid",
        dept: "Marketing",
        designation: "Manager",
      },
      {
        id: "JX191",
        name: "Alfred Myers",
        dept: "Technology",
        designation: "Trainee",
      },
    ],
    offices: [
      {
        id: 1,
        city: "SanFrancisco",
        address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
      },
      {
        id: 2,
        city: "Bengaluru",
        address:
          "Swami Vivekananda Rd, Sadanandanagar, Bennigana Halli, Bengaluru",
      },
      {
        id: 3,
        city: "London",
        address: "Belgrave House, 76 Buckingham Palace Rd, Belgravia, London",
      },
    ],
  };
  handleAddEmployee = (pr) => {
    let s1 = {...this.state}
    s1.emps.push(pr);
    this.setState(s1);
  }
  render() {
    const { emps, offices } = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/employee/:id"
            render={(props) => <Employee {...props} emps={emps} />}
          />
          <Route
            path="/office/:location"
            render={(props) => <Office {...props} offices={offices} />}
          />
          <Route path="/about" component={About} />
          <Route
            path="/offices"
            render={(props) => <Offices {...props} offices={offices} />}
          />
          <Route
            path="/employees/:page"
            render={(props) => <Employees {...props} emps={emps} />}
          />
          <Route
            path="/newEmployee"
            render={(props) => <NewEmployee {...props} employeeInfo={{}} onSubmit = {this.handleAddEmployee} />}
          />
          <Redirect from="/" to="/about" />
        </Switch>
      </div>
    );
  }
}
export default MainComponent;
