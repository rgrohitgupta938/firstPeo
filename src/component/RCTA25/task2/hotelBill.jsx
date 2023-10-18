import React, { Component } from "react";
import auth from "../../../services/authService";
import http from "../../../services/httpService";

class HotelBill extends Component {
  state = {
    empHotelDetails: {
      staystartdate: "",
      corpbooking: "No",
      hotel: "",
      city: "",
      stayenddate: "",
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
    await this.fetchHotelDetails();
    this.setDropdownValues();
  }

  async fetchHotelDetails() {
    const { id } = this.props.match.params;
    const user = auth.getUser().empuserid;
    const response = await http.get(`/empapp/hotelbill/${user}/${id}`);
    const { data } = response;
    this.setState((prevState) => ({
      empHotelDetails: { ...prevState.empHotelDetails, ...data },
    }));
  }
  setDropdownValues() {
    const { empHotelDetails } = this.state;
    const { staystartdate, stayenddate } = empHotelDetails;
    const startDateValues = staystartdate ? staystartdate.split("-") : [];
    const endDateValues = stayenddate ? stayenddate.split("-") : [];
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
      empHotelDetails: {
        ...prevState.empHotelDetails,
        [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
        staystartdate: `${prevState.day}-${prevState.month}-${prevState.year}`,
        stayenddate: `${prevState.day1}-${prevState.month1}-${prevState.year1}`,
      },
    }));
  };
  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props) this.fetchHotelDetails();
  }
  async postEmpHotelBill(url, obj) {
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
    let { empHotelDetails } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(empHotelDetails);
      this.postEmpHotelBill("/empapp/hotelbill", empHotelDetails);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { stayenddate, staystartdate, city, corpbooking, hotel } =
      this.state.empHotelDetails;
    let errors = {};
    errors.city = this.validateCity(city);
    errors.checkOutDate = this.validateEnDate(stayenddate);
    errors.checkInDate = this.validateStDate(staystartdate);
    errors.hotel = this.validateHotel(hotel);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateCity = (city) => {
    return !city ? "City must be entered" : "";
  };
  validateEnDate = (stayenddate) => {
    return !stayenddate ? "Select check out date" : "";
  };
  validateStDate = (staystartdate) => {
    return !staystartdate ? "Select check in date" : "";
  };
  validateHotel = (hotel) => {
    return !hotel ? "Hotel Name must be Entered" : "";
  };
  render() {
    const { empHotelDetails, day, month, year, day1, month1, year1, errors } =
      this.state;
    let { stayenddate, staystartdate, corpbooking, hotel, city } =
      empHotelDetails;
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
    stayenddate = `${day1}-${months[month1 - 1]}-${year1}`;
    staystartdate = `${day}-${months[month - 1]}-${year}`;
    console.log(staystartdate, stayenddate);
    return (
      <div className="container">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <h4 className="text-center">Hotel Stay Details</h4>
        <h5 className="text-center">Bill Id: {this.props.match.params.id}</h5>
        <div className="text-center">
          {" "}
          {errors && errors.succ ? (
            <span className="text-primary" style={{ fontSize: "24px" }}>
              {errors.succ}
            </span>
          ) : stayenddate && staystartdate && city && hotel && corpbooking ? (
            <span className="text-success" style={{ fontSize: "24px" }}>
              Displaying Hotel Bill Details
            </span>
          ) : (
            <span className="text-primary" style={{ fontSize: "24px" }}>
              "No Hotel Stay Details Found. Please Enter Them."
            </span>
          )}
        </div>
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Check In date:</label>
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
            {errors && errors.checkInDate && (
              <span className="text-danger">{errors.checkInDate}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Check Out date:</label>
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
            {errors && errors.checkOutDate && (
              <span className="text-danger">{errors.checkOutDate}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Hotel:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="hotel"
              name="hotel"
              onChange={this.handleChange}
              placeholder="Enter Hotel"
              value={hotel}
            />
          </div>
          <div className="text-center">
            {errors && errors.hotel && (
              <span className="text-danger">{errors.hotel}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>City:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={this.handleChange}
              placeholder="Enter City"
              value={city}
            />
          </div>
          <div className="text-center">
            {errors && errors.city && (
              <span className="text-danger">{errors.city}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
          </div>
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
    );
  }
}
export default HotelBill;
