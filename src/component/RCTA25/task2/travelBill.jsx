import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class TravelBill extends Component {
  state = {
    emptravelBill: {
      goflightDate: "",
      goflightOrigin: "",
      goflightDest: "",
      goflightNum: "",
      backflightDate: "",
      backflightOrigin: "",
      backflightDest: "",
      backflightNum: "",
      corpbooking: "No",
    },
    day: null,
    month: null,
    year: null,
    day1: null,
    month1: null,
    year1: null,
    errors: {},
  };
  async componentDidMount() {
    await this.fetchTravelDetails();
    this.setDropdownValues();
  }

  async fetchTravelDetails() {
    const { id } = this.props.match.params;
    const user = auth.getUser().empuserid;
    const response = await http.get(`/empapp/travelbill/${user}/${id}`);
    const { data } = response;
    this.setState((prevState) => ({
      emptravelBill: { ...prevState.emptravelBill, ...data },
    }));
  }
  setDropdownValues() {
    const months = [
      "January",
      "February",
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
    const { goflightDate, backflightDate } = this.state.emptravelBill;
    const startDateValues = goflightDate ? goflightDate.split("-") : [];
    const endDateValues = backflightDate ? backflightDate.split("-") : [];
    this.setState({
      day: startDateValues[0],
      month: startDateValues[1],
      year: startDateValues[2],
      day1: endDateValues[0],
      month1: endDateValues[1],
      year1: endDateValues[2],
    });
  }
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
      emptravelBill: {
        ...prevState.emptravelBill,
        [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
        goflightDate: `${prevState.day}-${prevState.month}-${prevState.year}`,
        backflightDate: `${prevState.day1}-${prevState.month1}-${prevState.year1}`,
      },
    }));
  };

  async postEmpTravelBill(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Hotel Stay Details have been successfully created";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { emptravelBill } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(emptravelBill);
      this.postEmpTravelBill("/empapp/travelbill", emptravelBill);
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
  validateAll = () => {
    let {
      goflightDest,
      goflightDate,
      goflightOrigin,
      goflightNum,
      backflightDate,
      backflightDest,
      backflightNum,
      backflightOrigin,
    } = this.state.emptravelBill;
    let errors = {};
    errors.goflightOrigin = this.validateGoCity(goflightOrigin);
    errors.goflightDest = this.validateGoDest(goflightDest);
    errors.goflightNum = this.validateGoFlightNum(goflightNum);
    errors.goflightDate = this.validateStDate(goflightDate);
    errors.backflightDate = this.validateEnDate(backflightDate);
    errors.backflightOrigin = this.validateBackCity(backflightOrigin);
    errors.backflightDest = this.validateBackDest(backflightDest);
    errors.backflightNum = this.validateBackFlightNum(backflightNum);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateGoCity = (goflightOrigin) => {
    return !goflightOrigin ? "Departure Origin City must be entered" : "";
  };
  validateEnDate = (backflightDate) => {
    return !backflightDate ? "Select Return filght date" : "";
  };
  validateStDate = (goflightDate) => {
    return !goflightDate ? "Select Departure flight date" : "";
  };
  validateGoDest = (goflightDest) => {
    return !goflightDest ? "Departure Destination Must be Entered" : "";
  };
  validateGoFlightNum = (hotel) => {
    return !hotel ? "Departure Flight Number must be Entered" : "";
  };
  validateBackCity = (backflightOrigin) => {
    return !backflightOrigin ? " Return Origin City must be entered" : "";
  };
  validateBackDest = (backflightDest) => {
    return !backflightDest ? "Return Destination Must be Entered" : "";
  };
  validateBackFlightNum = (backflightNum) => {
    return !backflightNum ? "Return Flight Number must be Entered" : "";
  };
  render() {
    const {
      goflightDest,
      goflightDate,
      goflightOrigin,
      goflightNum,
      backflightDate,
      backflightDest,
      backflightNum,
      backflightOrigin,
      corpbooking,
    } = this.state.emptravelBill;
    const { errors, day, month, year, day1, month1, year1 } = this.state;
    const months = [
      "January",
      "February",
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
    const years = [2018, 2019, 2020];
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }
    return (
      <div className="container bg-whitesmoke">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <div style={{ backgroundColor: "whitesmoke" }}>
          <h4 className="text-center mb-3">Flight Details</h4>
          <h5 className="text-center">
            Bill Id : {this.props.match.params.id}
          </h5>
          <div className="text-center">
            {" "}
            {errors && errors.succ ? (
              <span className="text-primary" style={{ fontSize: "24px" }}>
                {errors.succ}
              </span>
            ) : goflightDate &&
              backflightDate &&
              goflightDest &&
              goflightNum &&
              goflightOrigin &&
              backflightDest &&
              backflightNum &&
              backflightOrigin 
             ? (
              <span className="text-success" style={{ fontSize: "24px" }}>
                Displaying Flight Bill Details
              </span>
            ) : (
              errors.succ && <span className="text-primary" style={{ fontSize: "24px" }}>
                "No Flight Details Found. Please Enter Them."
              </span>
            )}
            <hr className="light"></hr>
          </div>
          <h5 className="text-center">Departure Flight Details</h5>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Flight date:</label>
            </div>
            <div className="col-2">
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
            <div className="col-2">
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
            <div className="col-2">
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
              {errors && errors.goflightDate && (
                <span className="text-danger">{errors.goflightDate}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Origin City:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="goflightOrigin"
                name="goflightOrigin"
                onChange={this.handleChange}
                placeholder="Enter Origin"
                value={goflightOrigin}
              />
            </div>
            <div className="text-center">
              {errors && errors.goflightOrigin && (
                <span className="text-danger">{errors.goflightOrigin}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Destination City:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="goflightDest"
                name="goflightDest"
                onChange={this.handleChange}
                placeholder="Enter Destination"
                value={goflightDest}
              />
            </div>
            <div className="text-center">
              {errors && errors.goflightDest && (
                <span className="text-danger">{errors.goflightDest}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Flight Number:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="goflightNum"
                name="goflightNum"
                onChange={this.handleChange}
                placeholder="Enter Flight Number"
                value={goflightNum}
              />
            </div>
            <div className="text-center">
              {errors && errors.goflightNum && (
                <span className="text-danger">{errors.goflightNum}</span>
              )}
            </div>
          </div>
          <hr className="light"></hr>
          <h5 className="text-center">Return Flight Details</h5>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Flight date:</label>
            </div>
            <div className="col-2">
              <select
                className="form-control"
                name="day1"
                value={day1}
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
            <div className="col-2">
              <select
                className="form-control"
                name="month1"
                value={month1}
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
            <div className="col-2">
              <select
                className="form-control"
                name="year1"
                value={year1}
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
              {errors && errors.backflightDate && (
                <span className="text-danger">{errors.backflightDate}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Origin City:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="backflightOrigin"
                name="backflightOrigin"
                onChange={this.handleChange}
                placeholder="Enter Origin"
                value={backflightOrigin}
              />
            </div>
            <div className="text-center">
              {errors && errors.backflightOrigin && (
                <span className="text-danger">{errors.backflightOrigin}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Destination City:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="backflightDest"
                name="backflightDest"
                onChange={this.handleChange}
                placeholder="Enter Destination"
                value={backflightDest}
              />
            </div>
            <div className="text-center">
              {errors && errors.backflightDest && (
                <span className="text-danger">{errors.backflightDest}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-2"></div>
            <div className="col-2">
              <label>Flight Number:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                id="backflightNum"
                name="backflightNum"
                onChange={this.handleChange}
                placeholder="Enter Flight Number"
                value={backflightNum}
              />
            </div>
            <div className="text-center">
              {errors && errors.backflightNum && (
                <span className="text-danger">{errors.backflightNum}</span>
              )}
            </div>
          </div>
          <div className="form-group row m-2">
            <div className="col-3"></div>
            <div className="col-1"></div>
            <div className="col-6">
              <input
                className="form-check-input"
                type="checkbox"
                name="corpbooking"
                checked={corpbooking === "Yes"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Corporate Booking</label>
            </div>
            <div className="text-center">
              {errors && errors.corpbooking && (
                <span className="text-danger">{errors.corpbooking}</span>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
              borderRadius: "0",
            }}
          >
            <button
              className="btn btn-primary fw-bold"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TravelBill;
