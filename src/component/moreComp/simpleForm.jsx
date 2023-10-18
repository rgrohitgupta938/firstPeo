import React, { Component } from "react";

class SettingPage extends Component {
  handleChange = (e) => {
    const { name, checked } = e.target;
    this.props.onOptionChange({ ...this.props.leftPanelCh, [name]: checked });
  };

  render() {
    const { leftPanelCh } = this.props;
    const { printTy, lang, fil, order } = leftPanelCh;

    return (
      <div className="container">
        <h4>Select Options for Filtering on Left Panel</h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="printTy"
            checked={printTy}
            onChange={this.handleChange}
          />
          <label className="form-check-label">printTy</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="lang"
            checked={lang}
            onChange={this.handleChange}
          />
          <label className="form-check-label">lang</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="fil"
            checked={fil}
            onChange={this.handleChange}
          />
          <label className="form-check-label">fil</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="order"
            checked={order}
            onChange={this.handleChange}
          />
          <label className="form-check-label">order</label>
        </div>
      </div>
    );
  }
}

export default SettingPage;
