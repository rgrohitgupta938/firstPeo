import React, { Component } from "react";
import http from "./httpService.js";
class AddProduct extends Component {
  state = {
    product: { id: "", name: "", price: "" },
    edit: false,
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.product[input.name] = input.value;
    this.setState(s1);
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    if (id) {
      let response = await http.get(`/productApp/products/${id}`);
      let { data } = response;
      console.log("if", data);
      this.setState({ product: data, edit: true });
    } else {
      let product = { id: "", name: "", price: "" };
      this.setState({ product: product, edit: false });
    }
  }
  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      this.props.history.push("/products");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = {};
        errors.id = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/products");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { product, edit } = this.state;
    edit
      ? this.putData(`/productApp/products/${product.id}`, product)
      : this.postData("/productApp/products", product);
  };
  render() {
    let { id, name, price } = this.state.product;
    let { errors = null, edit } = this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label>Product Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            placeholder="Enter Product Id"
            value={id}
            readOnly={edit}
          />
          {errors && <span className="bg-danger">{errors.id}</span>}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Product Name"
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
            placeholder="Enter Product Price"
            value={price}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddProduct;
