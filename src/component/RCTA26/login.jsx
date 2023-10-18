import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class Login extends Component {
  state = {
    user: { email: "", password: "" },
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
      window.location = data
        ? data.role === "admin"
          ? "/admin"
          : data.role === "student"
          ? "/student"
          : data.role === "faculty"
          ? "/faculty"
          : "/login"
        : "/login";
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
    const { email, password } = this.state.user;
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
          <div className="col-1">
            <label>
              Email <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              placeholder="Enter Your Email"
              value={email}
            />
            <small className="text-secondary text-center">
              We'll never share your email with anyone else.
            </small>
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-1">
            <label>
              Password <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Enter Password"
              value={password}
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
