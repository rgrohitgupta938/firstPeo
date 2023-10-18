import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CoursePage from "./coursePage";
import Lecture from "./lecture";
import NavBar from "./navbar";
import Welcome from "./welcome";
import Stores1 from "./stores1";
class RMainComponent1 extends Component {
  state = {
    courses: ["React", "Angular", "Javascript"],
    lectures: [
      { course: "React", id: 45, topic: "State" },
      { course: "React", id: 48, topic: "Props" },
      { course: "React", id: 54, topic: "Routing" },
      { course: "Angular", id: 46, topic: "Introduction to Angular" },
      { course: "Angular", id: 47, topic: "Typescript" },
      { course: "Angular", id: 51, topic: "Angular Components" },
      { course: "Angular", id: 52, topic: "Routing" },
      { course: "Javascript", id: 40, topic: "Map" },
      { course: "Javascript", id: 41, topic: "Reduce" },
      { course: "Javascript", id: 42, topic: "Ternary" },
      { course: "Javascript", id: 43, topic: "Spread" },
      { course: "Javascript", id: 44, topic: "Object Destructuring" },
      { course: "Javascript", id: 45, topic: "Literal Expression" },
    ],
  };
  // /course/:name   /lecture/name/:id    /welcome    to /

  render() {
    const { lectures, courses } = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/course/:courseName"
            render={(props) => <CoursePage {...props} lectures={lectures} />}
          />
          <Route
            path="/stores1"
            render={(props) => <Stores1 {...props} lectures={lectures} />}
          />
          <Route
            path="/lecture/:courseName/:lecid"
            render={(props) => <Lecture {...props} lectures={lectures} />}
          />
          <Route path="/welcome" component={Welcome} />
          <Redirect from="/" to="/welcome" />
        </Switch>
      </div>
    );
  }
}
export default RMainComponent1;
