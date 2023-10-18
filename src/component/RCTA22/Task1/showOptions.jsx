import React, { Component } from "react";

class ShowOptions extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    this.props.onOptionChange(options);
  };

  render() {
    let { minPrice = "", maxPrice = "", instock = "" } = this.props.options;
    let prices = [0, 25, 50, 75, 100];
    let stocks = [
      { display: "In Stock", value: "yes" },
      { display: "Out of Stock", value: "no" },
    ];

    return (
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="minPrice"
              value={minPrice}
              onChange={this.handleChange}
            >
              <option key="" disabled value="">
                Select Min Price
              </option>
              {prices.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="maxPrice"
              value={maxPrice}
              onChange={this.handleChange}
            >
              <option key="" disabled value="">
                Select Max Price
              </option>
              {prices.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="instock"
              value={instock}
              onChange={this.handleChange}
            >
              <option key="" disabled value="">
                Select Stock Position
              </option>
              {stocks.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.display}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowOptions;
