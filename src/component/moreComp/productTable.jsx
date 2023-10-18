import React, { Component } from "react";
class ProductTable extends Component {
  render() {
    const { prod, index, onIncrease, onDecrease } = this.props;
    const { name, code, price, qty } = prod;
    return (
      <React.Fragment>
        <div className="col-4 text-center bg-light">{name}</div>
        <div className="col-1 text-center bg-light">{code}</div>
        <div className="col-1 text-center bg-light">{price}</div>
        <div className="col-2 text-center bg-light">{qty}</div>
        <div className="col-2 text-center bg-light">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onIncrease(index)}
          >+</button>
        </div>
        <div className="col-2 text-center bg-light">
          {qty > 0 ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDecrease(index)}
            >-</button>
          ) : (
            <button
              className="btn btn-danger btn-sm"
              disabled
              onClick={() => onDecrease(index)}
            >-</button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default ProductTable;
