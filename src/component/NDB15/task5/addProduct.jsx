import React, { Component } from "react";
import http from "../../../services/httpService";
class AddProduct extends Component {
  state = {
    product: {
      name: "",
      description: "",
      price: "",
      imglink: "",
      category: "",
    },
    optionsArr: [
      "Sunglasses",
      "Watches",
      "Belts",
      "Handbags",
      "Wallets",
      "Formal Shoes",
      "Sport Shoes",
      "Floaters",
      "Sandals",
    ],
  };
  handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    let s1 = { ...this.state };
    s1.product[name] = value;
    this.setState(s1);
  };
  showDropDown = (label, arr, name, salVal) => {
    return (
      <div className="form-group">
        <label className="fw-bold">{label}</label>
        <select
          className="form-control"
          name={name}
          value={salVal}
          onChange={this.handleChange}
        >
          <option value="">Choose {label}s</option>
          {arr.map((n) => (
            <option>{n}</option>
          ))}
        </select>
      </div>
    );
  };
  async postProduct(obj) {
    let response = await http.post("/products", obj);
    console.log(response);
    this.props.history.push("/manageProducts");
  }
  handleAdd = () => {
    let { product } = this.state;
    this.postProduct(product);
    this.setState({
      product: {
        name: "",
        description: "",
        price: "",
        imglink: "",
        category: "",
      },
    });
  };
  render() {
    const { name, description, price, imglink, category } = this.state.product;
    const { optionsArr } = this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label className="fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Name..."
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={this.handleChange}
            placeholder="Description..."
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Price .."
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">Image</label>
          <input
            type="text"
            className="form-control"
            id="imglink"
            name="imglink"
            onChange={this.handleChange}
            placeholder="Image url..."
            value={imglink}
          />
        </div>
        {this.showDropDown("Category", optionsArr, "category", category)}
        <button className="btn btn-primary btn-sm" onClick={this.handleAdd}>
          Add
        </button>
      </div>
    );
  }
}
export default AddProduct;
