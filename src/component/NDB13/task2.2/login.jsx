import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
import Cookies from "js-cookie";
class Login extends Component {
  state = {
    user: { empCode: "", name: "" },
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.user[input.name] = input.value;
    this.setState(s1);
  };
  async login(url, obj) {
    try {
      let response = await http.post(url, obj);
      let { data } = response;
      auth.login(data);
      console.log(data);
      Cookies.set("empCode", obj.empCode);
      window.location = "/main";
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        let errors = {};
        console.log(ex.response);
        errors.error = "Invalid Email/Password";
        console.log(errors.error);
        this.setState({ errors: errors });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login("/login", this.state.user);
  };
  render() {
    const { name, empCode } = this.state.user;
    const { errors } = this.state;
    return (
      <div className="container">
        <h5 className="text-center">Login</h5>
        {errors && errors.error && (
          <span className="text-danger text-center">
            {errors.error} Check the Email and Password
          </span>
        )}
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>
              Employee Code{" "}
              <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="empCode"
              name="empCode"
              onChange={this.handleChange}
              placeholder="Enter Your Employee Code"
              value={empCode}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>
              Name <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-6">
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
            Login
          </button>
        </div>
      </div>
    );
  }
}
export default Login;
