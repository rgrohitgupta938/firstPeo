import React, { Component } from "react";
import http from "../../RCTA24/Task5/httpService";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanelComp from "./leftPanelComp";
class Persons extends Component {
  state = {
    data: {},
    cities: ["London", "Paris", "New Delhi", "Bangalore"],
    companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"],
    ages: [25, 30, 35, 40, 45, 50],
  };
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/personApp/persons?${searchStr}`);
    let { data } = response;
    console.log(response);
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.callURL("/persons", queryParams);
  };
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    console.log(opt);
    let { page,company,city,minAge } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "page", page);
    searchStr = this.addToQueryString(searchStr, "city", city);
    searchStr = this.addToQueryString(searchStr, "minAge", minAge);
    searchStr = this.addToQueryString(searchStr, "company", company);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
   handleOptionChange = (opt) => {
    opt.page = "1";
        this.callURL("/persons",opt);
      }
  render() {
    const { startIndex, endIndex, numOfItems, persons = [] } = this.state.data;
    const { cities, companies, ages } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanelComp
              options={queryParams}
              cities={cities}
              companies={companies}
              ages={ages}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <h4>List of Persons</h4>
            <h6>
              Showing {startIndex} to {endIndex} of {numOfItems}
            </h6>
            {persons.map((pr) => (
              <div className="row" key={pr.id}>
                <div className="col-2 border">
                  <Link to={`/persons/${pr.id}`}>{pr.id}</Link>
                </div>
                <div className="col-3 border">{pr.name}</div>
                <div className="col-1 border">{pr.age}</div>
                <div className="col-2 border">{pr.city}</div>
                <div className="col-2 border">{pr.company}</div>
              </div>
            ))}
            <div className="row">
              <div className="col-2">
                {startIndex > 1 ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handlePage(-1)}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {endIndex < numOfItems ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handlePage(1)}
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
export default Persons;
