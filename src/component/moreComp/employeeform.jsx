import React, { Component } from "react";
class EmployeeForm extends Component {
  state = {
    employee: {
      name: "",
      age: "",
      email: "",
      city: "",
      address: "",
    },
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.employee[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(errors);
      alert("Submitted Succesfully");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  validateAll = () => {
    let { name, age, email, city } = this.state.employee;
    let errors = {};
    errors.name = this.validateName(name);
    errors.age = this.validateAge(age);
    errors.city = this.validateCity(city);
    errors.email = this.validateEmail(email);
    return errors;
  };
  validateName = (name) => {
    return !name
      ? "Name must be entered"
      : name.length < 5
      ? "Name should have minimum 5 characters"
      : "";
  };
  validateEmail = (email) => {
    return !email
      ? "Email must be entered"
      : email.includes("@")
      ? ""
      : "Enter correct Email";
  };
  validateCity = (city) => {
    return !city
      ? "City must be Entered"
      : city.length < 3
      ? "City should have minimum 3 characters "
      : "";
  };
  validateAge = (age) => {
    return !age
      ? "Age must be entered"
      : age < 20
      ? "Age must be Greater than 20"
      : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
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
      case "city":
        s1.errors.city = this.validateCity(input.value);
        break;
      case "email":
        s1.errors.email = this.validateEmail(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  render() {
    const { employee, errors } = this.state;
    let { name, age, email, city, address } = employee;
    return (
      <div className="container">
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
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter Email "
            value={email}
            onBlur={this.handleValidate}
          />
          {errors.email ? (
            <span className="text-danger">{errors.email}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={this.handleChange}
            placeholder="Enter City"
            value={city}
            onBlur={this.handleValidate}
          />
          {errors.city ? (
            <span className="text-danger">{errors.city}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            onChange={this.handleChange}
            placeholder="Enter Address "
            value={address}
          />
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
export default EmployeeForm;
