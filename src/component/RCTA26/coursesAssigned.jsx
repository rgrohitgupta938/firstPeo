import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class CoursesAssigned extends Component {
  state = {
    courses: [],
  };
  async getCourses() {
    let response = await http.get(`/getFacultyCourse/${auth.getUser().name}`);
    let { data } = response;
    this.setState({ courses: data });
  }
  componentDidMount() {
    this.getCourses();
  }
  render() {
    console.log("check render");
    const { courses } = this.state;
    return (
      <div className="container">
        <h4 className={courses.length === 0 ? "text-danger" : "text-dark"}>
          {courses.length === 0
            ? "No Assigened Courses Found"
            : "Courses Assigned"}
        </h4>
        {courses.length !== 0 && (
          <div
            className="row fw-bold p-2"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="col-2">CourseId</div>
            <div className="col-3">Course Name</div>
            <div className="col-3">Course Code</div>
            <div className="col-4">Description</div>
          </div>
        )}
        {courses.length !== 0 &&
          courses &&
          courses.map((st) => {
            let { description, code, name, courseId } = st;
            return (
              <React.Fragment>
                <div
                  className="row border p-2"
                  style={{ backgroundColor: "#99e6ff" }}
                >
                  <div className="col-2">{courseId}</div>
                  <div className="col-3">{name}</div>
                  <div className="col-3">{code}</div>
                  <div className="col-4">{description}</div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}
export default CoursesAssigned;
