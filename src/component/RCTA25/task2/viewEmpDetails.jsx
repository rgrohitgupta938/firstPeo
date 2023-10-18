import React, { Component } from "react";
import http from "../../../services/httpService";
class ViewEmpDetails extends Component {
  state = {
    empDetails: {
      manager: "",
      designation: "",
      department: "",
      empuserid: this.props.match.params.id,
    },
    edit: false,
    errors: {},
  };
  async fetchDetails() {
    const { id } = this.props.match.params;
    if (id) {
      let response = await http.get(`/empapp/empdept/${id}`);
      let { data } = response;
      let {
        manager = "",
        designation = "",
        department = "",
        empuserid = empuserid,
      } = data;
      console.log("if", data);
      this.setState({ empDetails: data, edit: false });
    } else {
      let empDetails = { manager: "", designation: "", department: "" };
      this.setState({ empDetails: empDetails, edit: true });
    }
  }
  async postEmpDetails(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Details have been Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status === 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  componentDidMount() {
    this.fetchDetails();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchDetails();
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.empDetails[input.name] = input.value;
    this.setState(s1);
  };
  validateAll = () => {
    let { manager, department, designation } = this.state.empDetails;
    let errors = {};
    errors.manager = this.validateManager(manager);
    errors.department = this.validateDepartment(department);
    errors.designation = this.validateDesignation(designation);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateManager = (manager) => {
    return !manager ? "Email must be entered" : "";
  };
  validateDesignation = (designation) => {
    return !designation ? "Name must be entered" : "";
  };
  validateDepartment = (department) => {
    return !department ? "Name must be entered" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { empDetails } = this.state;
    let { id } = this.props.match.params;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(empDetails);
      this.postEmpDetails(`/empapp/empdept/${id}`, empDetails);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    const { manager, designation, department } = this.state.empDetails;
    let { edit, errors } = this.state;
    return (
      <div className="container">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <h4 className="text-center">Department Details of New Employee</h4>
        <div className="text-center" style={{ fontSize: "18px" }}>
          {" "}
          {errors && !errors.succ ? (
            !manager && !department && !designation ? (
              <span className="text-danger fw-bold">
                No Department Details Found. Please Enter Them
              </span>
            ) : (
              <span className="text-success fw-bold">
                Displaying Department Details
              </span>
            )
          ) : (
            <span className="text-success fw-bold">{errors.succ}</span>
          )}
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Department:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              onChange={this.handleChange}
              placeholder="Enter the Employee's Department"
              value={department}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Designation</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="designation"
              name="designation"
              onChange={this.handleChange}
              placeholder="Enter the Employee's Designation"
              value={designation}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.designation && (
              <span className="text-danger">{errors.designation}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Managers's Name</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="manager"
              name="manager"
              onChange={this.handleChange}
              placeholder="Enter the Manager's Name"
              value={manager}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.name && (
              <span className="text-danger">{errors.name}</span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            borderRadius: "0",
          }}
        >
          <button
            className="btn btn-primary fw-bold"
            onClick={this.handleSubmit}
            disabled={!this.isFormValid()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default ViewEmpDetails;
