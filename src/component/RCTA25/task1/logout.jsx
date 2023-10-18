import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    ///this.props.history.push("/login");
    window.location = "/login"; /// for full window reload
  }
  render() {
    return "";
  }
}
export default Logout;
