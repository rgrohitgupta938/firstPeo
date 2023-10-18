import React, { Component } from "react";
import LeftPanelComp from "./leftPanelComp";
import { Link } from "react-router-dom";
import queryString from "query-string";

class React1 extends Component {
  state = {
    course: [],
    status: [],
  };
  handleOptionChange = (pr) => {
    const { course, status } = pr;
    this.setState({ course, status }, () => {
      this.callURL("/jobs/react1/1", pr);
    });
  };

  callURL = (url, pr) => {
    let searchString = this.makeSearchString(pr);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  addToQueryString = (str, paraName, paraValue) =>
    paraValue
      ? str
        ? `${str}&${paraName}=${paraValue}`
        : `${paraName}=${paraValue}`
      : str;

  filterParams = (arr, queryParams) => {
    let { status, course } = queryParams;
    arr = this.filterParam(arr, "status", status);
    arr = this.filterParam(arr, "course", course);
    return arr;
  };
  filterParam = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
  };
  makeSearchString = (options) => {
    let { status, course } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "status", status);
    searchStr = this.addToQueryString(searchStr, "course", course);
    return searchStr;
  };
  makeAllOptions = (arr) => {
    let json = {};
    json.status = this.getDifferentValues(arr, "status");
    json.course = this.getDifferentValues(arr, "course");
    return json;
  };
  getDifferentValues = (arr, name) =>
    arr.reduce(
      (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc : [...acc, curr[name]],
      []
    );

  render() {
    const { course, status } = this.state;
    const { resume } = this.props;
    let resume1 = resume.filter((res) => res.tech === "React");
    const { page } = this.props.match.params;
    const queryParams = queryString.parse(this.props.location.search);
    let pageNum = +page;
    let resume2 = this.filterParams(resume1, queryParams);
    const totalPages = 10;
    let allOptions = this.makeAllOptions(resume);

    const nextPage = () => {
      const nextPageNum = pageNum + 1;
      const newQueryParams = { ...queryParams, page: nextPageNum };
      const searchString = queryString.stringify(newQueryParams);
      const url = `/jobs/react1/${nextPageNum}?${searchString}`;
      this.props.history.push(url);
    };

    const previousPage = () => {
      const previousPageNum = pageNum - 1;
      const newQueryParams = { ...queryParams, page: previousPageNum };
      const searchString = queryString.stringify(newQueryParams);
      const url = `/jobs/react1/${previousPageNum}?${searchString}`;
      this.props.history.push(url);
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-4 bg-light">
            <LeftPanelComp
              resume={resume}
              allOptions={allOptions}
              options={queryParams}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-8">
            Job Details <br />
            Role: React
            <br />
            Course Done: {course}
            <br />
            Current Status: {status}
            <br />
            Page Number: {page}
            <br />
            {resume2.map((res) => (
              <div className="row border">
                <div className="col-3">{res.name}</div>
                <div className="col-2">{res.course}</div>
                <div className="col-2">{res.year}</div>
                <div className="col-3">{res.status}</div>
                <div className="col-2">{res.tech}</div>
              </div>
            ))}
            {pageNum > 1 && (
              <button
                className="btn btn-primary btn-sm m-2"
                onClick={previousPage}
              >
                Previous
              </button>
            )}
            {pageNum < totalPages && (
              <button className="btn btn-primary btn-sm m-2" onClick={nextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default React1;
