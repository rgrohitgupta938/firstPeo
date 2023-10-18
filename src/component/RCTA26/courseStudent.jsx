import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class CourseStudent extends Component {
  state = {
    coursesStu: [],
  };
  async coursesStu() {
    let response = await http.get(`/getStudentCourse/${auth.getUser().name}`);
    let { data } = response;
    console.log(data);
    this.setState({ coursesStu: data });
  }
  componentDidMount() {
    this.coursesStu();
  }
  render() {
    console.log("check render");
    const { coursesStu } = this.state;
    return (
      <div className="container">
        <h4
          className={
            coursesStu.length === 0 ? "text-danger text-center" : "text-dark"
          }
        >
          {coursesStu.length === 0 ? "No Course Assigned" : "Courses Assigned"}
        </h4>
        {coursesStu.length !== 0 && (
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
        {coursesStu.length !== 0 &&
          coursesStu &&
          coursesStu.map((st) => {
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
export default CourseStudent;
