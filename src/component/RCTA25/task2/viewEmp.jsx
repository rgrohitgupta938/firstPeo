import React, { Component } from "react";
import http from "../../../services/httpService";
import queryString from "query-string";
class ViewEmp extends Component {
  state = {
    emps: [],
    pageData: {},
  };
  async fetchEmp() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let { page } = queryParams;
    let response =
      page > 1
        ? await http.get(`/empapp/emps?${searchStr}`)
        : await http.get("/empapp/emps");
    let { data } = response;
    this.setState({ emps: data.data, pageData: data.pageInfo });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchEmp();
  }
  componentDidMount() {
    this.fetchEmp();
  }
  handlePage = (n) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + n;
    queryParams.page = newPage;
    this.callURL(`/admin/viewemp`, queryParams);
  };
  callURL = (url, opt) => {
    let searchString = opt ? this.makeSearchString(opt) : "";
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page } = opt;
    let searchStr = "";
    searchStr = page > 1 ? this.addToQueryString(searchStr, "page", page) : "";
    console.log(searchStr);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  handleDetails = (n) => {
    this.props.history.push(`/admin/viewemp/${n}`);
  };
  render() {
    const { emps, pageData } = this.state;
    let { pageNumber, numberOfPages, numOfItems, totalItemCount } = pageData;
    return (
      <div className="container">
        <strong>
          {pageNumber * 10 - 9 + " to " + numOfItems + " of " + totalItemCount}
        </strong>
        <div className="row border-white">
          <div className="col-5 bg-primary border">Name</div>
          <div className="col-5 bg-primary border">Email</div>
          <div className="col-2 bg-primary border"></div>
        </div>
        {emps.map((em) => (
          <div className="row">
            <div className="col-5 border">{em.name}</div>
            <div className="col-5 border">{em.email}</div>
            <div className="col-2 border">
              {em.role !== "ADMIN" ? (
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "whitesmoke",
                    border: "2px",
                    borderColor: "black",
                  }}
                  onClick={() => this.handleDetails(em.empuserid)}
                >
                  Details
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-2">
            {pageNumber !== 1 && (
              <button
                className="btn btn-primary fw-bold"
                onClick={() => this.handlePage(-1)}
              >
                Prev
              </button>
            )}
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            {numberOfPages !== pageNumber && (
              <button
                className="btn btn-primary fw-bold"
                onClick={() => this.handlePage(1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ViewEmp;
