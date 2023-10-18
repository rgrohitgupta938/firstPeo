import React, { Component } from "react";

class LeftPanel extends Component {
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let options = { ...this.props.options };

    if (type === "checkbox") {
      options[name] = this.updateCBs(options[name], checked, value);
    } else {
      options[name] = value;
    }

    this.props.onOptionChange(options);
  };

  updateCBs = (inpValue, checked, value) => {
    let inpArr = inpValue ? inpValue.split(",") : [];
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

  makeRadio = (arr, value, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check" key={ch}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              checked={value === ch || false}
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
    const { designation = "", department = "" } = this.props.options;
    let { designationArr, deptArr } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            {this.makeRadio(
              designationArr,
              designation,
              "designation",
              "Designation"
            )}
          </div>
          <div className="col-12">
            {this.makeCheckBox(
              deptArr,
              department.split(","),
              "department",
              "Department"
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
