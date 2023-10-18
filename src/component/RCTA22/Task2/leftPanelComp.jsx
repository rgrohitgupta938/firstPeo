import React, { Component } from "react";
class LeftPanelComp extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    if (input.type === "checkbox") {
      options[input.name] = this.updateCBs(
        options[input.name],
        input.checked,
        input.value
      );
    }
    else if(input.type === "radio"){
        options[input.name] =input.value
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
    let { status = "", course = "" } = this.props.options;
    let { allOptions } = this.props;
    console.log(allOptions.status);
    return (
      <div className="row border bg-light">
        <div className="col-12 m-2">
          {this.makeRadio(allOptions.status, status, "status", "Select Status")}
        </div>
        <div className="col-12 m-2">
          {this.makeCheckBox(
            allOptions.course,
            course.split(","),
            "course",
            "Select Course"
          )}
        </div>
      </div>
    );
  }
}
export default LeftPanelComp;
