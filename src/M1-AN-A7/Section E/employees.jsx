import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import LeftPanel from "./leftPanel";

class Employees extends Component {
  state = {
    designationArr: ["Manager", "Trainee", "President"],
    deptArr: ["Finance", "Technology", "Operations", "HR"],
    temp:"",
  };
  addToQueryString = (str, paraName, paraValue) =>
    paraValue
      ? str
        ? `${str}&${paraName}=${paraValue}`
        : `${paraName}=${paraValue}`
      : str;
  callURL = (url, pr) => {
    let searchString = this.makeSearchString(pr);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (options) => {
    let { designation, department, page } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "designation", designation);
    searchStr = this.addToQueryString(searchStr, "department", department);
    searchStr = this.addToQueryString(searchStr, "page", page);
    return searchStr;
  };

  filterParams = (arr, queryParams) => {
    let { designation, department } = queryParams;
    arr = this.filterParam(arr, "designation", designation);
    arr = this.filterParam(arr, "department", department);
    return arr;
  };

  filterParam = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
  };

  handlePage = (incr,end) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let { txt = "" } = this.props.match.params;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.setState({temp:end})
    this.callURL(`/emps/${txt}`, queryParams);
  };
  handleOptionChange = (opt) => {
    opt.page = "1";
    let { txt = "" } = this.props.match.params;
    this.callURL(`/emps/${txt}`, opt);
  };

  render() {
    const { designationArr, deptArr } = this.state;
    let { employeesData } = this.props;
    let { txt = "" } = this.props.match.params;
    let queryParams = queryString.parse(this.props.location.search);
    queryParams.page = queryParams.page || 1;
    let searchString = this.makeSearchString(queryParams);
    let size = 2;
    let employeesData1 = this.filterParams(employeesData, queryParams);
    let pageNum = parseInt(queryParams.page, 10) || 1;
    let startInx = pageNum ===1 ? (pageNum - 1): (pageNum - 1) ;
    let employeesData2 = txt
      ? employeesData1.filter((emp) => emp.location === txt)
      : employeesData1;
    let endInx = pageNum === 1 ? Math.min(startInx + size-1, employeesData2.length - 1) : Math.min(startInx + size - 1, employeesData2.length - 1);
    let employeesData3 =
      employeesData2.length > 1
        ? employeesData2.filter(
            (lt, index) => index >= startInx && index <= endInx
          )
        : employeesData2;
    let maxPages = Math.ceil(employeesData2.length / 1) -1;
    console.log(employeesData3, "epm2", employeesData2);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              options={queryParams}
              designationArr={designationArr}
              deptArr={deptArr}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <h4>Welcome to Employee Portal</h4>
            <h6>You have chosen</h6>
            Location : {txt ? txt : "All"}
            <br />
            Department :{" "}
            {queryParams.department ? queryParams.department : "All"} <br />
            Designation :{" "}
            {queryParams.designation ? queryParams.designation : "All"} <br />
            <br />
            <br />
            The number of employees matching the options :{" "}
            {employeesData2.length}
            <div className="row">
              {employeesData3.map((emp) => (
                <div className="col-6 border" key={emp.email}>
                  <strong> {emp.name}</strong>
                  <br />
                  {emp.email}
                  <br />
                  Mobile : {emp.mobile}
                  <br />
                  Location : {emp.location}
                  <br />
                  Department : {emp.department}
                  <br />
                  Designation : {emp.designation}
                  <br />
                  Salary : {emp.salary}
                  <br />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-2">
                {pageNum > 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handlePage(-1,endInx)}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {pageNum < maxPages ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handlePage(1,endInx)}
                  >
                    Next
                  </button>
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

export default Employees;
