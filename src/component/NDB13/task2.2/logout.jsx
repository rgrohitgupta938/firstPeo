import React, { Component } from "react";
import auth from "../../../services/authService";
import Cookies from "js-cookie";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    Cookies.remove("empCode");
    window.location = "/login"; /// for full window reload
  }
  render() {
    return "";
  }
}
export default Logout;
