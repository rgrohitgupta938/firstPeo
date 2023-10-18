import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import ShowStoreOptions from "./showStoreOptions";

class Stores extends Component {
  filterParams = (arr, queryParams) => {
    let { location } = queryParams;
    console.log(location);
    if (!location) return arr;
    let loactionArr = location.split(",");
    console.log(location);
    let arr1 = arr.filter((a1) =>
      loactionArr.find((val) => val === a1.location)
    );
    console.log(arr1);
    return arr1;
  };
  handleClick = (options) => {
    this.callURL("/stores", options);
  };
  callURL = (url, options) => {
    let searchStr = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchStr,
    });
  };
  makeSearchString = (options) => {
    let {location} = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "location", location);
    return searchStr;
  };

  addToQueryString = (str, paramName, paranValue) =>
    paranValue
      ? str
        ? `${str}&${paramName}=${paranValue}`
        : `${paramName}=${paranValue}`
      : str;
  handleOptionChange = (options) => {
        console.log(options);
        this.callURL("/stores", options);
      };
  render() {
    const { stores } = this.props;
    let queryParams = queryString.parse(this.props.location.search);
    let stores1 = this.filterParams(stores, queryParams);
    console.log(stores1);

    return (
      <div className="container">
        <ShowStoreOptions stores={stores} options={queryParams} onOptionChange={this.handleOptionChange} />
        <div className="row border bg-dark text-white">
          <div className="col-3 border">Id</div>
          <div className="col-3 border">Location</div>
          <div className="col-3 border">Email</div>
          <div className="col-3 border">Mobile</div>
        </div>
        {stores1.map((k) => (
          <div className="row border bg-light" key={k.id}>
            <div className="col-3 border">{k.id}</div>
            <div
              className="col-3 border"
              onClick={() => this.handleClick(k.location)}
            >
              <Link to={`/stores/${k.location}`}>{k.location}</Link>
            </div>
            <div className="col-3 border">{k.email}</div>
            <div className="col-3 border">{k.mobile}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default Stores;
