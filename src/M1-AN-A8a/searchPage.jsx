import React, { Component } from "react";
import pic from "./pic1.avif";
import http from "./httpService";
import queryString from "query-string";
class SearchgPage extends Component {
  state = {
    txt: "",
    books: {},
  };

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1[input.name] = input.value;
    this.setState(s1);
  };
  handleSearch = (str) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { q = str, maxResults = +this.props.leftPanelCh.entries, startIndex = "0" } = queryParams;
    queryParams.q = str;
    console.log(queryParams);
    this.callURL("/books", queryParams);
  };
  makeSearchString = (opt) => {
    let { q = "", maxResults =+this.props.leftPanelCh.entries, startIndex = "0" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "q", q);
    searchStr = this.addToQueryString(searchStr, "maxResults", maxResults);
    searchStr = this.addToQueryString(searchStr, "startIndex", startIndex);
    return searchStr;
  };
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };

  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  render() {
    const { txt } = this.state;
    return (
        <div className="conatiner">
      <div
        style={{ display: "flex", justifyContent: "center", height: "auto" }}
      >
        <div className="row">
          <div className="col-12">
            <img
              src={pic}
              alt="Book Cover"
              style={{
                width: "60%",
                borderRadius: "50%",
                border: "25px solid transparent",
              }}
            /><br/>
          </div>
        </div>
        </div>
        <div className="row">
            <div className="col-3"></div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="txt"
              name="txt"
              onChange={this.handleChange}
              placeholder="Enter Search Text"
              value={txt}
            />
          </div>
          <div className="col-3">
            <button
              className="btn btn-primary"
              onClick={() => this.handleSearch(txt)}
            >
              Search
            </button>
          </div>
        </div>
        </div>
    );
  }
}
export default SearchgPage;
