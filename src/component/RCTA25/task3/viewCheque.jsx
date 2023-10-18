import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
import queryString from "query-string";
class ViewCheque extends Component {
  state = {
    cheques: [],
    totalItems: "",
    totalNum: "",
    pageNo: "",
  };
  async fetchCheque() {
    const user = auth.getUser();
    console.log(user);
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/getChequeByName/${user.name}?${searchStr}`);
    console.log(response);
    let { data } = response;
    this.setState({
      cheques: data.items,
      pageNo: data.page,
      totalNum: data.totalNum,
      totalItems: data.totalItems,
    });
  }
  componentDidMount() {
    this.fetchCheque();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchCheque();
  }
  callURL = (url, opt) => {
    let searchString = opt ? this.makeSearchString(opt) : "";
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page, bank, amount } = opt;
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
    const user = auth.getUser();
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + n;
    queryParams.page = newPage;
    this.callURL(`/viewCheque`, queryParams);
  };
  render() {
    const { cheques, pageNo, totalItems, totalNum } = this.state;
    return (
      <div className="container">
        <h4 className={cheques ? "" : "text-center text-danger"}>
          {"All Cheque Details"}
        </h4>
        {cheques.length === 0 && (
          <h5 className="text-danger fw-bold">There is no Cheques</h5>
        )}
        {cheques.length !== 0
          ? pageNo * 5 -
            4 +
            "-" +
            ((pageNo - 1) * 5 + totalItems) +
            " of " +
            totalNum
          : ""}
        {cheques && cheques.length !== 0 && (
          <div className="row fw-bold p-2 text-center">
            <div className="col-4">Cheque Number</div>
            <div className="col-4">Bank Name</div>
            <div className="col-2">Branch</div>
            <div className="col-2">Amount</div>
          </div>
        )}
        {cheques &&
          cheques.map((ch, index) => (
            <div
              className="row p-2 text-center"
              style={{
                backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
              }}
            >
              <div className="col-4">{ch.chequeNumber}</div>
              <div className="col-4">{ch.bankName}</div>
              <div className="col-2">{ch.branch}</div>
              <div className="col-2">{ch.amount}</div>
            </div>
          ))}
        {cheques && (
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
              {totalNum > (pageNo - 1) * 5 + totalItems && (
                <button
                  className="btn btn-secondary m-2 fw-bold"
                  onClick={() => this.handlePage(1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ViewCheque;
