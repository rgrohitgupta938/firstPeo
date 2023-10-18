import React, { Component } from "react";
import http from "./httpService";
import auth from "./authservice";
class Login extends Component {
  state = {
    form: { username: "", password: "" },
    errMsg: "",
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.form[input.name] = input.value;
    this.setState(s1);
  };
  async login(url, obj) {
    try {
      let headerKey = "authorization";
      let response = await http.post(url, obj);
      let { data, headers } = response;
      console.log(response);
      let token = headers[headerKey];
      console.log("Login data :", data);
      console.log("Token", token);
      auth.storeToken(token);
      this.props.history.push("/user");
    } catch (ex) {
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      this.setState({ errMsg: errMsg });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login("/user", this.state.form);
  };
  render() {
    const { username, password } = this.state.form;
    const { errMsg } = this.state;
    return (
      <div className="container">
        <h5 className="text-center">Login</h5>
        {errMsg && (
          <span className="text-danger text-center">
            {errMsg} Check the Email and Password
          </span>
        )}
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>
              User Name <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={this.handleChange}
              placeholder="Enter User Name"
              value={username}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
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
