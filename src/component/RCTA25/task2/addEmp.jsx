import React, { Component } from "react";
import http from "../../../services/httpService";
class AddEmp extends Component {
  state = {
    emp: { name: "", email: "", password: "", role: "EMPLOYEE" },
    repassword: "",
    errors: {},
  };
  async postEmp(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Employeee Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status === 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    input.name !== "repassword"
      ? (s1.emp[input.name] = input.value)
      : (s1.repassword = input.value);
    this.handleValidate(e);
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { emp } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(emp);
      this.postEmp("/empapp/emps", emp);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { email, name, password } = this.state.emp;
    let { emp, repassword } = this.state;
    let errors = {};
    errors.email = this.validateEmail(email);
    errors.name = this.validateName(name);
    errors.password = this.validatePassword(password);
    errors.repassword = this.validateRePassword(repassword, password);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateEmail = (email) => {
    return !email
      ? "Email must be entered"
      : !email.includes("@")
      ? "Not a Valid Email"
      : "";
  };
  validateName = (name) => {
    return !name
      ? "Name must be entered"
      : name.length < 8
      ? "Name should have atleast 8 characters"
      : "";
  };
  validateRePassword = (repassword, password) => {
    return !repassword
      ? "Re-Enter the Password"
      : repassword !== password
      ? "Password Do Not Match"
      : "";
  };
  validatePassword = (password) => {
    let { repassword } = this.state;
    if (!password) {
      return "Enter password";
    } else if (password.length < 8) {
      return "Password should have at least 8 characters";
    } else {
      let hasLowerCase = false;
      let hasUpperCase = false;
      let hasDigit = false;

      for (let i = 0; i < password.length; i++) {
        const char = password[i];
        if (char >= "a" && char <= "z") {
          hasLowerCase = true;
        } else if (char >= "A" && char <= "Z") {
          hasUpperCase = true;
        } else if (char >= "0" && char <= "9") {
          hasDigit = true;
        }
      }

      if (!hasLowerCase) {
        return "Password must include at least one lowercase letter";
      } else if (!hasUpperCase) {
        return "Password must include at least one uppercase letter";
      } else if (!hasDigit) {
        return "Password must include at least one digit";
      }

      return "";
    }
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.errors.name = this.validateName(input.value);
        break;
      case "email":
        s1.errors.email = this.validateEmail(input.value);
        break;
      case "password":
        s1.errors.password = this.validatePassword(input.value);
        break;
      case "repassword":
        s1.errors.repassword = this.validateRePassword(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };

  render() {
    const { name, email, password } = this.state.emp;
    const { repassword, errors } = this.state;
    return (
      <div className="container">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <h4 className="text-center mb-3">Add New Employee</h4>
        <div className="text-center">
          {" "}
          {errors && errors.succ && (
            <span className="text-success" style={{ fontSize: "24px" }}>
              {errors.succ}
            </span>
          )}
        </div>
        <div className="text-center">
          {" "}
          {errors && errors.fail && (
            <span className="text-danger" style={{ fontSize: "24px" }}>
              {errors.fail}
            </span>
          )}
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Name</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.handleChange}
              placeholder="Enter the Employees's Name"
              value={name}
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
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Email:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              placeholder="Enter the Employee's Email"
              value={email}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Password</label>
          </div>
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Enter the Password"
              value={password}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1"></div>
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              id="repassword"
              name="repassword"
              onChange={this.handleChange}
              placeholder="Re-Enter the Password"
              value={repassword}
              onBlur={this.handleValidate}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.repassword && (
              <span className="text-danger">{errors.repassword}</span>
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
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
export default AddEmp;
