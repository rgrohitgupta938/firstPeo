import React, { Component } from "react";
import http from "./httpService";
class MyDetails extends Component {
  state = {
    details: {},
  };
  async fetchUserDetails() {
    try {
      const response = await http.get("/myDetails");
      const { data } = response;
      console.log(response);
      this.setState({ details: data });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    const { details } = this.state;
    const { empCode, name, designation, gender, salary, department } = details;
    console.log(details);
    return (
      <div className="container">
        <strong>Employee Code :</strong> {empCode}
        <br />
        <strong>Name :</strong> {name}
        <br />
        <strong>Designation :</strong> {designation}
        <br />
        <strong>Gender :</strong> {gender}
        <br />
        <strong>Salary :</strong> {salary || "Not Mentioned"}
        <br />
        <strong>Department :</strong> {department}
        <br />
      </div>
    );
  }
}

export default MyDetails;
