import React, { Component } from "react";
import pic from "./pic1.avif";
class Admin extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="text-danger text-center">Welcome to GBI Bank</h3>
        <div className="text-center">
          <img src={pic} className="text-center" height="500px" />
        </div>
      </div>
    );
  }
}
export default Admin;
