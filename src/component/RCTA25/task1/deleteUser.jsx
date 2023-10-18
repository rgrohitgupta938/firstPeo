import React, { Component } from "react";
import http from "../../../services/httpService";
class Deleteuser extends Component {
  async componentDidMount() {
    const { username = "" } = this.props.match.params;
    let response = http.deleteApi(`/productApp/users/${username}`);
    console.log("hiiiiii00");
    this.props.history.push("/users");
  }
  render() {
    return "";
  }
}
export default Deleteuser;
