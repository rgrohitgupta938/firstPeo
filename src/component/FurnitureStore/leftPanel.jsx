import React, { Component } from "react";

class LeftPanel extends Component {
  handleOptionChange = (value) => {
    this.props.onOptionChange(value);
  };

  render() {
    const { categoryArr, selCategory } = this.props;

    return (
      <div className="form-group">
        <div>
          <div className="row border p-3 me-4 row-width">
            <label className="m-0 pe-3 fw-bold">Options</label>
          </div>

          {categoryArr.map((t1, index) => (
            <div className="row border p-2 me-4 row-width" key={index}>
              <div className="form-check" key={t1}>
                <input
                  type="radio"
                  name="category"
                  value={t1}
                  className="form-check-input"
                  checked={selCategory === t1}
                  onChange={() => this.handleOptionChange(t1)}
                />
                <label className="form-check-label form-check-inline">
                  {t1}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LeftPanel;
