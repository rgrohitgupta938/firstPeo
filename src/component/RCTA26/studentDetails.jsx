import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class StudentDetails extends Component {
  state = {
    student: { gender: "", dob: "", about: "" },
    errors: {},
    btn: false,
  };
  async getStudent() {
    try {
      let response = await http.get(
        `/getStudentDetails/${auth.getUser().name}`
      );
      let { data } = response;
      console.log(data);
      this.setState({
        student: data,
        btn:
          data.gender === "" && data.dob === "" && data.about === ""
            ? true
            : false,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        this.setState({
          student: {
            gender: "",
            dob: "",
            about: "",
            name: auth.getUser().name,
          },
          btn: true,
        });
      }
    }
  }
  splitDOB = (dob) => {
    const [day = "", month = "", year = ""] = dob.split("-");
    return { day, month, year };
  };
  formatDOB = (dobObj) => {
    const { day, month, year } = dobObj;
    return `${day}-${month}-${year}`;
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    const { student, btn } = this.state;
    console.log(btn);
    if (name === "day" || name === "month" || name === "year") {
      const currentDOB = student.dob || "";
      const dobObject = currentDOB
        ? this.splitDOB(currentDOB)
        : { day: "", month: "", year: "" };
      const updatedDOB = {
        ...dobObject,
        [name]: value,
      };
      const newDOB = this.formatDOB(updatedDOB);
      const updatedDetails = {
        ...student,
        dob: newDOB,
        name: auth.getUser().name,
      };
      this.setState({ student: updatedDetails });
    } else if (name === "gender") {
      const updatedDetails = {
        ...student,
        gender: value,
        name: auth.getUser().name,
      };
      this.setState({ student: updatedDetails });
    } else if (name === "about") {
      // Handle textarea
      const updatedDetails = {
        ...student,
        about: value,
        name: auth.getUser().name,
      };
      this.setState({ student: updatedDetails });
    } else {
      const updatedDetails = {
        ...student,
        [name]: value,
        name: auth.getUser().name,
      };
      this.setState({ student: updatedDetails });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hanlde");
    let { student } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(student);
      this.postStudentDetails(`/postStudentDetails`, student);
      alert("Details added Successfully");
      this.props.history.push("/student");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    const { gender, dob } = this.state.student;
    let errors = {};
    errors.gender = this.validateGender(gender);
    errors.dob = this.validateDob(dob);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  validateGender = (gender) => {
    if (!gender) {
      return "Select Gender";
    }
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
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  async postStudentDetails(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Details have been Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status !== 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "gender":
        s1.errors.gender = this.validateGender(input.value);
        break;
      case "dob":
        s1.errors.dob = this.validateDob(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  componentDidMount() {
    this.getStudent();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.getStudent();
  }
  render() {
    const { errors, student, btn } = this.state;
    let { gender, about, dob } = student;
    const { day, month, year } = dob
      ? this.splitDOB(this.state.student.dob)
      : {};
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
    console.log(errors);
    return (
      <div className="container">
        <h4 className="m-2">Student Details</h4>
        <div className="form-group row m-2">
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
                checked={gender === "male"}
                value="male"
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
                checked={gender === "female"}
                value="female"
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
        <div className="form-group row m-2">
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
            {errors && errors.dob && (
              <span className="text-danger">{errors.dob}</span>
            )}
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
          <div className="text-center">
            {errors && errors.checkInDate && (
              <span className="text-danger">{errors.checkInDate}</span>
            )}
          </div>
        </div>
        <div class="form-group row m-3">
          <label className="form-check-label fw-bold">About Myself</label>
          <textarea
            className="form-control"
            rows="5"
            id="about"
            name="about"
            value={about}
            onChange={this.handleChange}
          ></textarea>
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
export default StudentDetails;
