import React, { Component } from "react";
class NewEmployee extends Component {
  state = {
    employeeInfo: this.props.employeeInfo,
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.employeeInfo[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.employeeInfo);
    this.props.history.push("/employees/1");
  }
  render() {
    let { id,name,dept,designation } =
      this.state.employeeInfo;
    return (
      <div className="container">
        <div className="form-group">
          <label>Employee Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            placeholder="Enter Employee id"
            value={id}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            id="dept"
            name="dept"
            onChange={this.handleChange}
            placeholder="Enter Department"
            value={dept}
          />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            className="form-control"
            id="designation"
            name="designation"
            onChange={this.handleChange}
            placeholder="Enter Designation"
            value={designation}
          />
        </div>
        
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewEmployee;
