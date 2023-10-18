import React, { Component } from "react";
import http from "../../../services/httpService";
class Company extends Component {
  state = {
    txt: "",
  };
  async text() {
    let response = await http.get("/company");
    let { data } = response;
    this.setState({ txt: data });
  }
  componentDidMount() {
    this.text();
  }
  render() {
    const { txt } = this.state;
    return <div className="container">{txt}</div>;
  }
}
export default Company;
