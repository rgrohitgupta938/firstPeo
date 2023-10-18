import React, { Component } from "react";
import http from "../../../services/httpService";
class AddUser extends Component {
  state = {
    user: { username: "", name: "", password: "", role: "" },
    roles: ["user", "admin"],
    edit: false,
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.user[input.name] = input.value;
    this.setState(s1);
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  async fetchData() {
    const { username } = this.props.match.params;
    if (username) {
      let response = await http.get(`/productApp/users/${username}`);
      let { data } = response;
      console.log("if", data);
      this.setState({ user: data, edit: true });
    } else {
      let user = { username: "", name: "", password: "", role: "" };
      this.setState({ user: user, edit: false });
    }
  }
  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      this.props.history.push("/users");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        let s1 = { ...this.state };
        let errors = {};
        errors.username = err.response.data;
        s1.errors.username = errors.username;
        this.setState(s1);
      }
    }
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/users");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(this.state.user);
      let { user, edit } = this.state;
      edit
        ? this.putData(`/productApp/users/${user.username}`, user)
        : this.postData("/productApp/users", user);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { username, name, password, role } = this.state.user;
    let errors = {};
    errors.username = this.validateName(username);
    errors.name = this.validateName(name);
    errors.password = this.validatePassword(password);
    errors.role = this.validateRole(role);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateUserName = (username) => {
    return !username
      ? "Username must be entered"
      : username.length < 6
      ? "Username should have minimum 6 characters"
      : "";
  };
  validateName = (name) => {
    return !name ? "Name must be entered" : "";
  };
  validatePassword = (password) => {
    return !password
      ? "Password must be entered"
      : password.length < 6
      ? "Password should have minimum 6 characters"
      : "";
  };
  validateRole = (role) => {
    return !role ? "Role must be selected" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };

  render() {
    const { username, name, password, role } = this.state.user;
    const { roles, edit, errors } = this.state;
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
            readOnly={edit}
          />
          {errors && errors.username && (
            <span className="bg-danger">{errors.username}</span>
          )}
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
            readOnly={edit}
          />
          {errors && errors.name && (
            <span className="bg-danger">{errors.name}</span>
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
            readOnly={edit}
          />
          {errors && errors.password && (
            <span className="bg-danger">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            className="form-control"
            name="role"
            value={role}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">
              Select the Role
            </option>
            {roles.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </select>
          {errors && errors.role ? (
            <span className="text-danger">{errors.role}</span>
          ) : (
            ""
          )}
        </div>
        <button
          className="btn btn-primary m-2"
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default AddUser;
