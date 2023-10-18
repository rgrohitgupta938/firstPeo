import React, { Component } from "react";
class LeftPanelDdOptions extends Component {
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
    let { dept,designation } = this.props.options;
    console.log(dept,designation)
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
          {this.makeDropDown(allOptions.dept, dept, "dept", "Select Department")}
        </div>
        <div className="col-12 m-2">
          {this.makeDropDown(allOptions.designation, designation, "designation", "Select Designation")}
        </div>
      </div>
    );
  }
}
export default LeftPanelDdOptions;
