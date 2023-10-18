import React, { Component } from "react";
import http from "./httpService";
class NewCust extends Component {
  state = {
    customer: { name: "", age: "", city: "", id: "", gender: "", payment: "" },
    cities: ["Jaipur", "Gurgaon", "Noida", "Delhi"],
    payments: ["Credit Card", "Wallet", "Debit Card"],
    genders: ["Male", "Female"],
    edit: false,
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.customer[input.name] = input.value;
    this.setState(s1);
  };
  makeRadio = (arr, value, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check" key={ch}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              checked={value === ch || false}
              value={ch}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch}</label>
          </div>
        ))}
      </React.Fragment>
    );
  };
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    console.log(id);
    if (id) {
      let response = await http.get(`/customers/${id}`);
      let { data } = response;
      console.log("if", data);
      this.setState({ customer: data, edit: true });
    } else {
      let person = {
        name: "",
        age: "",
        city: "",
        id: "",
        gender: "",
        payment: "",
      };
      this.setState({ customer: person, edit: false });
    }
  }
  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/customers");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/customers");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { customer, edit } = this.state;
    edit
      ? this.putData(`/customers/${customer.id}`, customer)
      : this.postData("/customers", customer);
  };
  render() {
    let { name, age, city, id, gender, payment } = this.state.customer;
    let { cities, payments, genders } = this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label>Customer Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            placeholder="Enter Id"
            value={id}
          />
        </div>
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
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            onChange={this.handleChange}
            placeholder="Enter Product Id"
            value={age}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <select
            className="form-control"
            name="city"
            value={city}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select city
            </option>
            {cities.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        {this.makeRadio(genders, gender, "gender", "Gender")}
        <br />
        {this.makeRadio(payments, payment, "payment", "Payment Ooptions")}
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewCust;
