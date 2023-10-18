import React, { Component } from "react";
import auth from "../../../services/authService";
class MyPortal extends Component {
  state = {
    emp: auth.getUser(),
  };

  render() {
    const { emp } = this.state;
    return (
      <div className="container">
        <h2>Welcome, {emp.name} to the Employee Management Portal</h2>
      </div>
    );
  }
}
export default MyPortal;
