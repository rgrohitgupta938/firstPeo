import React, { Component } from "react";
class SimpleForm2 extends Component {
  state = {
    person: this.props.person,
    countries: [
      "United States of America",
      "Canada",
      "India",
      "United Kingdom",
    ],
    errors: {},
  };

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = {...this.state};
    s1.person[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
  validateAll = () => {
    let { name, age, country } = this.state.person;
    let errors = {};
    errors.name = this.validateName(name);
    errors.age = this.validateAge(age);
    errors.country = this.validateCountry(country);
    return errors;
  };
  validateName = (name) => {
    return !name
      ? "Name must be entered"
      : name.length < 5
      ? "Name should have minimum 5 characters"
      : "";
  };
  validateAge = (age) => {
    return !age
      ? "Age must be entered"
      : age < 21 || age > 75
      ? "Age should be between 21 and 75"
      : "";
  };
  validateCountry = (country) => {
    return !country ? "Country must be Selected" : "";
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.errors.name = this.validateName(input.value);
        break;
      case "age":
        s1.errors.age = this.validateAge(input.value);
        break;
      case "country":
        s1.errors.country = this.validateCountry(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.props.onSubmit(this.state.person);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  render() {
    const { name, age, country } = this.state.person;
    const { countries, errors } = this.state;

    return (
      <div className="container">
        <h5>{this.props.edit ? "Edit Details" : "Enter Details of Person"}</h5>
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
            onBlur={this.handleValidate}
          />
          {errors.name ? (
            <span className="text-danger">{errors.name}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            onChange={this.handleChange}
            placeholder="Enter Age"
            value={age}
            onBlur={this.handleValidate}
          />
          {errors.age ? <span className="text-danger">{errors.age}</span> : ""}
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            className="form-control"
            name="country"
            value={country}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">
              Select the country
            </option>
            {countries.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </select>
          {errors.country ? (
            <span className="text-danger">{errors.country}</span>
          ) : (
            ""
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SimpleForm2;
