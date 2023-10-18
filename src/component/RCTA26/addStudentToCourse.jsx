import React, { Component } from "react";
import http from "../../services/httpService";
class AddStudentToCourse extends Component {
  state = {
    course: {
      students: [],
      faculty: [],
      description: "",
      code: "",
      name: "",
      courseId: "",
    },
    courses: [],
    view: -1,
    edit: "",
    studentNames: [],
  };
  async courses() {
    try{
      let response = await http.get(`/getCourses`);
    console.log(response);
    let { data } = response;
    this.setState({
      courses: data,
    });
    console.log(this.state.courses);
    }
    catch(ex){
      if(ex.response && ex.response.status === 500){
        this.setState({})
      }
    }
  }
  async putCourse(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
  }
  async getStuNames() {
    let response = await http.get(`/getStudentNames`);
    console.log(response);
    let { data } = response;
    this.setState({
      studentNames: data,
    });
    console.log(this.state.studentNames);
  }
  componentDidMount() {
    this.courses();
    this.getStuNames();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.courses();
  }
  handleEdit = (id) => {
    this.setState({
      view: 0,
      course: id,
    });
  };
  makeCheckBox = (arr, values, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check" key={ch}>
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              checked={values.includes(ch)}
              value={ch}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch}</label>
          </div>
        ))}
      </React.Fragment>
    );
  };
  handleUpdate = (e) => {
    e.preventDefault();
    let { course } = this.state;
    this.putCourse("/putCourse", course);
    alert("Student Added to Cousre :" + course.name);
    this.setState({ view: -1, course: {} });
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    const updatedCourse = { ...this.state.course };
    updatedCourse.students = this.updateCBs(
      updatedCourse.students,
      input.checked,
      input.value
    );
    this.setState({ course: updatedCourse });
  };
  updateCBs = (inpArr, checked, value) => {
    if (checked) {
      inpArr.push(value);
    } else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) {
        inpArr.splice(index, 1);
      }
    }
    return inpArr;
  };

  render() {
    const { courses, view, studentNames } = this.state;
    let { students, faculty, description, code, name, courseId } =
      this.state.course;
    return (
      <div className="container">
        <h4>Add students to a course</h4>
        {view === -1 && (
          <div className="row fw-bold p-1">
            <div className="col-1">CourseId</div>
            <div className="col-3">Name</div>
            <div className="col-2">Course Code</div>
            <div className="col-3">Description</div>
            <div className="col-2">Students</div>
            <div className="col-1"></div>
          </div>
        )}
        {view === -1 &&
          courses &&
          courses.map((st) => {
            let { students, faculty, description, code, name, courseId } = st;
            return (
              <React.Fragment>
                <div className="row border bg-warning">
                  <div className="col-1">{courseId}</div>
                  <div className="col-3">{name}</div>
                  <div className="col-2">{code}</div>
                  <div className="col-3">{description}</div>
                  <div className="col-2">
                    {students.map((student, index) => (
                      <div key={index}>{student}</div>
                    ))}
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => this.handleEdit(st)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        {view === 0 && (
          <React.Fragment>
            <h4>Edit the Course</h4>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.handleChange}
                placeholder=""
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="code"
                onChange={this.handleChange}
                placeholder=""
                value={code}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.handleChange}
                placeholder=""
                value={description}
              />
            </div>
            {this.makeCheckBox(studentNames, students, "students", "Students")}
            <button
              className="btn btn-primary btn-sm"
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default AddStudentToCourse;
