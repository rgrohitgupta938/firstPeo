import React, { Component } from "react";
import http from "../../../services/httpService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class AllCheque extends Component {
  state = {
    cheques: [],
    totalItems: "",
    totalNum: "",
    pageNo: "",
    banks: ["SBI", "ICICI", "HDFC", "AXIS", "DBS", "GBI"],
    amounts: ["<10000", ">=10000"],
  };
  async fetchCheque() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let { page } = queryParams;
    let response = await http.get(`/getAllCheques?${searchStr}`);
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
    this.callURL(`/allCheques`, queryParams);
  };
  handleOptionChange = (opt) => {
    let { bank, amount, page } = opt;
    opt.page = 1;
    this.callURL("/allCheques", opt);
  };
  render() {
    const { cheques, pageNo, totalItems, totalNum, amounts, banks } =
      this.state;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <h4>All Cheque Transactions</h4>
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
              <div className="col-2">Cheque Number</div>
              <div className="col-2">Bank Name</div>
              <div className="col-2">Branch</div>
              <div className="col-2">Amount</div>
            </div>
            {cheques &&
              cheques.map((ch, index) => (
                <div
                  className="row p-2"
                  style={{
                    backgroundColor: index % 2 === 0 ? "whitesmoke" : "white",
                  }}
                >
                  <div className="col-2">{ch.name}</div>
                  <div className="col-2">{ch.chequeNumber}</div>
                  <div className="col-2">{ch.bankName}</div>
                  <div className="col-2">{ch.branch}</div>
                  <div className="col-2">{ch.amount}</div>
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
export default AllCheque;
