import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class AddPayee extends Component {
  state = {
    payee: {
      name: "",
      payeeName: "",
      IFSC: "",
      accNumber: "",
      bankName: "",
      st: "",
    },
    errors: {},
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    let updatedPayee = {
      ...this.state.payee,
      [name]: value,
    };
    this.setState({ payee: updatedPayee });
  };

  handleValidate = () => {
    const { payee } = this.state;
    let errors = {};
    if (!payee.payeeName) {
      errors.payeeName = "Payee Name is required";
    }
    if (!payee.accNumber) {
      errors.accNumber = "Account Number is required";
    }
    this.setState({ errors });
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  async addCust(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      let errors = {};
      this.setState({ errors: errors });
    } catch (ex) {
      let st =
        ex.response && ex.response.status !== 200 ? alert("Error occured") : "";
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { name, payeeName, IFSC, accNumber, bankName, st } = this.state.payee;
    let newPayee = {
      name: auth.getUser().name,
      payeeName: payeeName,
      IFSC: IFSC,
      accNumber: accNumber,
      bankName: st === "Same Bank" ? st : bankName,
    };
    const errors = this.handleValidate();
    if (this.isValid(errors)) {
      console.log(newPayee);
      this.addCust("/addPayee", newPayee);
      alert("Payee Successfully added");
      this.props.history.push("/customer");
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    const { name, payeeName, IFSC, accNumber, bankName, st } = this.state.payee;
    const { errors } = this.state;
    return (
      <div className="container">
        <h3>Add Payee</h3>
        <div className="form-group m-2">
          <label className="m-2">
            Payee Name<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="payeeName"
            name="payeeName"
            onChange={this.handleChange}
            placeholder="Enter Payee Name"
            value={payeeName}
            onBlur={this.handleValidate}
          />
          {errors && errors.payeeName && (
            <span className="text-danger">{errors.payeeName}</span>
          )}
        </div>
        <div className="form-group m-2">
          <label className="m-2">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="accNumber"
            name="accNumber"
            onChange={this.handleChange}
            placeholder="Enter Account Number"
            value={accNumber}
            onBlur={this.handleValidate}
          />
          {errors && errors.accNumber && (
            <span className="text-danger">{errors.accNumber}</span>
          )}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="st"
            checked={st === "Same Bank"}
            value="Same Bank"
            onChange={this.handleChange}
          />
          <label className="form-check-label">Same Bank</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="st"
            checked={st === "Other Bank"}
            value="Other Bank"
            onChange={this.handleChange}
          />
          <label className="form-check-label">Other Bank</label>
        </div>
        {st === "Other Bank" && (
          <React.Fragment>
            <div className="form-group m-2">
              <label className="m-2">Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                name="bankName"
                onChange={this.handleChange}
                placeholder="Enter Bank Name"
                value={bankName}
                onBlur={this.handleValidate}
              />
            </div>
            <div className="form-group m-2">
              <label className="m-2">IFSC Code </label>
              <input
                type="text"
                className="form-control"
                id="IFSC"
                name="IFSC"
                onChange={this.handleChange}
                placeholder="Enter IFSC Code"
                value={IFSC}
                onBlur={this.handleValidate}
              />
            </div>
          </React.Fragment>
        )}
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Add Payee
        </button>
      </div>
    );
  }
}
export default AddPayee;
