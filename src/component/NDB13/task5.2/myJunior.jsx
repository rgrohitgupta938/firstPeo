import React, { Component } from "react";
import http from "./httpService";
import Cookies from "js-cookie";
class MyJunior extends Component {
  state = {
    emp: [],
  };
  async getjuniors() {
    let response = await http.get("/myJuniors");
    let { data } = response;
    this.setState({ emp: data });
    console.log(data, response);
  }
  componentDidMount() {
    this.getjuniors();
  }
  render() {
    const { emp } = this.state;
    console.log(Cookies.get("tracker"));
    return (
      <div className="container">
        <div className="row border fw-bold bg-light">
          <div className="col-2">Employee Code</div>
          <div className="col-2">Name</div>
          <div className="col-2">Designation</div>
          <div className="col-2">Gender</div>
          <div className="col-2">Salary</div>
          <div className="col-2">Department</div>
        </div>
        {emp &&
          emp.map((st) => (
            <div className="row border">
              <div className="col-2">{st.empCode}</div>
              <div className="col-2">{st.name}</div>
              <div className="col-2">{st.designation}</div>
              <div className="col-2">{st.gender}</div>
              <div className="col-2">{st.salary}</div>
              <div className="col-2">{st.department}</div>
            </div>
          ))}
      </div>
    );
  }
}
export default MyJunior;
