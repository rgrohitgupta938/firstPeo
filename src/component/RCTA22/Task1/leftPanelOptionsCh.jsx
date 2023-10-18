import React, { Component } from "react";
class LeftPanelComponentCh extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = this.updateCBs(
      options[input.name],
      input.checked,
      input.value
    );
    this.props.onOptionChange(options);
  };
  updateCBs = (inpValue, checked, value) => {
    let inpArr = inpValue ? inpValue.split(",-") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr.join(",");
  };
  makeCheckBox = (arr, values, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check" key={ch}>
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              checked={values.find((val) => val === ch) || false}
              value={ch}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch}</label>
          </div>
        ))}
      </React.Fragment>
    );
  };
  render() {
    let {
      dept = "",
      designation = "",
      
    } = this.props.options;
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
export default LeftPanelComponentCh;
