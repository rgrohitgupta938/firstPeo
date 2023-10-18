import React, { Component } from "react";
class StudentForm extends Component {
  state = {
    student: this.props.student,
  };

  handleChange = (e) => {
    let s1 = { ...this.state };
    s1.student[e.currentTarget.name] = e.currentTarget.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.student);
  };
  render() {
    let { name, course,year } = this.state.student;
    return (
      <div className="container">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Student Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            id="course"
            name="course"
            onChange={this.handleChange}
            placeholder="Enter Course Name"
            value={course}
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            onChange={this.handleChange}
            placeholder="Enter Year of Passing"
            value={year}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default StudentForm;
