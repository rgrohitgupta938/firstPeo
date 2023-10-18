import React, { Component } from "react";
class ProductForm extends Component {
  state = {
    product: this.props.product,
    catOpt: ["Food", "Electronics", "Apparels", "Grocery"],
    discOpt: ["5%", "10%", "20%"],
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.product[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(errors);
      this.props.onSubmit(this.props.product);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  validateAll = () => {
    let { name, price, code, category, desc, disc } = this.state.product;
    let errors = {};
    errors.name = this.validateName(name);
    errors.price = this.validatePrice(price);
    errors.code = this.validateCode(code);
    errors.category = this.validateCategory(category);
    errors.desc = this.validateDescription(desc);
    errors.disc = this.validateDiscount(disc);
    return errors;
  };
  validateName = (name) => {
    return !name
      ? "Name must be entered"
      : name.length < 5
      ? "Name should have minimum 5 characters"
      : "";
  };
  validatePrice = (price) => {
    return !price
      ? "Price must be entered"
      : price < 0
      ? "Price must be greater than 0"
      : "";
  };
  validateCode = (code) => {
    if (!code) {
      return "Product Code must be entered";
    } else if (code.length !== 6) {
      return "Product Code should have 6 characters";
    } else if(code.length === 6) {
      const firstTwoChars = code.substring(0, 2);
      const lastFourChars = code.substring(2);

      const TwoUppercase = firstTwoChars === firstTwoChars.toUpperCase();
      const FourDigits = !isNaN(lastFourChars);
      if (!TwoUppercase || !FourDigits) {
        return "Product code should have first two captial characters and last four digts";
      }
    }
    return "";
  };
  validateCategory = (category) => {
    return !category ? "Category must be Selected" : "";
  };
  validateDescription = (desc) => {
    if (!desc) {
      return "Description of product must be entered";
    } else if (desc.length < 10) {
      return "Description should have minimum 10 characters";
    } else {
      const specialChars = "~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
      for (let i = 0; i < desc.length; i++) {
        if (specialChars.includes(desc[i])) {
          return "Description of product should not have special characters";
        }
      }
    }
    return "";
  };
  validateDiscount = (disc) => {
    return !disc ? "Select Discount option" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  handleValidate = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.errors.name = this.validateName(input.value);
        break;
      case "price":
        s1.errors.price = this.validatePrice(input.value);
        break;
      case "disc":
        s1.errors.disc = this.validateDiscount(input.value);
        break;
      case "desc":
        s1.errors.desc = this.validateDescription(input.value);
        break;
      case "category":
        s1.errors.category = this.validateCategory(input.value);
        break;
      case "code":
        s1.errors.code = this.validateCode(input.value);
        break;
      default:
        break;
    }
    this.setState(s1);
  };
  render() {
    const { errors, discOpt, catOpt } = this.state;
    let { name, price, desc, code, disc, category } = this.state.product;
    console.log(this.props.products);
    console.log("state of form",this.props.products);
    return (
      <div className="container">
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
            onBlur={this.handleValidate}
          />
          {errors.name ? (
            <span className="text-danger">{errors.name}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            onChange={this.handleChange}
            placeholder="Enter Description"
            value={desc}
            onBlur={this.handleValidate}
          />
          {errors.desc ? (
            <span className="text-danger">{errors.desc}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Product Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            onChange={this.handleChange}
            placeholder="Enter Product Code"
            value={code}
            onBlur={this.handleValidate}
          />
          {errors.code ? (
            <span className="text-danger">{errors.code}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={category}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
          >
            <option disabled value="">
              Select the Category
            </option>
            {catOpt.map((n) => (
              <option>{n}</option>
            ))}
          </select>
          {errors.category ? (
            <span className="text-danger">{errors.category}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Enter Price"
            value={price}
            onBlur={this.handleValidate}
          />
          {errors.price ? (
            <span className="text-danger">{errors.price}</span>
          ) : (
            ""
          )}
        </div>
        <label className="form-check-label fw-bold">Choose Discount:</label>
        {discOpt.map((ds) => (
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="disc"
              onChange={this.handleChange}
              value={ds}
              checked={disc === ds}
              onBlur={this.handleValidate}
            />
            <label className="form-check-label">{ds}</label>
          </div>
        ))}
        <br />
        {errors.disc ? (
            <span className="text-danger">{errors.disc}</span>
          ) : (
            ""
          )}
        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default ProductForm;
