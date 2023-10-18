import React, { Component } from "react";

class Customer extends Component {
  state = {
    customer: this.props.customer,
    deliveryOpt: ["Home", "Office", "PickUp"],
    payOpts: ["Net Banking", "Credit Card", "Debit Card"],
    deliverySlot: ["Before 10AM", "2PM-6PM"],
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget;
    const { customer } = this.state;

    const newValue = type === "checkbox" ? this.updateCBs(checked, value, customer[name]) : value;

    this.setState({
      customer: {
        ...customer,
        [name]: newValue,
      },
    });
  };

  updateCBs = (checked, value, arr) => {
    const newArray = arr ? [...arr] : []; 
    if (checked) {
      newArray.push(value);
    } else {
      const index = newArray.findIndex((ele) => ele === value);
      if (index >= 0) {
        newArray.splice(index, 1);
      }
    }
    return newArray;
  };
  
  

  handleSubmit = (e) => {
    e.preventDefault();
    const { customer } = this.state;
    console.log(customer);
    this.props.onSubmit(customer);
  };

  render() {
    const { customer, deliveryOpt, payOpts, deliverySlot } = this.state;
    const { custName, gender, delivery, payOpt = [], deliverytime } = customer;

    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="custName">Name</label>
          <input
            type="text"
            className="form-control"
            id="custName"
            name="custName"
            onChange={this.handleChange}
            placeholder="Enter Name"
            value={custName}
          />
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            onChange={this.handleChange}
            value="Male"
            checked={gender === "Male"}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            onChange={this.handleChange}
            value="Female"
            checked={gender === "Female"}
          />
          <label className="form-check-label">Female</label>
        </div>
        <br />
        <label className="form-check-label fw-bold">Choose Your Delivery Option</label>
        {deliveryOpt.map((opt) => (
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="delivery"
              onChange={this.handleChange}
              value={opt}
              checked={delivery === opt}
            />
            <label className="form-check-label">{opt}</label>
          </div>
        ))}
        <label className="form-check-label fw-bold">Choose Your Payment options</label>
        {payOpts.map((ch) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="payOpt"
              checked={payOpt.includes(ch)}
              value={ch}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch}</label>
          </div>
        ))}
        <div className="form-group">
          <select
            className="form-control"
            name="deliverytime"
            value={deliverytime}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Delivery Slot
            </option>
            {deliverySlot.map((n) => (
              <option>{n}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Customer;
