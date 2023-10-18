import React, { Component } from "react";
class AddProduct extends Component {
  state = {
    productInfo: this.props.productInfo,
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    input.name === "instock"
      ? (s1.productInfo[input.name] = input.checked)
      : (s1.productInfo[input.name] = input.value);
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.productInfo);
    this.props.history.push("/products");
  }
  render() {
    let { id, brand, category, product, price, instock } =
      this.state.productInfo;
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
            placeholder="Enter Product id"
            value={id}
          />
        </div>
        <div className="form-group">
          <label>Product Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            onChange={this.handleChange}
            placeholder="Enter Brand"
            value={brand}
          />
        </div>
        <div className="form-group">
          <label>Product Category</label>
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
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            id="product"
            name="product"
            onChange={this.handleChange}
            placeholder="Enter Product id"
            value={product}
          />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Enter Product id"
            value={price}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="instock"
            checked={instock}
            value={instock}
            onChange={this.handleChange}
          />
          <label className="form-check-label">InStock</label>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddProduct;
