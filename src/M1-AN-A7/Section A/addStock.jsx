import React, { Component } from "react";

class AddStock extends Component {
  state = {
    product: this.props.product,
    year: "",
    month: "",
    date: "",
    errors: {},
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      this.setState((prevState) => ({
        product: {
          ...prevState.product,
          [name]: parseInt(value),
        },
      }));
    } else if (name === "code") {
      this.setState((prevState) => ({
        product: {
          ...prevState.product,
          [name]: value,
        },
      }));
    } else if (name === "year" && this.state.month) {
      const daysInMonth = this.getDaysInMonth(value, this.state.month);
      const date = this.state.date > daysInMonth ? "" : this.state.date;

      this.setState({
        year: value,
        date,
      });
    } else if (name === "month" && this.state.year) {
      const daysInMonth = this.getDaysInMonth(this.state.year, value);
      const date = this.state.date > daysInMonth ? "" : this.state.date;

      this.setState({
        month: value,
        date,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };
  validateAll = () => {
    let { quantity,code } = this.state.product;
    let {year, month, date} = this.state;
    let errors = {};
    errors.quantity = this.validateQuantity(quantity);
    errors.code = this.validateCode(code);
    errors.year = this.validateYear(year);
    errors.month = this.validateMonth(month);
    errors.date = this.validateDate(date);
    return errors;
  };
  handleAlert = (st) => {
    st === "year" ? alert("Select Year") : st === "month" ? alert("Select Month") : alert("Select Date");
    return "notr";
  }
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateQuantity = (quantity) => {
    return !quantity ? "Enter Stock" : "";
  };
  validateCode = (code) => {
    return !code ? "Select Product Code" : "";
  };
  validateYear = (year) => {
    return !year ? this.handleAlert("year") : "";
  };
  validateMonth = (month) => {
    return !month ? this.handleAlert("month") : "";
  };
  validateDate = (date) => {
    return !date ? this.handleAlert("date") : "";
  };


  getDaysInMonth = (year, month) => {
    const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysInMonth = {
      January: 31,
      February: leapYear ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };
    return daysInMonth[month];
  };
  handleAddQuantity = (e) => {
    e.preventDefault();
    const { code, quantity } = this.state.product;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.props.onSubmit1({ code, quantity });
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    const { prodCode, onHomePage1 } = this.props;
    const { year, month, date, errors } = this.state;
    const { code, quantity } = this.state.product;
    const startYear = 1998;
    const endYear = 2023;
    const yearArray = [];
    for (let i = startYear; i <= endYear; i++) {
      yearArray.push(i);
    }
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
    const dates = [];
    const numDays = this.getDaysInMonth(year, month);
    for (let i = 1; i <= numDays; i++) {
      dates.push(i);
    }
    return (
      <div className="container">
        <label className="form-check-label fw-bold">
          Select the product whose stocks have been received
        </label>
        <div className="form-group">
          <select
            className="form-control"
            name="code"
            value={code}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Product Code
            </option>
            {prodCode.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <div className="col-12">
            {errors.code ? (
              <button
                className="btn bg-danger-subtle text-danger text-start"
                style={{ fontSize: "14px" }}
                disabled
              >
                {errors.code}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Stock Received</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            onChange={this.handleChange}
            placeholder=""
            value={quantity}
          />
          <div className="col-12">
            {errors.quantity ? (
              <button
                className="btn bg-danger-subtle text-danger text-start"
                style={{ fontSize: "14px" }}
                disabled
              >
                {errors.quantity}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <div className="form-group">
              <select
                className="form-control"
                name="year"
                value={year}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Year
                </option>
                {yearArray.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <select
                className="form-control"
                name="month"
                value={month}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Month
                </option>
                {months.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <select
                className="form-control"
                name="date"
                value={date}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Date
                </option>
                {dates.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary m-2"
          onClick={this.handleAddQuantity}
        >
          Submit
        </button>
        <br />
        <button className="btn btn-primary m-2" onClick={onHomePage1}>
          Go Back to Home Page
        </button>
      </div>
    );
  }
}

export default AddStock;
