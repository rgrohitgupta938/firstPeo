import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanelComponentCh from "./leftPanelOptionsCh";
class Laptops extends Component {
  handleOptionChange = (pr) => {
    this.callURL("/all/1/",pr);
  };

  callURL = (url,pr) => {
    let searchString = this.makeSearchString(pr);
    this.props.history.push({
      pathname:url,
      search: searchString,
    })
  }

  filterParams = (arr, queryParams) => {
    let { brand, ram, processor, hardDisk, rating } = queryParams;
    arr = this.filterParam(arr, "brand", brand);
    arr = this.filterParam(arr, "ram", ram);
    arr = this.filterParam(arr, "processor", processor);
    arr = this.filterParam(arr, "hardDisk", hardDisk);
    arr = this.filterParam(arr, "rating", rating);
    return arr;
  };
  filterParam = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
  };
  addToQueryString = (str, paraName, paraValue) =>
    paraValue
      ? str
        ? `${str}&${paraName}=${paraValue}`
        : `${paraName}=${paraValue}`
      : str;

  makeSearchString = (options) => {
    let { brand, ram, processor, hardDisk, rating } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "brand", brand);
    searchStr = this.addToQueryString(searchStr, "ram", ram);
    searchStr = this.addToQueryString(searchStr, "processor", processor);
    searchStr = this.addToQueryString(searchStr, "hardDisk", hardDisk);
    searchStr = this.addToQueryString(searchStr, "rating", rating);
    return searchStr;
  };
  makeAllOptions = (arr) => {
    let json = {};
    json.brand = this.getDifferentValues(arr, "brand");
    json.ram = this.getDifferentValues(arr, "ram");
    json.processor = this.getDifferentValues(arr, "processor");
    json.rating = this.getDifferentValues(arr, "rating");
    json.hardDisk = this.getDifferentValues(arr, "hardDisk");
    return json;
  };
  getDifferentValues = (arr, name) =>
    arr.reduce(
      (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc : [...acc, curr[name]],
      []
    );

  render() {
    const { laptops } = this.props;
    const { category, value, page } = this.props.match.params;
    let queryParams = queryString.parse(this.props.location.search);
    let searchString = this.makeSearchString(queryParams);
    let pageNum = +page;
    let size = 3;
    let laptops1 = this.filterParams(laptops, queryParams);
    let startInx = (pageNum - 1) * size;
    let endInx =
      laptops1.length > startInx + size - 1
        ? startInx + size - 1
        : laptops1.length - 1;
    let laptops2 =
      laptops1.length > 3
        ? laptops1.filter((lt, index) => index >= startInx && index <= endInx)
        : laptops1;
    let allOptions = this.makeAllOptions(laptops);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanelComponentCh
              allOptions={allOptions}
              options={queryParams}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <h6>
              Showing {startInx + 1} to {endInx + 1} of {laptops1.length}
            </h6>
            <h6>Filter : {}</h6>
            <div className="row">
              {laptops2.map((lt) => (
                <div className="col-4 border bg-light" key={lt.model}>
                  Model : <Link to={`/laptop/${lt.model}`}>{lt.model}</Link>
                  <br />
                  Brand :{" "}
                  <Link to={`/all/1/?brand=${lt.brand}`}>{lt.brand}</Link>
                  <br />
                  RAM : <Link to={`/all/1?ram=${lt.ram}`}>{lt.ram}</Link>
                  <br />
                  Processor :{" "}
                  <Link to={`/all/1?processor=${lt.processor}`}>
                    {lt.processor}
                  </Link>
                  <br />
                  Hard Disk :{" "}
                  <Link to={`/all/1?hardDisk=${lt.hardDisk}`}>
                    {lt.hardDisk}
                  </Link>
                  <br />
                  Rating :{" "}
                  <Link to={`/all/1?rating=${lt.rating}`}>{lt.rating}</Link>
                  <br />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-2">
                {startInx > 0 ? (
                  <Link to={`/all/${pageNum - 1}?${searchString}`}>Prev</Link>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {endInx < laptops1.length - 1 ? (
                  <Link to={`/all/${pageNum + 1}?${searchString}`}>Next</Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Laptops;
