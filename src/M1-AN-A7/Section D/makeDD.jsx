import React, { Component } from "react";

class MakeDD extends Component {
  state = {
    options: this.props.options,
    selectedOptions: this.props.selectedOptions,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const selectedOptions = { ...this.state.selectedOptions, [name]: value };
    this.setState({ selectedOptions });
    this.props.onOptionChange(selectedOptions);
  };

  makeDropDown = (arr, value, name, label,disabled) => {
    const { selectedOptions } = this.state;
    return (
      <div className="form-group">
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={this.handleChange}
          disabled={disabled}
        >
          <option value="">{label}</option>
          {arr.map((n, index) => (
            <option key={index} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    );
  };
  render() {
    const { sizes, crusts } = this.state.options;
    const { size, crust } = this.state.selectedOptions;
    const { disabled } = this.props; // Get the disabled prop

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            {this.makeDropDown(sizes, size, "size", "Select Size", disabled)}
          </div>
          <div className="col-6">
            {this.makeDropDown(crusts, crust, "crust", "Select Crust", disabled)}
          </div>
        </div>
      </div>
    );
  }
}

export default MakeDD;
