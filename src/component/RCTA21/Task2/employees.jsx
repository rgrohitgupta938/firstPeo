import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import ChOptions from "./chOptions";
class Employees extends Component {
  handleOptionChange = (pr) => {
    this.callURL("/employees/1/", pr);
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
    let { dept, designation } = queryParams;
    arr = this.filterParam(arr, "dept", dept);
    arr = this.filterParam(arr, "designation", designation);
    return arr;
  };
  filterParam = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
  };
  makeSearchString = (options) => {
    let { dept, designation } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "dept", dept);
    searchStr = this.addToQueryString(searchStr, "designation", designation);
    return searchStr;
  };
  makeAllOptions = (arr) => {
    let json = {};
    json.dept = this.getDifferentValues(arr, "dept");
    json.designation = this.getDifferentValues(arr, "designation");
    return json;
  };
  getDifferentValues = (arr, name) =>
    arr.reduce(
      (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc : [...acc, curr[name]],
      []
    );
  render() {
    const { emps } = this.props;
    const { page } = this.props.match.params;
    const queryParams = queryString.parse(this.props.location.search);
    let { deptName, designation } = queryParams;
    let searchString = this.makeSearchString(queryParams);

    let pageNum = +page;
    let size = 4;
    let emps1 = this.filterParams(emps, queryParams);
    let startInx = (pageNum - 1) * size;
    let endInx =
      emps1.length > startInx + size - 1
        ? startInx + size - 1
        : emps1.length - 1;
    let emps2 =
      emps1.length > size
        ? emps1.filter((lt, index) => index >= startInx && index <= endInx)
        : emps1;
    console.log(emps2);
    const totalPages = Math.ceil(emps1.length / size);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    let allOptions = this.makeAllOptions(emps);
    return (
      <div className="container">
        <h6 className="m-2">
          Showing {startInx + 1} to {endInx + 1} of {emps1.length}
        </h6>
        <div className="row">
          <div className="col-3">
            <ChOptions
              allOptions={allOptions}
              options={queryParams}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <h2>
              List of Employees {deptName ? "belonging to Technology" : ""}
            </h2>
            {emps2.map((emp, index) => (
              <div className="row" key={emp.id}>
                <div className="col-3 border">
                  <Link to={`/employee/${emp.id}/1`}>{emp.id}</Link>
                </div>
                <div className="col-3 border">{emp.name}</div>
                <div className="col-3 border">{emp.dept}</div>
                <div className="col-3 border">{emp.designation}</div>
              </div>
            ))}
            <div className="row">
              <div className="col-10"></div>
              <div className="col-2 p-2">
                { totalPages > 1 && pageNumbers.map((num) => (
                  <Link
                    key={num}
                    style={{ textDecoration: "none" }}
                    to={`/employees/${num}?${searchString}`}
                    className={pageNum === num ? "active" : ""}
                  >
                    <span className="p-1">{num}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Employees;
