import React, { Component } from "react";
import http from "../../../services/httpService";
import queryString from "query-string";
class ViewCustomers extends Component {
  state = {
    customers: [],
    pageNo: "",
    totalItems: "",
    totalNum: "",
  };
  async fetchCust() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let { page } = queryParams;
    let response = await http.get(`/getCustomers?${searchStr}`);
    let { data } = response;
    console.log(data);
    this.setState({
      customers: data.items,
      pageNo: data.page,
      totalNum: data.totalNum,
      totalItems: data.totalItems,
    });
  }
  componentDidMount() {
    this.fetchCust();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchCust();
  }
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

  handlePage = (n) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + n;
    queryParams.page = newPage;
    this.callURL(`/allCustomers`, queryParams);
  };
  render() {
    const { customers, pageNo, totalItems, totalNum } = this.state;
    console.log(customers);
    return (
      <div className="container">
        <h4 className="m-2">All customers</h4>
        {pageNo * 5 - 4 + "-" + ((pageNo - 1) * 5 + totalItems) + " of " + totalNum}
        <div className="row p-2 fw-bold">
          <div className="col-2">Name</div>
          <div className="col-2">State</div>
          <div className="col-2">City</div>
          <div className="col-2">PAN</div>
          <div className="col-2">DOB</div>
        </div>
        {customers &&
          customers.map((cust, index) => (
            <div
              className={"row p-2"}
              style={{
                backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
              }}
            >
              <div className="col-2">{cust.name}</div>
              <div className="col-2">{cust.state}</div>
              <div className="col-2">{cust.city}</div>
              <div className="col-2">{cust.PAN}</div>
              <div className="col-2">{cust.dob}</div>
            </div>
          ))}
        <div className="row">
          <div className="col-2">
            {pageNo !== 1 && (
              <button
                className="btn btn-secondary m-2 fw-bold"
                onClick={() => this.handlePage(-1)}
              >
                Prev
              </button>
            )}
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            {totalNum > ((pageNo - 1) * 5 + totalItems) && (
              <button
                className="btn btn-secondary -2 fw-bold"
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
export default ViewCustomers;
