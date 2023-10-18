import React, { Component } from "react";
import http from "../../../services/httpService";
class Users extends Component {
  state = { users: [] };
  async componentDidMount() {
    this.getUserData();
  }
  async getUserData() {
    let response = await http.get("/productApp/users");
    let { data } = response;
    console.log(data);
    this.setState({ users: data });
  }
  handleEdit = (username) => {
    this.props.history.push(`/addUser/${username}/edit`);
  };
  handleDelete = (username) => {
    this.props.history.push(`/addUser/${username}/delete`);
  };
  handleAddUser = () => {
    this.props.history.push("/addUser");
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h4>Welcome to the list of Users</h4>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleAddUser()}
        >
          Add User
        </button>
        {users.map((user) => (
          <div className="row" key={user.username}>
            <div className="col-2 border">{user.username}</div>
            <div className="col-2 border">{user.name}</div>
            <div className="col-2 border">{user.role}</div>
            <div className="col-2 border">
              <button
                className="btn btn-warning btn-sm m-1"
                onClick={() => this.handleEdit(user.username)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => this.handleDelete(user.username)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Users;
