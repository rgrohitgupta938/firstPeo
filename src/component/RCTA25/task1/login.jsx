import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class Login extends Component {
  state = {
    form: { username: "", password: "" },
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
      auth.login(data);
      //this.props.history.push("/products");
      window.location = "/products";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = {};
        errors.username = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login("/productApp/login", this.state.form);
  };
  render() {
    let { username, password } = this.state.form;
    let { errors } = this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={this.handleChange}
            placeholder="Enter User Name"
            value={username}
          />
          {errors && errors.username && (
            <span className="bg-danger">{errors.username}</span>
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
