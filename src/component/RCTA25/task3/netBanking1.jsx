import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class NetBanking1 extends Component {
  state = {
    net: {
      name: "",
      payeeName: "",
      comment: "",
      amount: "",
      bankName: "",
    },
    payeeNames: [],
    errors: {},
  };

  async componentDidMount() {
    await this.fetchPayee();
  }
  async fetchPayee() {
    try {
      const response = await http.get(`/getPayees/${auth.getUser().name}`);
      const { data } = response;
      this.setState({ payeeNames: data });
    } catch (ex) {
      console.error("Error fetching payee names:", ex);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.net.payeeName !== this.state.net.payeeName &&
      this.state.net.payeeName !== ""
    ) {
      this.updateBankName();
    }
  }
  updateBankName = () => {
    const { payeeNames, net } = this.state;
    const selectedPayee = payeeNames.find(
      (st) => st.payeeName === net.payeeName
    );
    if (selectedPayee) {
      const updatedNet = { ...net, bankName: selectedPayee.bankName,name:auth.getUser().name };
      console.log(updatedNet);
      this.setState({ net: updatedNet });
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      net: {
        ...prevState.net,
        [name]: value,
      },
    }));
  };

  handleValidate = () => {
    const { net } = this.state;
    let errors = {};
    if (!net.payeeName) {
      errors.payeeName = "Payee Name is required";
    }
    if (!net.amount) {
      errors.amount = "Amount is required";
    }
    this.setState({ errors });
    return errors;
  };

  isValid = (errors) => {
    return Object.values(errors).every((error) => !error);
  };

  async addTransaction(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = { succ: "Transaction Successfully Added" };
      console.log(response);
      this.setState({ errors });
      alert("Transaction Successfully added");
      this.props.history.push("/customer");
    } catch (ex) {
      console.error("Error adding transaction:", ex);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { net } = this.state;
    const errors = this.handleValidate();
    if (this.isValid(errors)) {
      console.log(net);
      this.addTransaction("/postNet", net);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    const { name, payeeName, comment, bankName, amount } = this.state.net;
    const { errors, payeeNames } = this.state;
    let payeeList = payeeNames
      ? payeeNames.reduce(
          (acc, curr) =>
            acc.includes(curr.payeeName) ? acc : [...acc, curr.payeeName],
          []
        )
      : [];

    console.log(payeeList);
    return (
      <div className="container">
        <h3>Net Banking Details</h3>
        <div className="form-group row m-2">
          <label className="form-check-label fw-bold">
            State
            <span className="required-asterisk text-danger">*</span>
          </label>
          <select
            className="form-control"
            name="payeeName"
            value={payeeName}
            onChange={this.handleChange}
          >
            <option value="">Select Payee Name</option>
            {payeeList.map((month, index) => (
              <option key={index + 1} value={month}>
                {month}
              </option>
            ))}
          </select>
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
        <div className="form-group m-2">
          <label className="form-check-label fw-bold m-2">Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            name="comment"
            onChange={this.handleChange}
            placeholder="Enter Comment"
            value={comment}
          />
          {errors && errors.comment && (
            <span className="text-danger">{errors.comment}</span>
          )}
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Add Transaction
        </button>
      </div>
    );
  }
}
export default NetBanking1;
