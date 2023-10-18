import React, { Component } from "react";

class LeftComp extends Component {
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
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
    let { countries = "" } = this.props.options;
    let { countriesArr } = this.props;
    return (
       <React.Fragment>
        <div className="col-12">
        Left Comp!
        </div>
        <div className="col-12">
        <h6 className="ms-2 mt-2">Options</h6>
        <div className="col-12">
            <hr className="light"></hr>
        </div>
        </div>
       <div className="col-12">
         {this.makeRadio(countriesArr, countries, "countries", "Countries")}
       </div>
       </React.Fragment>
    );
  }
}

export default LeftComp;
