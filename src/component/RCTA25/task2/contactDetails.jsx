import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
class ContactDeatils extends Component {
  state = {
    empContact: {
      mobile: "",
      address: "",
      city: "",
      country: "",
      pincode: "",
      empuserid: auth.getUser().empuserid,
    },
    errors: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.empContact[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { empContact } = this.state;
    let user = auth.getUser().empuserid;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(empContact);
      this.postEmpContact(`/empapp/empcontact/${user}`, empContact);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    const { mobile, country, pincode } = this.state.empContact;
    let errors = {};
    errors.mobile = this.validateMobile(mobile);
    errors.country = this.validateCountry(country);
    errors.pincode = this.validatePincode(pincode);
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };

  validateMobile = (mobile) => {
    if (!mobile) {
      return "Mobile must be entered";
    }
    // Removing whitespaces and other characters from the mobile number
    const numericMobile = mobile.replace(/[\s+\-]/g, "");
    // Check if the numericMobile contains only valid numeric characters
    if (!this.isNumeric(numericMobile)) {
      return "Mobile must consist of digits(0-9), +, -, and space.";
    }
    if (numericMobile.length < 10) {
      return "Mobile must have at least 10 digits";
    }
    return "";
  };
  isNumeric = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (isNaN(str[i])) {
        return false;
      }
    }
    return true;
  };
  validateCountry = (country) => {
    return !country ? "Country must be entered" : "";
  };

  validatePincode = (pincode) => {
    return !pincode ? "Pincode must be entered" : "";
  };

  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  async postEmpContact(url, obj) {
    try {
      let response = await http.post(url, obj);
      let errors = {};
      errors.succ = "Details have been Successfully Added";
      this.setState({ errors: errors });
    } catch (ex) {
      if (ex.response && ex.status === 200) {
        let errors = {};
        errors.fail = "Database error";
        this.setState({ errors: errors });
      }
    }
  }
  async fetchEmpContact() {
    const user = auth.getUser().empuserid;
    console.log(user);
    let response = await http.get(`/empapp/empcontact/${user}`);
    let { data } = response;
    this.setState({ empContact: data });
  }
  componentDidMount() {
    this.fetchEmpContact();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchEmpContact();
  }
  render() {
    const user = auth.getUser().empuserid;
    console.log(user);
    const { mobile, address, city, country, pincode } = this.state.empContact;
    const { errors } = this.state;
    return (
      <div className="container">
        <h3 className="text-center">Welcome to Employee Management Portal</h3>
        <h4 className="text-center">Your Contact Details</h4>
        <div className="text-center" style={{ fontSize: "18px" }}>
          {" "}
          {errors && !errors.succ ? (
            !mobile && !address && !city && !country && !pincode ? (
              <span className="text-primary fw-bold">
                No Conatct Details Found. Please Enter Them
              </span>
            ) : (
              <span className="text-success fw-bold">
                Displaying Contact Details
              </span>
            )
          ) : (
            <span className="text-success fw-bold">{errors.succ}</span>
          )}
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Mobile:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              onChange={this.handleChange}
              placeholder="Enter the Employee's Mobile No."
              value={mobile}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.mobile && (
              <span className="text-danger">{errors.mobile}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Address:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              onChange={this.handleChange}
              placeholder="Enter the Employee's Address"
              value={address}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>City:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={this.handleChange}
              placeholder="Enter the City"
              value={city}
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>Country:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              onChange={this.handleChange}
              placeholder="Enter the Country"
              value={country}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.country && (
              <span className="text-danger">{errors.country}</span>
            )}
          </div>
        </div>
        <div className="form-group row m-2">
          <div className="col-3"></div>
          <div className="col-1">
            <label>PinCode:</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="pincode"
              name="pincode"
              onChange={this.handleChange}
              placeholder="Enter the Pincode"
              value={pincode}
            />
          </div>
          <div className="text-center">
            {" "}
            {errors && errors.pincode && (
              <span className="text-danger">{errors.pincode}</span>
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
    );
  }
}
export default ContactDeatils;
