import React, { Component } from "react";

class LeftPanelComp extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    if (input.name === "city" || input.name === "company") {
      options[input.name] = this.updateCBs(
        options[input.name],
        input.checked,
        input.value
      );
    } else options[input.name] = input.value;
    console.log("Options Cbs", options);
    this.props.onOptionChange(options);
  };

  updateCBs = (inpVal, checked, value) => {
    let inpArr = inpVal ? inpVal.split(",") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr.join(",");
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
          <option disabled value="">
            {label}
          </option>
          {arr.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>
    );
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
              checked={values.includes(ch)}
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
    let { city = "", company = "", minAge = "" } = this.props.options;
    let { cities, companies, ages } = this.props;

    return (
      <div className="row border bg-light">
        <div className="col-12">
          {this.makeCheckBox(cities, city.split(","), "city", "Select City")}
        </div>
        <div className="col-12">
          {this.makeCheckBox(
            companies,
            company.split(","),
            "company",
            "Select Company"
          )}
        </div>
        <div className="col-12">
          {this.makeDropDown(ages, minAge, "minAge", "Select Minimum Age")}
        </div>
      </div>
    );
  }
}

export default LeftPanelComp;
