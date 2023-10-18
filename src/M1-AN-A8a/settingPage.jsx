import React, { Component } from "react";

class SettingPage extends Component {
  state = {
    leftPanelCh: this.props.leftPanelCh,
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    this.setState(
      (prevState) => ({
        leftPanelCh: {
          ...prevState.leftPanelCh,
          [name]: newValue,
        },
      }),
      () => {
        this.props.onOptionChange(this.state.leftPanelCh);
      }
    );
  };

  render() {
    const { printTy, lang, fil, order, entries } = this.state.leftPanelCh;

    return (
      <div className="container">
        <h4 className="text-danger">Select Options for Filtering on Left Panel</h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="printTy"
            checked={printTy}
            onChange={this.handleChange}
          />
          <label className="form-check-label">printType--(Restirct to books or magzines)</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="lang"
            checked={lang}
            onChange={this.handleChange}
          />
          <label className="form-check-label">languages--(Resticts the vloumes returned to those are tagged with specifified language)</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="fil"
            checked={fil}
            onChange={this.handleChange}
          />
          <label className="form-check-label">filter--(Filter search results by volume type and availabilty.)</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="order"
            checked={order}
            onChange={this.handleChange}
          />
          <label className="form-check-label">order--(Order of the volume search results.)</label>
        </div>
        <div className="form-group">
          <label style={{color:"green",fontSize:"20px"}}>No of entries in a page</label>
          <input
            type="text"
            className="form-control"
            id="entries"
            name="entries"
            onChange={this.handleChange}
            placeholder=""
            value={entries}
          />
        </div>
      </div>
    );
  }
}

export default SettingPage;
