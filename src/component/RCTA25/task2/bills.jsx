import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
class Bills extends Component {
  state = {
    empBills: [],
    pageData: {},
    errors: {},
    empbill: { expensetype: "", amount: "", description: "" },
    expenseArr: ["Travel", "Hotel", "Software", "Communication", "Others"],
    newBill: 0,
  };
  async fetchBills() {
    try {
      let queryParams = queryString.parse(this.props.location.search);
      let searchStr = this.makeSearchString(queryParams);
      let { page } = queryParams;
      const user = auth.getUser().empuserid;
      let response = await http.get(`/empapp/empbills/${user}?${searchStr}`);
      let { data } = response;
      this.setState({ empBills: data.data, pageData: data.pageInfo });
    } catch (ex) {
      if (ex.response && ex.response.state === 500) {
        let empBills = [];
        this.setState({ empBills: empBills });
      }
    }
  }
  componentDidMount() {
    this.fetchBills();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors.succ !== this.state.errors.succ) this.fetchBills();
  }
  async postEmpBill(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Employeee Bill Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.empbill[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { empbill } = this.state;
    const user = auth.getUser().empuserid;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(empbill);
      this.postEmpBill(`/empapp/empbills/${user}`, empbill);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let { description, amount, expensetype } = this.state.empbill;
    let errors = {};
    errors.description = this.validateDesc(description);
    errors.amount = this.validateAmount(amount);
    errors.expensetype = this.validateExpTy(expensetype);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateDesc = (description) => {
    return !description ? "Description must be entered" : "";
  };
  validateExpTy = (expensetype) => {
    return !expensetype ? "Expense must be selected" : "";
  };
  validateAmount = (amount) => {
    if (!amount) {
      return "Amount must be entered";
    }
    let decimalPointCount = 0;
    let digitAfterDecimal = false;
    for (let i = 0; i < amount.length; i++) {
      const char = amount[i];
      if (char === ".") {
        decimalPointCount++;
        // Check if there is a digit after the decimal point
        if (i === amount.length - 2 || !this.isNumeric(amount[i + 1])) {
          return "Not a valid amount";
        } else {
          digitAfterDecimal = true;
        }
      } else if (!this.isNumeric(char)) {
        return "Not a valid amount";
      }
    }
    // Check if there is more than one decimal point
    if (decimalPointCount > 1) {
      return "Not a valid amount";
    }
    // Check if the amount is just a decimal point or ends with a decimal point without a digit after it
    if (amount === "." || amount.endsWith(".")) {
      return "Not a valid amount";
    }
    return "";
  };
  isNumeric = (str) => {
    return !isNaN(str);
  };
  handlePage = (n) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + n;
    queryParams.page = newPage;
    this.callURL(`/bills`, queryParams);
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

  handleNewBill = () => {
    this.setState({
      newBill: 1,
      empbill: { expensetype: "", amount: "", description: "" },
    });
  };
  handleAddBillDetails = (n, str) => {
    str === "Hotel"
      ? this.props.history.push(`/emp/hotelbill/${n}`)
      : this.props.history.push(`/emp/travelbill/${n}`);
  };
  render() {
    const { empBills, errors, empbill, expenseArr, newBill, pageData } =
      this.state;
    const { expensetype, amount, description } = empbill;
    let { pageNumber, numberOfPages, numOfItems, totalItemCount } = pageData;
    console.log(pageNumber);
    return (
      <div className="container">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <h4 className="text-start">Details of Bills Submitted</h4>
        <div className="row">
          <div className="col-2 bg-primary border text-center">Id</div>
          <div className="col-4 bg-primary border text-center">Description</div>
          <div className="col-3 bg-primary border text-center">
            Expense Head
          </div>
          <div className="col-2 bg-primary border text-center">Amount</div>
          <div className="col-1 bg-primary border text-center"></div>
        </div>
        {empBills.map((em) => (
          <div className="row" key={em.billid}>
            <div className="col-2 border text-center">{em.billid}</div>
            <div className="col-4 border text-center">{em.description}</div>
            <div className="col-3 border text-center">{em.expensetype}</div>
            <div className="col-2 border text-center">{em.amount}</div>
            <div className="col-1 border text-center">
              {em.expensetype === "Hotel" || em.expensetype === "Travel" ? (
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  style={{ color: "#000000" }}
                  onClick={() =>
                    this.handleAddBillDetails(em.billid, em.expensetype)
                  }
                />
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <a className="text-dark fw-bold" onClick={this.handleNewBill}>
          Submit a New Bill
        </a>
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
        {newBill === 1 && (
          <div>
            <h4 className="text-center">Enter Details of the new Bill</h4>
            <div className="text-center" style={{ fontSize: "18px" }}>
              {errors && errors.succ ? (
                <span className="text-success fw-bold">
                  New Bill added Successfully
                </span>
              ) : (
                <span className="text-danger fw-bold">{errors.fail}</span>
              )}
            </div>
            <div className="form-group row m-2">
              <div className="col-3"></div>
              <div className="col-1">
                <label>Description</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Enter Description"
                  value={description}
                  onBlur={this.handleValidate}
                />
              </div>
              <div className="text-center">
                {errors && errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="col-3"></div>
              <div className="col-1">
                <label>Expense Type</label>
              </div>
              <div className="col-6">
                <select
                  className="form-control"
                  name="expensetype"
                  value={expensetype}
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Select the Expense Type
                  </option>
                  {expenseArr.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                {errors && errors.expensetype && (
                  <span className="text-danger">{errors.expensetype}</span>
                )}
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="col-3"></div>
              <div className="col-1">
                <label>Amount</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  onChange={this.handleChange}
                  placeholder="Enter the Amount"
                  value={amount}
                  onBlur={this.handleValidate}
                />
              </div>
              <div className="text-center">
                {errors && errors.amount && (
                  <span className="text-danger">{errors.amount}</span>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                borderRadius: "0",
              }}
            >
              <button
                className="btn btn-primary fw-bold"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Bills;
