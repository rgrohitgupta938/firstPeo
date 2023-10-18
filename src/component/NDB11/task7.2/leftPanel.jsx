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
        {arr.map((ch) => (
          <div className="col-12 border p-3">
            <div className="form-check" key={ch}>
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
    const { genders, payments, cities } = this.props;
    const { gender, city, payment } = this.props.options;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            {this.makeRadio(genders, gender, "gender", "Gender")}
          </div>
          <div className="col-12">
            {this.makeRadio(payments, payment, "payment", "Payment")}
          </div>
          <div className="col-12">
            {this.makeRadio(cities, city, "city", "City")}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LeftPanel;
