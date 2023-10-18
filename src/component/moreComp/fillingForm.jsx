import React, { Component } from "react";
class FillingForm extends Component {
  state = {
    person: {
      choice: "",
      desig: "",
      name: "",
      colname: "",
      course: "",
    }
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const { person } = this.state;
    let updatedPerson = { ...person };
    updatedPerson[name] = value;
    this.setState({ person: updatedPerson });
  };

  handleSubmit = () => {
    let s1 = this.state.person;
    console.log(s1);
    {
      s1.choice === "working"
        ? alert("Company Name : " + s1.name + " Designation : " + s1.desig)
        : alert("College Name : " + s1.colname + " Course : " + s1.course);
    }
  };

  render() {
    const { choice, desig, colname, course, name } = this.state.person;

    return (
      <div className="container">
        <div className="col-4 border border-dark p-2">
          <h6>Provide Details below</h6>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="choice"
              checked={choice === "working"}
              value="working"
              onChange={this.handleChange}
            />
            <label className="form-check-label">Working</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="choice"
              checked={choice === "studying"}
              value="studying"
              onChange={this.handleChange}
            />
            <label className="form-check-label">Studying</label>
          </div>
          {choice.includes("working") && (
            <React.Fragment>
              <h6>Provide Job Details</h6>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="desig"
                  value={desig}
                  onChange={this.handleChange}
                  placeholder="Enter Designation"
                />
              </div>
            </React.Fragment>
          )}
          {choice.includes("studying") && (
            <React.Fragment>
              <h6>Provide College Details</h6>
              <div className="form-group">
                <label>College Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="colname"
                  value={colname}
                  onChange={this.handleChange}
                  placeholder="Enter College Name"
                />
              </div>
              <div className="form-group">
                <label>Course</label>
                <input
                  type="text"
                  className="form-control"
                  name="course"
                  value={course}
                  onChange={this.handleChange}
                  placeholder="Enter Course"
                />
              </div>
            </React.Fragment>
          )}
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default FillingForm;
