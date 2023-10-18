import React, { Component } from "react";
import http from "../../../services/httpService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class NetBanking extends Component {
  state = {
    netBanking: [],
    pageNo: "",
    totalItems: "",
    totalNum: "",
    banks: ["SBI", "ICICI", "HDFC", "AXIS", "DBS", "GBI"],
    amounts: ["<10000", ">=10000"],
  };
  async fetchNetTrans() {
    let queryParams = queryString.parse(this.props.location.search);
    let { page } = queryParams;
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/getAllNetBankings?${searchStr}`);
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
    searchStr = this.addToQueryString(searchStr, "bank", bank);
    searchStr = this.addToQueryString(searchStr, "amount", amount);
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
    this.callURL(`/allNet`, queryParams);
  };
  handleOptionChange = (opt) => {
    let { bank, amount, page } = opt;
    opt.page = 1;
    this.callURL("/allNet", opt);
  };
  render() {
    const { netBanking, pageNo, totalItems, totalNum, amounts, banks } =
      this.state;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <h4>All Net Banking Transactions</h4>
        <div className="row">
          <div className="col-3">
            <LeftPanel
              options={queryParams}
              onOptionChange={this.handleOptionChange}
              banks={banks}
              amounts={amounts}
            />
          </div>
          <div className="col-9">
            {pageNo * 5 -
              4 +
              "-" +
              ((pageNo - 1) * 5 + totalItems) +
              " of " +
              totalNum}
            <div className="row fw-bold p-2">
              <div className="col-2">Name</div>
              <div className="col-2">Payee Name</div>
              <div className="col-2">Amount</div>
              <div className="col-2">Bank Name</div>
              <div className="col-2">Comment</div>
            </div>
            {netBanking &&
              netBanking.map((ch, index) => (
                <div
                  className="row p-2"
                  style={{
                    backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
                  }}
                >
                  <div className="col-2">{ch.name}</div>
                  <div className="col-2">{ch.payeeName}</div>
                  <div className="col-2">{ch.amount}</div>
                  <div className="col-2">{ch.bankName}</div>
                  <div className="col-2">{ch.comment}</div>
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
                {totalNum > (pageNo - 1) * 5 + totalItems && (
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
        </div>
      </div>
    );
  }
}
export default NetBanking;
