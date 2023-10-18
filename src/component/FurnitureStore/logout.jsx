import React, { Component } from "react";
import auth from "../../services/authService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    localStorage.removeItem("cart");
    window.location = "/products"; /// for full window reload
  }
  render() {
    return "";
  }
}
export default Logout;
