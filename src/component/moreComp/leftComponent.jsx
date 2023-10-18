import React, { Component } from "react";
class LeftComponent extends Component {
  handleChange = (e) => {
    let s1 = {...this.props.optionsSel};
    let { currentTarget: input } = e;
    input.name === "rating"
      ? (s1.rating = this.updateCBs(input.checked,input.value,s1.rating))
      : input.name === "processor"
      ? (s1.processor = this.updateCBs(input.checked,input.value,s1.processor))
      : input.name === "hardDisk"
      ? (s1.hardDisk = this.updateCBs(input.checked,input.value,s1.hardDisk))
      : (s1[input.name] = input.value);
      console.log(s1);
    this.props.onChangeOption(s1);
  };

  updateCBs = (checked, value, arr) => {
    if (checked) arr.push(value);
    else {
      let index = arr.findIndex((ele) => ele === value);
      if (index >= 0) arr.splice(index, 1);
    }
    return arr;
  };

  render() {
    const { optionsSel, optionsArray } = this.props;
    return (
      <div className="container">
        <h6>Choose Options</h6>
        <button className="btn btn-warning btn-sm" onClick={this.props.onClear}>
          Clear All
        </button>
        <br />
        {this.showDropDown(
          "Brand",
          optionsArray.brand,
          "brand",
          optionsSel.brand
        )}
        {this.showDropDown("RAM", optionsArray.ram, "ram", optionsSel.ram)}
        {this.showcheckBoxes(
          "Processors",
          optionsArray.processor,
          "processor",
          optionsSel.processor
        )}
        {this.showcheckBoxes(
          "Rating",
          optionsArray.rating,
          "rating",
          optionsSel.rating
        )}
        {this.showcheckBoxes(
          "Hard Disk",
          optionsArray.hardDisk,
          "hardDisk",
          optionsSel.hardDisk
        )}
      </div>
    );
  }

  showDropDown = (label, arr, name, salVal) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <select
          className="form-control"
          name={name}
          value={salVal}
          onChange={this.handleChange}
        >
          <option disabled value="">
            Choose {label}s
          </option>
          {arr.map((n) => (
            <option>{n}</option>
          ))}
        </select>
      </div>
    );
  };
  showcheckBoxes = (label, arr, name, selArr) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={name}
              checked={selArr.findIndex((tech) => tech === ch) >= 0}
              value={ch}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch}</label>
          </div>
        ))}
      </React.Fragment>
    );
  };
}
export default LeftComponent;
