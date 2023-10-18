import React, { Component } from "react";

class LeftPanelComp extends Component {
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
        <label className="form-check-label fw-bold border p-3 bg-light">{label}</label>
        {arr.map((ch) => (
          <div className="col-12 border p-3">
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
          </div>
        ))}
      </React.Fragment>
    );
  };

  makeDropDown = (arr, value, name, label) => {
    return (
      <div className="form-group row">
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

  render() {
    let { section = "", ["order-by"]: orderby } = this.props.options;
    let { sectionArr, orderArr } = this.props;

    return (
      <React.Fragment>
        <div className="row mt-4">
          <div className="col-12 p-2 border bg-light">
            <strong>Order By</strong>
          </div>
          
            {this.makeDropDown(orderArr, orderby, "orderby", "Order By")}
          
        </div>
        <div className="mt-5"></div>
        <div className="col-12">
          <hr className="light" />
        </div>
        <div className="row">
          {this.makeRadio(sectionArr, section, "section", "Sections")}
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanelComp;
