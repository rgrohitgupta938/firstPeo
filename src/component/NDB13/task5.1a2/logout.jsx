import React, { Component } from "react";
import auth from "./authservice";
class Logout extends Component {
  componentDidMount() {
    auth.removeToken();
  }
  render() {
    return (
      <div className="container">
        <h4>Logged Out</h4>
      </div>
    );
  }
}
export default Logout;
