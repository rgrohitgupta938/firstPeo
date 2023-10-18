import React, { Component } from "react";
class LeftPanelComponent extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    this.props.onOptionChange(options);
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
          <option disabled selected value="">
            {label}
          </option>
          {arr.map((n) => (
            <option>{n}</option>
          ))}
        </select>
      </div>
    );
  };
  render() {
    let { brand, ram, processor, hardDisk, rating } = this.props.options;
    let { allOptions } = this.props;
    return (
      <div className="row border bg-light">
        <div className="col-12 m-2 text-center">
          <div
            className="btn btn-primary btn-sm"
            onClick={() => this.props.onOptionChange({})}
          >
            Clear All Options
          </div>
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(allOptions.brand, brand, "brand", "Select Brand")}
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(allOptions.ram, ram, "ram", "Select RAM")}
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(
            allOptions.processor,
            processor,
            "processor",
            "Select processor"
          )}
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(
            allOptions.hardDisk,
            hardDisk,
            "hardDisk",
            "Select Hard Disk"
          )}
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(
            allOptions.rating,
            rating,
            "rating",
            "Select Rating"
          )}
        </div>
      </div>
    );
  }
}
export default LeftPanelComponent;
