import React, { Component } from "react";
class LeftPanel extends Component {
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
  updateCBs = (inpVal, checked, value) => {
    let inpArr = inpVal ? inpVal.split(",") : [];
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
        <div className="row border p-2">
          {" "}
          <label className="form-check-label fw-bold">{label}</label>
        </div>
        {arr &&
          arr.map((ch) => (
            <div className="row border p-2">
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
            </div>
          ))}
      </React.Fragment>
    );
  };
  render() {
    const { course = "" } = this.props.options;
    let { courses } = this.props;
    return (
      <div className="container mt-5">
        {this.makeCheckBox(courses, course, "course", "Options")}
      </div>
    );
  }
}
export default LeftPanel;
