import React, { Component } from "react";
class LeftPanel extends Component {
  state = {};

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
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
    const { banks, amounts } = this.props;
    const { bank = "", amount = "" } = this.props.options;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 m-2">
            {this.makeRadio(banks, bank, "bank", "Bank")}
          </div>
          <div className="col-12 m-2">
            {this.makeRadio(amounts, amount, "amount", "Amount")}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
