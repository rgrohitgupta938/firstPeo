import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class ViewNet extends Component {
  state = {
    netBanking: [],
    pageNo: "",
    totalItems: "",
    totalNum: "",
  };
  async fetchNetTrans() {
    let queryParams = queryString.parse(this.props.location.search);
    let { page } = queryParams;
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(
      `/getNetBankingByName/${auth.getUser().name}?${searchStr}`
    );
    let { data } = response;
    this.setState({
      netBanking: data.items,
      pageNo: data.page,
      totalNum: data.totalNum,
      totalItems: data.totalItems,
    });
  }
  componentDidMount() {
    this.fetchNetTrans();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchNetTrans();
  }
  callURL = (url, opt) => {
    let searchString = opt ? this.makeSearchString(opt) : "";
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page = 1, bank, amount } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "page", page);
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
    this.callURL(`/viewNet`, queryParams);
  };
  render() {
    const { netBanking, pageNo, totalItems, totalNum } = this.state;
    console.log(netBanking);
    return (
      <div className="container">
        <h4 className={netBanking ? "" : "text-center text-danger"}>
          {"All Net Banking Details"}
        </h4>
        {netBanking.length === 0 && (
          <h5 className="text-danger fw-bold">
            There is no Net Banking transactions
          </h5>
        )}
        {netBanking && netBanking.length !== 0
          ? pageNo * 5 -
            4 +
            "-" +
            ((pageNo - 1) * 5 + totalItems) +
            " of " +
            totalNum
          : ""}
        {netBanking.length !== 0 ? (
          <div className="row fw-bold p-2 text-center">
            <div className="col-4">Payee Name</div>
            <div className="col-4">Amount</div>
            <div className="col-2">Bank Name</div>
            <div className="col-2">Comment</div>
          </div>
        ) : (
          ""
        )}
        {netBanking &&
          netBanking.map((ch, index) => (
            <div
              className="row p-2 text-center"
              style={{
                backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
              }}
            >
              <div className="col-4">{ch.payeeName}</div>
              <div className="col-4">{ch.amount}</div>
              <div className="col-2">{ch.bankName}</div>
              <div className="col-2">{ch.comment}</div>
            </div>
          ))}
        {netBanking && (
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
export default ViewNet;
