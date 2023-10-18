import React, { Component } from "react";

class LeftPanel extends Component {
  state = {};

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
    let inpArr = inpValue ? inpValue.split(",") : [];
    if (checked) {
      inpArr.push(value);
    } else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) {
        inpArr.splice(index, 1);
      }
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
    const { rams, roms, brands } = this.props;
    const { ram = "", rom = "", brand = "" } = this.props.options;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 m-2">
            {this.makeCheckBox(rams, ram.split(","), "ram", "Select RAM")}
          </div>
          <div className="col-12 m-2">
            {this.makeCheckBox(roms, rom.split(","), "rom", "Select ROM")}
          </div>
          <div className="col-12 m-2">
            {this.makeCheckBox(
              brands,
              brand.split(","),
              "brand",
              "Select Brand"
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
