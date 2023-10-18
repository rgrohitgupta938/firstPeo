import React, { Component } from "react";
class CourseForm extends Component {
    state = {
        course: this.props.course,
    };
  
    handleChange = (e) => {
      console.log(e.currentTarget);
      let s1 = { ...this.state };
      s1.course[e.currentTarget.name] = e.currentTarget.value;
      this.setState(s1);
    };
    handleSubmit = (e) => {
      e.preventDefault();
      console.log("Handle Submit", this.state.course);
      this.props.onSubmit(this.state.course);
    };
  
    render() {
      let { courseName, lectures,faculty } = this.state.course;
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
          <div className="form-group">
            <label>Lectures</label>
            <input
              type="number"
              className="form-control"
              id="lectures"
              name="lectures"
              onChange={this.handleChange}
              placeholder="Enter Number of Lectures"
              value={lectures}
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            {this.props.edit === true ? "Update Course" : "Add Course"}
          </button>
        </div>
      );
    }
  }
export default CourseForm;
