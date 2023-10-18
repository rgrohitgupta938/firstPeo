import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class NomineeDetails extends Component {
  state = {
    details: {
      name: "",
      nomineeName: "",
      gender: "",
      dob: "",
      relationship: "",
      jointsignatory: false,
    },
    errors: {},
    btn: false,
  };
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(type, name, value, checked);
    if (type === "checkbox") {
      console.log(checked);
      const updatedDetails = { ...this.state.details, [name]: checked };
      this.setState({ details: updatedDetails });
    } else if (name === "day" || name === "month" || name === "year") {
      const { details } = this.state;
      const updatedDOB = {
        ...this.splitDOB(details.dob),
        [name]: value,
      };
      const newDOB = `${updatedDOB.day}-${updatedDOB.month}-${updatedDOB.year}`;
      const updatedDetails = { ...details, dob: newDOB };
      this.setState({ details: updatedDetails });
    } else {
      const updatedDetails = { ...this.state.details, [name]: value };
      this.setState({ details: updatedDetails });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { details } = this.state;
    let errors = this.validateAll();
    console.log(details, errors);
    if (this.isValid(errors)) {
      console.log(details);
      this.postEmpContact(`/nomineeDetails`, details);
      alert("Nominee Succesfully added");
      this.props.history.push("/customer");
      this.setState({ btn: true });
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    const { gender, jointsignatory, relationship, dob, nomineeName } =
      this.state.details;
    let errors = {};
    errors.gender = this.validateGender(gender);
    errors.dob = this.validateDob(dob);
    errors.nomineeName = this.validateNomineeName(nomineeName);
    errors.relationship = this.validateRelation(relationship);
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  validateDob = (dob) => {
    if (!dob) {
      return "Select Date of birth";
    }
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { day, month, year } = this.splitDOB(dob);
    const validDay = day >= 1 && day <= 31;
    const validMonth = months.includes(month);
    const validYear = year >= 1980 && year <= 2023;
    const errors = [];
    console.log(day, month, year);
    if (!validDay) {
      errors.push("Select day");
    }
    if (!validMonth) {
      errors.push("Select month");
    }
    if (!validYear) {
      errors.push("Select year");
    }
    return errors.join(", ");
  };
  validateGender = (gender) => {
    return !gender ? "Select Gender" : "";
  };
  validateNomineeName = (nomineeName) => {
    return !nomineeName ? "Nominee Name Must be Entered" : "";
  };
  validateRelation = (relationship) => {
    return !relationship ? "Realtionship must be entered" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  async postEmpContact(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Nominee Details have been Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status !== 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  async fetchEmpContact() {
    const user = auth.getUser().name;
    console.log(user);
    let response = await http.get(`/getNominee/${user}`);
    let { data } = response;
    console.log(response, data);
    this.setState((prevState) => ({
      details: data
        ? data
        : {
            ...prevState.details,
            name: user,
          },
      btn: data.length === 0 ? true : false,
    }));
  }
  componentDidMount() {
    this.fetchEmpContact();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.btn !== this.state.btn) this.fetchEmpContact();
  }
  splitDOB = (dob) => {
    const [day, month, year] = dob ? dob.split("-") : [];
    return { day, month, year };
  };
  formatDOB = (dobObj) => {
    const { day, month, year } = dobObj;
    return `${day}-${month}-${year}`;
  };
  render() {
    const { details, errors, btn } = this.state;
    let { name, jointsignatory, relationship, dob, gender, nomineeName } =
      details;
    const { day, month, year } = this.splitDOB(this.state.details.dob);
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const years = [];
    for (let i = 1980; i <= 2023; i++) {
      years.push(i);
    }
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }
    return (
      <div className="coontainer">
        <h4>Nominee Details</h4>
        <div className="form-group m-4">
          <label className="form-check-label fw-bold">
            Name <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="nomineeName"
            name="nomineeName"
            onChange={this.handleChange}
            placeholder=""
            value={nomineeName}
            onBlur={this.handleValidate}
          />
          {errors && errors.nomineeName && (
            <span className="text-danger">{errors.nomineeName}</span>
          )}
        </div>
        <div className="form-group row m-4">
          <div className="col-3">
            <label className="form-check-label fw-bold">
              Gender <span className="required-asterisk text-danger">*</span>
            </label>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Male"}
                value="Male"
                onChange={this.handleChange}
              />
              <label className="form-check-label">Male</label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Female"}
                value="Female"
                onChange={this.handleChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          {errors && errors.gender && (
            <span className="text-danger">{errors.gender}</span>
          )}
          <hr className="m-4"></hr>
        </div>
        <div className="form-group row m-4">
          <label className="form-check-label fw-bold">
            Date of Birth{" "}
            <span className="required-asterisk text-danger">*</span>
          </label>
        </div>
        <div className="form-group row m-2">
          <div className="col-4">
            <select
              className="form-control"
              name="day"
              value={day}
              onChange={this.handleChange}
            >
              <option value="">Select the Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <select
              className="form-control"
              name="month"
              value={month}
              onChange={this.handleChange}
            >
              <option value="">Select the Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <select
              className="form-control"
              name="year"
              value={year}
              onChange={this.handleChange}
            >
              <option value="">Select the Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {errors && errors.dob && (
            <span className="text-danger">{errors.dob}</span>
          )}
        </div>
        <div className="form-group m-4">
          <label className="form-check-label fw-bold">
            Relationship{" "}
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="relationship"
            name="relationship"
            onChange={this.handleChange}
            placeholder=""
            value={relationship}
            onBlur={this.handleValidate}
          />
          {errors && errors.relationship && (
            <span className="text-danger">{errors.relationship}</span>
          )}
        </div>
        <div className="form-group row m-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="jointsignatory"
              checked={jointsignatory}
              value="jointsignatory"
              onChange={this.handleChange}
            />
            <label className="form-check-label">Joint Signatory</label>
          </div>
        </div>
        {btn && (
          <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
            Add Details
          </button>
        )}
      </div>
    );
  }
}
export default NomineeDetails;
