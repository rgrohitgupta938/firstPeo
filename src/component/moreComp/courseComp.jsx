import React, { Component } from "react";
import AddCourse from "./addCourse";
class CourseComp extends Component {
  state = {
    courses: [{courseName: ""},],
    view: 0,
    editCourseIndex: -1,
  };

  showAddCourse = () => {
    let s1 = { ...this.state };
    s1.view = 1;
    this.setState(s1);
  };
  handleSubmit = (arr) => {
    let s1 = { ...this.state };
    s1.editCourseIndex >= 0
      ? (s1.courses[s1.editCourseIndex] = arr)
      : s1.courses.push(arr);
    s1.editCourseIndex = -1;
    s1.view = 0;
    this.setState(s1);
  };
  editCourse = (inx) => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editCourseIndex = inx;
    this.setState(s1);
  };

  render() {
    const { courses, view,editCourseIndex } = this.state;
    let course = {courseName : ""};
    return view === 0 ? (
      <div className="container">
        <button className="btn btn-primary" onClick={this.showAddCourse}>
          Add Course
        </button>
        <br />
        <h5>List of Courses</h5>
        {courses.length === 1 && courses[0].courseName === ""
          ? "There are ZERO Courses"
          : <React.Fragment>
          {courses.map((n, index) => (
              n.courseName === "" ? "" : <li>{n.courseName} <button className="btn btn-warning btn-sm" onClick={() => this.editCourse(index)}>Edit</button></li>
            ))}
        </React.Fragment>}
      </div>
    ) : (
      <AddCourse course={editCourseIndex >= 0 ? courses[editCourseIndex] : course} onSubmit={this.handleSubmit} />
    );
  }
}
export default CourseComp;
