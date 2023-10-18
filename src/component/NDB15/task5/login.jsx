import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class Login extends Component {
  state = {
    form: { email: "", password: "" },
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.form[input.name] = input.value;
    this.setState(s1);
  };
  async login(url, obj) {
    try {
      let response = await http.post(url, obj);
      let { data } = response;
      if (this.props.view !== undefined) {
        auth.login(data);
        window.location = "/orderSummary";
      } else {
        auth.login(data);
        window.location = "/products";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = {};
        errors.email = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login("/login", this.state.form);
  };
  render() {
    let { email, password } = this.state.form;
    let { errors } = this.state;
    console.log(this.props.orders, this.props.view);
    return (
      <div className="container">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter Email Address"
            value={email}
          />
          {errors && errors.email && (
            <span className="bg-danger">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
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
            <span className="bg-danger">{errors.password}</span>
          )}
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default Login;
