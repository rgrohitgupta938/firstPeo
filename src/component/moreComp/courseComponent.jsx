import React, { Component } from "react";
import CourseForm from "./courseForm";
import StudentForm from "./studentForm";
class CourseComponent extends Component {
  state = {
    courses: [
      { courseName: "Javascript", faculty: "Bill", lectures: 20, students: [] },
      { courseName: "React", faculty: "Steve", lectures: 26, students: [] },
    ],
    view: 0,
    editCourseIndex: -1,
    viewCourseIndex: -1,
  };

  handleCourse = (course) => {
    console.log("In handle Person", course);
    let s1 = { ...this.state };
    s1.editCourseIndex >= 0
      ? (s1.courses[s1.editCourseIndex] = course)
      : s1.courses.push(course);
    s1.view = 0;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  showForm = () => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  editCourse = (inx) => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editCourseIndex = inx;
    this.setState(s1);
  };
  delCourse = (inx) => {
    let s1 = { ...this.state };
    s1.view = 0;
    s1.courses.splice(inx, 1);
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  viewCourseDetails = (inx) => {
    let s1 = { ...this.state };
    s1.view = 2;
    s1.viewCourseIndex = inx;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  showCourseDeatils = () => {
    let { courses, viewCourseIndex, view } = this.state;
    console.log(viewCourseIndex);
    let { courseName, faculty, lectures, students } = courses[viewCourseIndex];
    console.log(courseName);
    return (
      <div className="container">
        <h5>Course Name : {courseName} </h5>
        <h5>Faculty : {faculty}</h5>
        <h5>Number of Lectures : {lectures}</h5>
        <h5>Number of students : {students.length}</h5>
        {students.length === 0 ? (
          ""
        ) : (
          <React.Fragment>
            {students.map((n) => (
              <div className="row">
                <div className="col-6 border">{n.id}</div>
                <div className="col-6 border">{n.name}</div>
              </div>
            ))}
          </React.Fragment>
        )}
        {view === 2 ? (
          <button
            className="btn btn-primary m-2"
            onClick={() => this.showStudentForm()}
          >
            Enroll More Students
          </button>
        ) : (
          <StudentForm student={{}} onSubmit={this.handleStudent} />
        )}
        <br />
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showCourseList()}
        >
          Show List of Courses
        </button>
      </div>
    );
  };
  handleStudent = (student) => {
    let s1 = { ...this.state };
    s1.courses[s1.viewCourseIndex].students.push(student);
    s1.view = 2;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  showCourseList = () => {
    let s1 = { ...this.state };
    s1.view = 0;
    s1.viewCourseIndex = -1;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };
  showStudentForm = () => {
    let s1 = { ...this.state };
    s1.view = 3;
    s1.editCourseIndex = -1;
    this.setState(s1);
  };

  render() {
    let course = { courseName: "", faculty: "", lectures: "", students: []};
    let { courses, view, editCourseIndex } = this.state;
    return view === 0 ? (
      <div className="container">
        {courses.map((p1,index) => (
          <div className="row">
            <div className="col-2 border">{p1.courseName}</div>
            <div className="col-2 border">{p1.faculty}</div>
            <div className="col-2 border">{p1.lectures}</div>
            <div
              className="col-2 border"
              onClick={() => this.viewCourseDetails(index)}
            >
              {p1.students.length}
            </div>
            <div className="col-4 border">
              <button
                className="btn btn-warning btn-sm ms-2 me-2"
                onClick={() => this.editCourse(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ms-2 me-2"
                onClick={() => this.delCourse(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => this.showForm()}>
          Add New Course
        </button>
      </div>
    ) : view === 1 ? (
      <CourseForm
        course={editCourseIndex >= 0 ? courses[editCourseIndex] : course}
        onSubmit={this.handleCourse}
        edit={editCourseIndex >= 0}
      />
    ) : view === 2 ? (
      this.showCourseDeatils()
    ) : (
      this.showCourseDeatils()
    );
  }
}
export default CourseComponent;
