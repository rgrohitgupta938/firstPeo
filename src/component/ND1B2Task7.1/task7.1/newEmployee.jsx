import React, { Component } from "react";
import http from "./httpService";
class NewEmployee extends Component {
  state = {
    employee: {
      name: "",
      department: "",
      designation: "",
      empcode: "",
      salary: "",
      gender: "",
    },
    departments: ["Finance", "Marketing", "Operations", "HR", "Technology"],
    designations: ["Manager", "Trainee", "VP"],
    edit: false,
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    if (+id) {
      let response = await http.get(`/svr/employees/${+id}`);
      let { data } = response;
      console.log("if", data);
      let emp = {
        name: data[0].name,
        designation: data[0].designation,
        department: data[0].department,
        salary: data[0].salary,
        gender: data[0].gender,
        empcode: data[0].empcode,
      };
      console.log(emp);
      this.setState({ employee: emp, edit: true }, () => {
        console.log(this.state.employee || 0);
      });
    } else {
      let employee = {
        name: "",
        department: "",
        designation: "",
        empcode: "",
        salary: "",
        gender: "",
      };
      this.setState({ employee: employee, edit: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "radio" ? (checked ? value : "") : value;
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [name]: inputValue,
      },
    }));
  };
  async postData(url, obj) {
    console.log(obj);
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/employees");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/employees");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { employee, edit } = this.state;
    edit
      ? this.putData(`/svr/employees/${employee.empcode}`, employee)
      : this.postData("/svr/employees", employee);
  };
  render() {
    const { departments, designations, edit } = this.state;
    let { name, department, designation, empcode, salary, gender } =
      this.state.employee;
    console.log(name, department, designation, empcode, salary, gender);
    return (
      <div className="container">
        <div className="form-group">
          <label>EmpCode</label>
          <input
            type="text"
            className="form-control"
            id="empcode"
            name="empcode"
            onChange={this.handleChange}
            placeholder="Enter EmpCode"
            readOnly={edit}
            value={empcode}
            style={{ backgroundColor: edit ? "whitesmoke" : "" }}
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
            defaultValue={name}
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            onChange={this.handleChange}
            placeholder="Enter Salary"
            value={salary}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <select
            className="form-control"
            name="department"
            value={department}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select a Department
            </option>
            {departments.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Designation</label>
          <select
            className="form-control"
            name="designation"
            value={designation}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Designation
            </option>
            {designations.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="maleRadio"
            checked={gender === "Male"}
            value="Male"
            onChange={this.handleChange}
          />
          <label className="form-check-label" htmlFor="maleRadio">
            Male
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="femaleRadio"
            checked={gender === "Female"}
            value="Female"
            onChange={this.handleChange}
          />
          <label className="form-check-label" htmlFor="femaleRadio">
            Female
          </label>
        </div>

        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewEmployee;
