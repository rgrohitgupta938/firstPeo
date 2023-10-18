import React, { Component } from "react";

class DdComp extends Component {
  state = {
    options: {
      cat: "",
      instock: "",
      price: ""
    }
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState(
      (prevState) => ({
        options: {
          ...prevState.options,
          [name]: value
        }
      }),
      () => {
        this.props.onSubmit(this.state.options);
      }
    );
  };

  render() {
    const { products } = this.props;
    const category = products.reduce(
      (acc, curr) =>
        acc.includes(curr.category) ? acc : [...acc, curr.category],
      []
    );
    const inStock = ["Yes", "No"];
    const priceArr = ["<10", ">20", "10-20"];
    const { options } = this.state;

    return (
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="cat"
              value={options.cat}
              onChange={this.handleChange}
            >
              <option value="">
                Select Category
              </option>
              {category.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="instock"
              value={options.instock}
              onChange={this.handleChange}
            >
              <option value="">
                Select Instock
              </option>
              {inStock.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="price"
              value={options.price}
              onChange={this.handleChange}
            >
              <option value="">
                Select Price
              </option>
              {priceArr.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default DdComp;
