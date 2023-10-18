import React, { Component } from "react";
import http from "./httpService";
class AddStar extends Component {
  state = {
    star: { name: "", info: "", dob: "", country: "", sport: "" },
    sports: ["Cricket", "Football"],
    countries: [
      "India",
      "Australia",
      "Portugal",
      "Argentina",
      "Brazil",
      "France",
    ],
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.star[input.name] = input.value;
    this.setState(s1);
  };
  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/stars");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.postData("/sporticons/star", this.state.star);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { name, info, dob, sport, country } = this.state.star;
    let errors = {};
    errors.name = this.validateName(name);
    errors.info = this.validateInfo(info);
    errors.dob = this.validateDoB(dob);
    errors.sport = this.validateSport(sport);
    errors.country = this.validateCountry(country);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateName = (name) => {
    return !name ? "Name must be entered" : "";
  };
  validateInfo = (info) => {
    return !info ? "Information must be entered" : "";
  };
  validateDoB = (dob) => {
    return !dob ? "Date of Birth must be entered" : "";
  };
  validateSport = (sport) => {
    return !sport ? "Select Sport" : "";
  };
  validateCountry = (country) => {
    return !country ? "Select Country" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  render() {
    let { name, dob, sport, country, info } = this.state.star;
    let { countries, sports, errors } = this.state;
    return (
      <div className="container">
        <h2 className="text-center">New Sports Star</h2>
        <div className=" form-group row mt-2">
          <div className="col-2 text-center">
            <label>Name</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.handleChange}
                placeholder="Enter Name"
                value={name}
              />
              {errors.name ? (
                <span className="text-danger">{errors.name}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2 text-center">
            <label>Info</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="info"
                name="info"
                onChange={this.handleChange}
                placeholder="Enter Info"
                value={info}
              />
              {errors.info ? (
                <span className="text-danger">{errors.info}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2 text-center">
            <label>DoB</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="dob"
                name="dob"
                onChange={this.handleChange}
                placeholder="Enter Info"
                value={dob}
              />
              {errors.dob ? (
                <span className="text-danger">{errors.dob}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-2 text-center">
            <label>Country</label>
          </div>
          <div className="col-6">
            <div className="form-group">
              <select
                className="form-control"
                name="country"
                value={country}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Country
                </option>
                {countries.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {errors.country ? (
                <span className="text-danger">{errors.country}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-2 text-center">
            <label>Genre</label>
          </div>
          <div className="col-6">
            <div className="form-group">
              <select
                className="form-control"
                name="sport"
                value={sport}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Sport
                </option>
                {sports.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {errors.sport ? (
                <span className="text-danger">{errors.sport}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            {" "}
            <button
              className="btn btn-primary m-2"
              onClick={this.handleSubmit}
              disabled={!this.isFormValid()}
            >
              Submit
            </button>
          </div>
          <div className="col-5"></div>
        </div>
      </div>
    );
  }
}
export default AddStar;
