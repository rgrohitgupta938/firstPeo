import React, { Component } from "react";
class LeftPanel extends Component {
  state = {
    leftPanelCh:this.props.leftPanelCh,
  };

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
              <label className="form-check-label">
                {ch
                  ? ch === "hi"
                    ? "Hindi"
                    : ch === "en"
                    ? "English"
                    : ch === "es"
                    ? "Spanish"
                    : ch === "fr"
                    ? "French"
                    : ch === "zh"
                    ? "Chinese"
                    : ch
                  : ch}
              </label>
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
          <option value="">
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
    let {
      filter,
      ["order-By"]: orderBy,
      printType,
      langRestict,
    } = this.props.options;
    let { filterArr, orderArr, printArr, langRestictArr } = this.props;
    let { printTy, lang, fil, order } = this.state.leftPanelCh;

    return (
      <React.Fragment>
        <div className="row mt-4">
          {lang && <div className="row">
            {this.makeRadio(
              langRestictArr,
              langRestict,
              "langRestict",
              "Languages"
            )}
          </div>}
          <div className="col-12">
            <hr className="light" />
          </div>
          {fil&&<div className="row">
            {this.makeRadio(filterArr, filter, "filter", "Filters")}
          </div>}
          <div className="col-12">
            <hr className="light" />
          </div>
          {printTy &&<div className="row">
            {this.makeRadio(printArr, printType, "printType", "Print Type")}
          </div>}
          <div className="col-12">
            <hr className="light" />
          </div>
          <div className="col-12 p-2 border bg-light">
           { order && <strong>Order By</strong>}
          </div>

          {order &&  this.makeDropDown(orderArr, orderBy, "orderBy", "Order By")}
        </div>
        <div className="mt-5"></div>
      </React.Fragment>
    );
  }
}
export default LeftPanel;
