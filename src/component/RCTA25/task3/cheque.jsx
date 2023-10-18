import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class Cheque extends Component {
  state = {
    cheque: {
      name: auth.getUser().name,
      chequeNumber: "",
      bankName: "",
      branch: "",
      amount: "",
    },
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    const updatedPayee = { ...this.state.cheque, [name]: value };
    this.setState({ cheque: updatedPayee });
  };

  handleValidate = () => {
    const { cheque } = this.state;
    let errors = {};
    if (!cheque.bankName) {
      errors.bankName = "Select Bank Name";
    }
    if (!cheque.branch) {
      errors.branch = "Branch number is Required";
    }
    if (!cheque.chequeNumber || cheque.chequeNumber.length !== 11) {
      errors.chequeNumber =
        cheque.chequeNumber.length < 11
          ? "Enter Your 11 digit Cheque Number"
          : "";
    }
    if (!cheque.amount) {
      errors.amount = "Amount is Required";
    }
    this.setState({ errors });
    return errors;
  };
  isValid = (errors) => {
    if (!errors) {
      return false;
    }
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  async addCust(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      this.setState({ errors: errors });
    } catch (ex) {
      let st =
        ex.response && ex.response.status !== 200 ? alert("Error occured") : "";
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { cheque } = this.state;
    const errors = this.handleValidate();
    if (this.isValid(errors)) {
      console.log(cheque);
      this.addCust("/postCheque", cheque);
      alert("CHeque Successfully added");
      this.props.history.push("/customer");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    const { name, chequeNumber, bankName, branch, amount } = this.state.cheque;
    const { errors, cheque } = this.state;
    const bankNames = ["SBI", "ICCI", "HDFC", "AXIS", "DBS", "GBI"];
    return (
      <div className="container">
        <h3>Deposit Cheque</h3>
        <div className="form-group m-2">
          <label className="form-check-label fw-bold m-2">
            Cheque Number
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            id="chequeNumber"
            name="chequeNumber"
            onChange={this.handleChange}
            placeholder="Enter Cheque Number"
            value={chequeNumber}
          />
          {errors && errors.chequeNumber && (
            <span className="text-danger">{errors.chequeNumber}</span>
          )}
        </div>
        <div className="form-group row m-2">
          <label className="form-check-label fw-bold">
            Bank Name
            <span className="required-asterisk text-danger">*</span>
          </label>
          <select
            className="form-control"
            name="bankName"
            value={bankName}
            onChange={this.handleChange}
          >
            <option value="">Select the Bank</option>
            {bankNames.map((month, index) => (
              <option key={index + 1} value={month}>
                {month}
              </option>
            ))}
          </select>
          {errors && errors.bankName && (
            <span className="text-danger">{errors.bankName}</span>
          )}
        </div>
        <div className="form-group m-2">
          <label className="form-check-label fw-bold m-2">
            Branch
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="branch"
            name="branch"
            onChange={this.handleChange}
            placeholder="Enter Branch name"
            value={branch}
          />
          {errors && errors.branch && (
            <span className="text-danger">{errors.branch}</span>
          )}
        </div>
        <div className="form-group m-2">
          <label className="form-check-label fw-bold m-2">
            Amount
            <span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            onChange={this.handleChange}
            placeholder="Enter Amount"
            value={amount}
          />
          {errors && errors.amount && (
            <span className="text-danger">{errors.amount}</span>
          )}
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Add Cheque
        </button>
      </div>
    );
  }
}
export default Cheque;
