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
    const { fuels, types, sorts } = this.props;
    const { fuel, type, sort } = this.props.options;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            {this.makeRadio(fuels, fuel, "fuel", "Fuel")}
          </div>
          <div className="col-12">
            {this.makeRadio(types, type, "type", "Type")}
          </div>
          <div className="col-12">
            {this.makeRadio(sorts, sort, "sort", "Sort")}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LeftPanel;
