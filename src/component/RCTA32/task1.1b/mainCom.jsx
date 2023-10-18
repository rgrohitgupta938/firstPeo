import React, { Component } from "react";
import Lecture from "./lecture";
class MainComp extends Component {
  state = {
    lectures: [
      { name: "Lecture 1 : Introducton to react ", likes: 0 },
      { name: "Lecture 2 : State and Props ", likes: 0 },
      { name: "Lecture 3 : Component Lifecycle ", likes: 0 },
      { name: "Lecture 4 : FUnctional Components ", likes: 0 },
    ],
  };
  handleLike = (name) => {
    let lectures = this.state.lectures;
    let lect = lectures.find((l1) => l1.name === name);
    lect.likes++;
    this.setState({ lectures: lectures });
  };
  render() {
    let lectures = this.state.lectures;
    return (
      <div className="container">
        <Lecture lectures={lectures} clickLike={this.handleLike} />
      </div>
    );
  }
}
export default MainComp;
