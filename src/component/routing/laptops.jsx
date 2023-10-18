import React, { Component } from "react";
import { Link } from "react-router-dom";
class Laptops extends Component {
  render() {
    const { laptops } = this.props;
    const { category, value, page } = this.props.match.params;
    let pageNum = +page;
    let size = 3;
    let laptops1 = !category
      ? laptops
      : laptops.filter((lt) => lt[category] === value);

    let filterText = !category ? "None" : `${category}=${value}`;
    let startInx = (pageNum - 1) * size;
    let endInx =
      laptops1.length > startInx + size - 1
        ? startInx + size - 1
        : laptops1.length - 1;
    let laptops2 =
      laptops1.length > 3
        ? laptops1.filter((lt, index) => index >= startInx && index <= endInx)
        : laptops1;

    return (
      <div className="container">
        <h6>
          Showing {startInx + 1} to {endInx + 1} of {laptops1.length}
        </h6>
        <h6>Filter : {filterText}</h6>
        <div className="row">
          {laptops2.map((lt) => (
            <div className="col-4 border bg-light">
              Model : <Link to={`/laptop/${lt.model}/`}>{lt.model}</Link>
              <br />
              Brand : <Link to={`/brand/${lt.brand}/1`}>{lt.brand}</Link>
              <br />
              RAM : <Link to={`/ram/${lt.ram}/1`}>{lt.ram}</Link>
              <br />
              Processor :{" "}
              <Link to={`/processor/${lt.processor}/1`}>{lt.processor}</Link>
              <br />
              Hard Disk :{" "}
              <Link to={`/hardDisk/${lt.hardDisk}/1`}>{lt.hardDisk}</Link>
              <br />
              Rating : <Link to={`/rating/${lt.rating}/1`}>{lt.rating}</Link>
              <br />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-2">
            {startInx > 0 ? <Link to={!category ? `/all/${pageNum - 1}` : `/${category}/${value}/${pageNum - 1}`}>Prev</Link> : ""}
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            {endInx < laptops1.length-1 ? (
              <Link to={!category ? `/all/${pageNum + 1}` : `/${category}/${value}/${pageNum + 1}`}>Next</Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Laptops;
