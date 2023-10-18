import React, { Component } from "react";
import auth from "./authservice";
class Logout extends Component {
  componentDidMount() {
    auth.removeToken();
    this.props.history.push("/login");
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
