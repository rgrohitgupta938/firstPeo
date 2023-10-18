import React, { Component } from "react";
import http from "./httpService";
class User extends Component {
  state = {
    user: {},
    errMsg: "",
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      let response = await http.get("/user");
      let { data } = response;
      console.log(data);
      this.setState({ user: data });
    } catch (ex) {
      if (ex.response) {
        console.log(ex.response);
        let errMsg = `${ex.response.status} ${ex.response.statusText}`;
        this.setState({ user: {}, errMsg: errMsg });
      }
    }
  }
  render() {
    const { user, errMsg } = this.state;
    console.log(user);
    return (
      <div className="container">
        <h4>Welcome to the User page</h4>
        {!errMsg ? (
          <React.Fragment>
            User Id: {user.id} <br />
            Name: {user.name} <br />
            Role : {user.role} <br />
          </React.Fragment>
        ) : (
          ""
        )}
        {errMsg && <h6>{errMsg}</h6>}
      </div>
    );
  }
}
export default User;
