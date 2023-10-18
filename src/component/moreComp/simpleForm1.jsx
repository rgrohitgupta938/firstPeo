import React, { Component } from "react";
class SimpleForm1 extends Component {
  state = {
    course: [{ courseName: "", desc: "", duration: "", faculty: "" }],
  };

  handleChange = (e) => {
    console.log(e.currentTarget);
    let s1 = { ...this.state };
    s1.course[e.currentTarget.name] = e.currentTarget.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let {courseName,faculty,desc,duration} = this.state.course
    console.log("Course Deatils Submitted.Name :",courseName,", Description :",desc,", Duration :",duration,", Faculty :",faculty );
  };

  render() {
    let { courseName, desc, duration, faculty } = this.state.course;
    console.log(this.props.edit);
    return (
      <div className="container">
        <h5>{this.props.edit ? "Edit Details" : "Enter Details of Course"}</h5>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            name="courseName"
            onChange={this.handleChange}
            placeholder="Enter Course Name"
            value={courseName}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            onChange={this.handleChange}
            placeholder="Enter Course Description"
            value={desc}
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            onChange={this.handleChange}
            placeholder="Enter Course duration"
            value={duration}
          />
        </div>
        <div className="form-group">
          <label>Faculty</label>
          <input
            type="text"
            className="form-control"
            id="faculty"
            name="faculty"
            onChange={this.handleChange}
            placeholder="Enter Faculty Name"
            value={faculty}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default SimpleForm1;
