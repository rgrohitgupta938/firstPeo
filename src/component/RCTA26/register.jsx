import React, { Component } from "react";
import http from "../../services/httpService";
class Register extends Component {
  state = {
    news: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
    repassword: "",
    errors: {},
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.handleValidate(e);

    if (name === "repassword") {
      console.log("Repassword changed:", value);
      this.setState({ repassword: value }, () => {
        this.handleRepasswordValidation();
      });
    } else {
      this.setState((prevState) => ({
        news: {
          ...prevState.news,
          [name]: value,
        },
      }));
    }
  };
  handleRepasswordValidation = () => {
    const {
      repassword,
      news: { password },
    } = this.state;
    const errors = { ...this.state.errors };
    errors.repassword = repassword !== password ? "Passwords Do Not Match" : "";
    console.log(errors.repassword, password);
    this.setState({ errors });
  };

  async register(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Registered Successfully";
      this.setState({ errors: errors });
    } catch (ex) {
      let st =
        ex.response && ex.response.status !== 200 ? alert("Error occured") : "";
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { news } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(news);
      this.register("/register", news);
      alert("Registered Successfully");
      this.props.history.push("/admin");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { name, password, role, email } = this.state.news;
    let { news, repassword } = this.state;
    let errors = {};
    errors.role = this.validateRole(role);
    errors.name = this.validateName(name);
    errors.email = this.validateEmail(email);
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
  validateRole = (role) => {
    return !role ? "Select Role" : "";
  };
  validateRePassword = (repassword, password) => {
    return repassword !== password ? "Passwords Do Not Match" : "";
  };
  validatePassword = (password) => {
    let { repassword } = this.state;
    if (!password) {
      return "Password can not be blank.Minimum length should be 7 characters";
    } else if (password.length < 7) {
      return "Password should have at least 7 characters";
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
      case "password":
        s1.errors.password = this.validatePassword(input.value);
        break;
      case "repassword":
        s1.errors.repassword = this.validateRePassword(input.value);
        break;
      case "email":
        s1.errors.email = this.validateEmail(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  render() {
    const { name, role, email, password } = this.state.news;
    const { repassword, errors } = this.state;
    return (
      <div className="container">
        <h3>Register</h3>
        <div className="form-group">
          <label>
            Name<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Name"
            value={name}
          />
          {errors && errors.name && (
            <span className="text-danger">{errors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Password<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Enter Password"
            value={password}
          />
          {errors && errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Confirm Password
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="repassword"
            name="repassword"
            onChange={this.handleChange}
            placeholder="Re-Enter your password"
            value={repassword}
          />
          {errors && errors.repassword && (
            <span className="text-danger">{errors.repassword}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Email<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter Email"
            value={email}
          />
          {errors && errors.email && (
            <span className="text-danger">{errors.email}</span>
          )}
        </div>
        <label className="fw-bold">
          Role<span className="required-asterisk text-danger">*</span>
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Student</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            value="faculty"
            checked={role === "faculty"}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Faculty</label>
        </div>
        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
        >
          Register
        </button>
      </div>
    );
  }
}
export default Register;
