import React, { Component } from "react";
import Hello from "./hello";
import Bye from "./bye";
class MainComp extends Component {
  render() {
    return (
      <div className="container">
        <Hello name="Jack" course="React" />
        <Bye topic="Function Coponents" />s
      </div>
    );
  }
}
export default MainComp;
