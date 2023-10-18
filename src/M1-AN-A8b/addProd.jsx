import React, { Component } from "react";
import http from "./httpService";
class AddProd extends Component {
  state = {
    product: {
      productname: "",
      category: "",
      description: "",
    },
    edit: false,
    editID: "",
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    console.log(id);
    if (id) {
      let response = await http.get(`/svr/products/${+id}`);
      let { data } = response;
      console.log("if", data, response);
      if (data && data.length > 0) {
        // Access the product details
        let emp = {
          productname: data[0].productname || "",
          category: data[0].category,
          description: data[0].description,
        };
        console.log(emp);
        this.setState({ product: emp, edit: true, editID: id }, () => {
          console.log(this.state.product || 0);
        });
      } else {
        console.log("Product data not found.");
      }
    } else {
      let product = {
        productname: "",
        category: "",
        description: "",
      };
      this.setState({ product: product, edit: false });
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
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };
  async postData(url, obj) {
    console.log(obj);
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/products/view");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/products/view");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { product, edit, editID } = this.state;
    edit
      ? this.putData(`/svr/products/${editID}`, product)
      : this.postData("/svr/products", product);
  };
  render() {
    let { productname, description, category } = this.state.product;
    return (
      <div className="container">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productname"
            name="productname"
            onChange={this.handleChange}
            placeholder="Enter Shop Name"
            value={productname}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            onChange={this.handleChange}
            placeholder="Enter Category"
            value={category}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={this.handleChange}
            placeholder="Enter Description"
            value={description}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddProd;
