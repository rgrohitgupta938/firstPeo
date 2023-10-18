import React, { Component } from "react";
import http from "./httpService";
import LeftPanel from "./leftPanel";
import queryString from "query-string";
class Customers extends Component {
  state = {
    customers: [],
    cities: ["Jaipur", "Gurgaon", "Noida", "Delhi"],
    payments: ["Credit Card", "Wallet", "Debit Card"],
    genders: ["Male", "Female"],
  };
  async fetchData() {
    const queryParams = queryString.parse(this.props.location.search);
    
    let searchString = this.makeSearchString(queryParams);
    let response = await http.get(`/customers?${searchString}`);
    let { data } = response;
    console.log(data);
    this.setState({ customers: data });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  async componentDidMount() {
    this.fetchData();
  }
  handleEdit = (id) => {
    console.log(id);
    this.props.history.push(`/newCust/${id}`);
  };
  handleDelete = async (id) => {
    let response = await http.deleteApi(`/customers/${id}`);
    this.props.history.push(`/customers`);
  };
  handleOptionChange = (opt) => {
    this.callURL("/customers", opt);
  };
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  makeSearchString = (opt) => {
    let { payment, sortBy, city, gender } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "payment", payment);
    searchStr = this.addToQueryString(searchStr, "sortBy", sortBy);
    searchStr = this.addToQueryString(searchStr, "city", city);
    searchStr = this.addToQueryString(searchStr, "gender", gender);
    return searchStr;
  };
  sort =(st) =>{
    switch(st){
      case 0 : this.props.history.push(`/customers?sortBy=city`); break;
      case 1 : this.props.history.push(`/customers?sortBy=age`); break;
      case 2 : this.props.history.push(`/customers?sortBy=payment`); break;
    }
  }
  render() {
    const { customers, cities, genders, payments } = this.state;
    const queryParams = queryString.parse(this.props.location.search);
    console.log(customers);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              options={queryParams}
              cities={cities}
              genders={genders}
              payments={payments}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <div className="row text-white bg-dark">
              <div className="col-1 border">Id</div>
              <div className="col-2 border">Name</div>
              <div className="col-2 border" onClick={() => this.sort(0)}>City</div>
              <div className="col-1 border" onClick={() => this.sort(1)}>Age</div>
              <div className="col-2 border">Gender</div>
              <div className="col-2 border" onClick={() => this.sort(2)}>Payment</div>
              <div className="col-2 border"></div>
            </div>
            {customers.map((st, index) => (
              <div className="row">
                <div className="col-1 border">{st.id}</div>
                <div className="col-2 border">{st.name}</div>
                <div className="col-2 border">{st.city}</div>
                <div className="col-1 border">{st.age}</div>
                <div className="col-2 border">{st.gender}</div>
                <div className="col-2 border">{st.payment}</div>
                <div className="col-2 border">
                  <button
                    className="btn btn-warning btn-sm m-1"
                    onClick={() => this.handleEdit(st.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm m-1"
                    onClick={() => this.handleDelete(st.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Customers;
