import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class AllClasses extends Component {
  state = {
    classes: [],
  };
  async classes() {
    let response = await http.get(`/getStudentClass/${auth.getUser().name}`);
    let { data } = response;
    this.setState({ classes: data });
  }
  componentDidMount() {
    this.classes();
  }
  render() {
    console.log("check render");
    const { classes } = this.state;
    return (
      <div className="container">
        <h4
          className={
            classes.length === 0 ? "text-danger text-center" : "text-dark m-2"
          }
        >
          {classes.length === 0
            ? "No Classes Scheduled"
            : "All Scheduled Classes"}
        </h4>
        {classes.length !== 0 && (
          <div
            className="row fw-bold p-2"
            style={{ backgroundColor: "lightgrey" }}
          >
            <div className="col-3">Course Name</div>
            <div className="col-2">Start Time</div>
            <div className="col-2">End Time</div>
            <div className="col-3">Facuty Name</div>
            <div className="col-2">Topic</div>
          </div>
        )}
        {classes.length !== 0 &&
          classes &&
          classes.map((st) => {
            let { facultyName, topic, endTime, time, course } = st;
            return (
              <React.Fragment>
                <div
                  className="row border p-2"
                  style={{ backgroundColor: "#ffeb99" }}
                >
                  <div className="col-3">{course}</div>
                  <div className="col-2">{time}</div>
                  <div className="col-2">{endTime}</div>
                  <div className="col-3">{facultyName}</div>
                  <div className="col-2">{topic}</div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}
export default AllClasses;
