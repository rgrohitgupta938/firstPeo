import React, { Component } from "react";
class AddNewStore extends Component {
  state = {
    storeInfo: this.props.storeInfo,
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.storeInfo[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.storeInfo);
    this.props.history.push("/stores");
  }
  render() {
    let { id,email,location,mobile } =
      this.state.storeInfo;
    return (
      <div className="container">
        <div className="form-group">
          <label>Store Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            placeholder="Enter Store id"
            value={id}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            onChange={this.handleChange}
            placeholder="Enter Location"
            value={location}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter Email"
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            onChange={this.handleChange}
            placeholder="Enter mobile"
            value={mobile}
          />
        </div>
        
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddNewStore;
