import React, { Component } from "react";
class LeftPanel extends Component {
  state = {};
  handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget;
    let options = { ...this.props.options };
    if (type === "checkbox") {
      options[name] = this.updateCBs(options[name], checked, value);
    } else {
      options[name] = value;
    }
    console.log(options);
    this.props.onOptionChange(options);
  };
  updateCBs = (inpValue, checked, value) => {
    let inpArr = inpValue ? inpValue.split(",") : [];
    if (checked) {
      inpArr.push(encodeURIComponent(value));
    } else {
      inpArr = inpArr.filter((ele) => decodeURIComponent(ele) !== value);
    }
    return inpArr.join(",");
  };
  makeCheckBox = (arr, values, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check" key={ch.value}>
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              checked={values.includes(ch.value)}
              value={ch.value}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch.name}</label>
          </div>
        ))}
      </React.Fragment>
    );
  };
  makeDropDown = (arr, value, name, label) => {
    return (
      <div className="form-group">
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={this.handleChange}
        >
          <option value="">{label}</option>
          {arr.map((n) => (
            <option key={n.value} value={n.value}>
              {n.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  render() {
    const { prods, stores, sortOpt } = this.props;
    let { product = "", shop = "", sort = "" } = this.props.options;
    product = decodeURIComponent(product);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 m-2">
            {this.makeCheckBox(
              prods,
              product.split(","),
              "product",
              "Select Product"
            )}
          </div>
          <div className="col-12 m-2">
            {this.makeDropDown(stores, shop, "shop", "Select store")}
          </div>
          <div className="col-12 m-2">
            {this.makeDropDown(sortOpt, sort, "sort", "Select Sort")}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
