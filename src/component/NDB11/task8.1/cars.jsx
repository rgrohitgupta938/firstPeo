import React, { Component } from "react";
import http from "./httpService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class Cars extends Component {
  state = {
    cars: [],
    minprice: "",
    maxprice: "",
    sorts: ["kms", "price", "year"],
    types: ["Hatchback", "Sedan"],
    fuels: ["Diesel", "Petrol"],
  };
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchData();
    }
  }
  fetchData = async () => {
    const { minprice, maxprice } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    queryParams.minprice = queryParams.minprice || minprice;
    queryParams.maxprice = queryParams.maxprice || maxprice;
    let searchString = this.makeSearchString(queryParams);
    let response = await http.get(`/cars?${searchString}`);
    let { data } = response;
    this.setState({ cars: data });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.callURL("/cars", {
        minprice: this.state.minprice,
        maxprice: this.state.maxprice,
      });
    });
  };
  makeSearchString = (opt) => {
    let { maxprice, minprice, type, sort, fuel } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "maxprice", maxprice);
    searchStr = this.addToQueryString(searchStr, "minprice", minprice);
    searchStr = this.addToQueryString(searchStr, "type", type);
    searchStr = this.addToQueryString(searchStr, "sort", sort);
    searchStr = this.addToQueryString(searchStr, "fuel", fuel);
    return searchStr;
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
  handleOptionChange = (opt) => {
    this.callURL("/cars", opt);
  };
  handleEdit = (id) => {
    console.log(id);
    this.props.history.push(`/newCar/${id}`);
  };
  handleDelete = async (id) => {
    let response = await http.deleteApi(`/cars/${id}`);
    if (response.status === 200) {
      const { cars } = this.state;
      const updatedCars = cars.filter((car) => car.id !== id);
      this.setState({ cars: updatedCars });
    }
  };
  render() {
    const { cars, minprice, maxprice, types, sorts, fuels } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(cars);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              fuels={fuels}
              types={types}
              sorts={sorts}
              onOptionChange={this.handleOptionChange}
              options={queryParams}
            />
          </div>
          <div className="col-9">
            <h3 className="text-center">All Cars</h3>
            <div className="form-group row pb-2">
              <div className="col-2 ms-5">
                <label>Price Range:</label>
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  id="minprice"
                  name="minprice"
                  onChange={this.handleChange}
                  placeholder="Enter MinPrice"
                  value={minprice}
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  id="maxprice"
                  name="maxprice"
                  onChange={this.handleChange}
                  placeholder="Enter MaxPrice"
                  value={maxprice}
                />
              </div>
            </div>
            <div className="row">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="col-3 border border-light bg-warning text-center"
                >
                  <strong>{car.model}</strong>
                  <br />
                  Price: {car.price}
                  <br />
                  Color: {car.color}
                  <br />
                  Mileage: {car.kms}
                  <br />
                  Manufactured in {car.year}
                  <br />
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: "#0d0d0d" }}
                    className="me-4"
                    onClick={() => this.handleEdit(car.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#000000" }}
                    className="ms-4"
                    onClick={() => this.handleDelete(car.id)}
                  />
                </div>
              ))}
    </div> </div></div></div>
    );
  }
}
export default Cars;
