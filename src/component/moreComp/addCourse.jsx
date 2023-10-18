import React, { Component } from "react";
class AddCourse extends Component{
    state = {
        course: this.props.course,
    };

    handleChange = (e) => {
        console.log(e.currentTarget);
        let s1 = { ...this.state };
        s1.course[e.currentTarget.name] = e.currentTarget.value
        this.setState(s1);
      };
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.course);
      };


    render() {
        const {courseName} = this.state.course;
        return (
          <div className="container">
            <h5></h5>
            <div className="form-group">
              <label>Add Course</label>
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
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        );
      }
}
export default AddCourse;
