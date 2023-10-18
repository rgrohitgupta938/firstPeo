import React, { Component } from "react";

class AddProdComp extends Component {
  state = {
    product: this.props.product,
    errors: {},
  };

  handleChange = (e) => {
    const { name, value ,type ,checked} = e.currentTarget;
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };
  handleCategoryChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
        brand: "",
      },
    }));
  };

  handleAdd = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.props.onSubmit(this.state.product);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };

  validateAll = () => {
    let { code, price, category,brand } = this.state.product;
    let errors = {};
    errors.code = this.validateCode(code);
    errors.price = this.validatePrice(price);
    errors.category = this.validateCategory(category);
    errors.brand = this.validateBrand(brand);
    return errors;
  };
  handleAlert = (st) => {
    st === "category" ? alert("Select Category") : alert("Select Brand");
    return "notr";
  }
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };

  validateCode = (code) => {
    return !code ? "Product Code is required" : "";
  };

  validatePrice = (price) => {
    return !price ? "Price is required" : "";
  };

  validateCategory = (category) => {
    return !category ? this.handleAlert("category") : "";
  };
  validateBrand = (brand) => {
    return !brand ? this.handleAlert("brand") : "";
  };

  render() {
    const {
      code,
      price,
      quantity,
      limitedStock,
      specialOffer,
      brand,
      category,
    } = this.state.product;

    const brandOptions = {
      Food: [
        "Nestle",
        "Haldiram",
        "Pepsi",
        "Coca Cola",
        "Britannia",
        "Cadburys",
      ],
      "Personal Care": ["P&G", "Colgate", "Parachute", "Gillete", "Dove"],
      Apparel: ["Levis", "Van Heusen", "Manyavaar", "Zara"],
    };

    const brandArr = brandOptions[category] || [];
    const { onHomePage, edit } = this.props;
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="form-group">
          <label>Product Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            onChange={this.handleChange}
            placeholder=""
            readOnly={edit === 1 ? true : false}
            value={code}
            style={{ backgroundColor: edit ? "whitesmoke" : "" }}
          />
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
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder=""
            value={price}
          />
          <div className="col-12">
            {errors.price ? (
              <button
                className="btn bg-danger-subtle text-danger text-start"
                style={{ fontSize: "14px" }}
                disabled
              >
                {errors.price}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="category"
            onChange={this.handleCategoryChange}
            value="Food"
            checked={category === "Food"}
          />
          <label className="form-check-label">Food</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="category"
            onChange={this.handleCategoryChange}
            value="Personal Care"
            checked={category === "Personal Care"}
          />
          <label className="form-check-label">Personal Care</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="category"
            onChange={this.handleCategoryChange}
            value="Apparel"
            checked={category === "Apparel"}
          />
          <label className="form-check-label">Apparel</label>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="brand"
            value={brand}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Brand
            </option>
            {brandArr.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="limitedStock"
            checked={limitedStock}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Limited Stock</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="specialOffer"
            checked={specialOffer}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Special Offer</label>
        </div>
        <button className="btn btn-primary m-2" onClick={this.handleAdd}>
          {edit ? "Edit Product" : "Add Product"}
        </button>
        <br />
        <button className="btn btn-primary m-2" onClick={onHomePage}>
          Go Back to Home Page
        </button>
      </div>
    );
  }
}

export default AddProdComp;
