import React, { Component } from "react";

class LeftPanel extends Component {
  state = {};

  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    console.log(options);
    this.props.onOptionChange(options);
  };
  makeRadio = (arr, value, name, label) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold border p-3 bg-light">
          {label}
        </label>
        {arr &&
          arr.map((ch) => (
            <div className="col-12 border p-3" key={ch}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  checked={value === ch}
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
    const { departments, designations, genders } = this.props;
    const { department, gender, designation } = this.props.options;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            {this.makeRadio(genders, gender, "gender", "Gender")}
          </div>
          <div className="col-12">
            {this.makeRadio(
              departments,
              department,
              "department",
              "Departments"
            )}
          </div>
          <div className="col-12">
            {this.makeRadio(
              designations,
              designation,
              "designation",
              "Designation"
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
