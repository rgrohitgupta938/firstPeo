import React, { Component } from "react";
import http from "./httpService";
class NewMobile extends Component {
  state = {
    mobile: {
      name: "",
      price: "",
      brand: "",
      ram: "",
      rom: "",
      os: "",
    },
    brands: ["Samsung", "Xiaomi", "Realme", "Apple"],
    rams: ["3GB", "4GB", "6GB", "8GB"],
    roms: ["32GB", "64GB", "128GB", "256GB"],
    oss: ["Android", "iOS"],
    edit: false,
    editID:"",
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    if (+id) {
      let response = await http.get(`/svr/mobile/${+id}`);
      let { data } = response;
      console.log("if", data);
      let emp = {
        name: data[0].name,
        price: data[0].price,
        brand: data[0].brand,
        ram: data[0].ram,
        rom: data[0].rom,
        os: data[0].os,
      };
      console.log(emp);
      this.setState({ mobile: emp, edit: true,editID:id }, () => {
        console.log(this.state.mobile || 0);
      });
    } else {
      let mobile = {
        name: "",
        price: "",
        brand: "",
        ram: "",
        rom: "",
        os: "",
      };
      this.setState({ mobile: mobile, edit: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      mobile: {
        ...prevState.mobile,
        [name]: value,
      },
    }));
  };
  async postData(url, obj) {
    console.log(obj);
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/mobile");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/mobile");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { mobile, edit ,editID} = this.state;
    edit
      ? this.putData(`/svr/mobile/${editID}`, mobile)
      : this.postData("/svr/mobile", mobile);
  };
  render() {
    const { brands, rams, roms, oss } = this.state;
    let { name, brand, price, ram, rom, os, id } = this.state.mobile;
    return (
      <div className="container">
        <div className="form-group">
          <label>Mobile Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Mobile Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Enter Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <select
            className="form-control"
            name="brand"
            value={brand}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select a Brand
            </option>
            {brands.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>RAM</label>
          <select
            className="form-control"
            name="ram"
            value={ram}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select RAM
            </option>
            {rams.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>ROM</label>
          <select
            className="form-control"
            name="rom"
            value={rom}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select ROM
            </option>
            {roms.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>OS</label>
          <select
            className="form-control"
            name="os"
            value={os}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select OS
            </option>
            {oss.map((n) => (
              <option key={n}>{n}</option>
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
export default NewMobile;
