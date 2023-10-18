import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Angular from "./angular";
import Android from "./android";
import LeftPanelComp from "./leftPanelComp";
import React1 from "./react1";
class MainComponent extends Component {
  state = {
    resume: [
      {
        name: "Amit",
        course: "BTech",
        year: 2019,
        status: "Studying",
        tech: "React",
      },
      {
        name: "Praveen",
        course: "BSc",
        year: 2020,
        status: "Studying",
        tech: "Angular",
      },
      {
        name: "Namita",
        course: "MCA",
        year: 2021,
        status: "Studying",
        tech: "Android",
      },
      {
        name: "Anuradha",
        course: "MTech",
        year: 2019,
        status: "Studying",
        tech: "Android",
      },
      {
        name: "Kavita",
        course: "BCA",
        year: 2020,
        status: "Studying",
        tech: "React",
      },
      {
        name: "Manish",
        course: "BTech",
        year: 2016,
        status: "Working",
        tech: "React",
      },
      {
        name: "Gautam",
        course: "BTech",
        year: 2017,
        status: "Working",
        tech: "Angular",
      },
      {
        name: "Radhika",
        course: "MCA",
        year: 2016,
        status: "Working",
        tech: "React",
      },
      {
        name: "Charu",
        course: "MTech",
        year: 2018,
        status: "Searching",
        tech: "Android",
      },
      {
        name: "Divya",
        course: "BCA",
        year: 2019,
        status: "Preparing",
        tech: "Angular",
      },
      {
        name: "Pradeep",
        course: "BTech",
        year: 2016,
        status: "Working",
        tech: "React",
      },
      {
        name: "Siddhartha",
        course: "MCA",
        year: 2016,
        status: "Working",
        tech: "Angular",
      },
      {
        name: "Prachi",
        course: "MCA",
        year: 2016,
        status: "Searching",
        tech: "Android",
      },
      {
        name: "Charu",
        course: "MTech",
        year: 2018,
        status: "Preparing",
        tech: "React",
      },
      {
        name: "Harsh",
        course: "BSc",
        year: 2019,
        status: "Preparing",
        tech: "Angular",
      },
    ],
  };
  render() {
    const { resume } = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/jobs/react1/:page" render={(props) =>  <React1 {...props} resume ={resume} />} />
          <Route path="/jobs/android/:page" render={(props) =>  <Android {...props} resume ={resume} />} />
          <Route path="/jobs/angular/:page" render={(props) =>  <Angular {...props} resume ={resume} />} />
          <Redirect from="/" to="/jobs" />
        </Switch>
      </div>
    );
  }
}
export default MainComponent;
