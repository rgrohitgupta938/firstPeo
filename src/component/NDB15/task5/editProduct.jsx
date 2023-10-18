import React, { Component } from "react";
import http from "../../../services/httpService";
class EditProduct extends Component {
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
  componentDidMount() {
    this.fecthProduct();
  }
  async fecthProduct() {
    let { id } = this.props.match.params;
    console.log(id);
    let response = await http.get(`/product/${id}`);
    console.log(response.data);
    let { data } = response;
    this.setState({ product: response.data[0] });
  }
  async putProduct(obj) {
    let { id } = this.props.match.params;
    let response = await http.put(`/products/${id}`, obj);
    console.log(response);
    this.props.history.push("/manageProducts");
  }
  handleSave = () => {
    let { product } = this.state;
    this.putProduct(product);
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
  handleDelete = (id) => {
    let s1 = { ...this.state };
    this.delProduct(id);
    this.props.history.push(`/manageProducts/${id}`);
  };
  async delProduct(id) {
    let response = await http.deleteApi(`/products/${id}`);
    console.log(response);
  }
  render() {
    const { name, description, price, imglink, category, id } =
      this.state.product;
    const { optionsArr } = this.state;
    return (
      <div className="container">
        <h2 className="text-center">Edit Product</h2>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-center">
              <div class="card bg-dark ms-5" style={{ width: "28rem" }}>
                <img src={imglink} class="card-img-top p-2" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-white">{name}</h5>
                  <p class="card-text text-white">
                    Category : {category}
                    <br />
                    Price : {price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
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
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm m-2"
              onClick={() => this.handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default EditProduct;
