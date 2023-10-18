import React, { Component } from "react";
import http from "./httpService";
class AddShop extends Component {
  state = {
    shop: {
      name: "",
      rent: "",
    },
    edit: false,
    editID: "",
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    if (+id) {
      let response = await http.get(`/svr/shops/${+id}`);
      let { data } = response;
      console.log("if", data);
      let emp = {
        name: data[0].name,
        rent: data[0].rent,
      };
      console.log(emp);
      this.setState({ shop: emp, edit: true, editID: id }, () => {
        console.log(this.state.shop || 0);
      });
    } else {
      let shop = {
        name: "",
        rent: "",
      };
      this.setState({ shop: shop, edit: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      shop: {
        ...prevState.shop,
        [name]: value,
      },
    }));
  };
  async postData(url, obj) {
    console.log(obj);
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/shops/view");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/shops/view");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { shop, edit, editID } = this.state;
    edit
      ? this.putData(`/svr/shops/${editID}`, shop)
      : this.postData("/svr/shops", shop);
  };
  render() {
    let { name, rent } = this.state.shop;
    return (
      <div className="container">
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Shop Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Rent</label>
          <input
            type="text"
            className="form-control"
            id="rent"
            name="rent"
            onChange={this.handleChange}
            placeholder="Enter Rent"
            value={rent}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddShop;
