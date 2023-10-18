import queryString from "query-string";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowOptions from "./showOptions";
class Products extends Component {
  handleClick = (bt) => {
    this.props.history.push(`/brand/${bt}`);
  };
  handleOptionChange = (options) => {
    console.log(options);
    this.callURL("/products", options);
  };
  callURL = (url, options) => {
    let searchStr = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchStr,
    });
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  makeSearchString = (options) => {
    let { minPrice, maxPrice, instock } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "minPrice", minPrice);
    searchStr = this.addToQueryString(searchStr, "maxPrice", maxPrice);
    searchStr = this.addToQueryString(searchStr, "instock", instock);
    return searchStr;
  };
  render() {
    const { products, display } = this.props;
    const { value } = this.props.match.params;
    const queryParams = queryString.parse(this.props.location.search);
    console.log("Params", queryParams);
    let products1 = display
      ? products.filter((pr) => pr[display] === value)
      : products;
    const brands = products.reduce((acc, curr) => {
      const brand = curr.brand;
      if (!acc.includes(brand)) {
        return [...acc, brand];
      }
      return acc;
    }, []);
    let { minPrice, maxPrice, instock } = queryParams;
    products1 = minPrice
      ? products1.filter((pr) => pr.price >= +minPrice)
      : products1;
    products1 = maxPrice
      ? products1.filter((pr) => pr.price <= +maxPrice)
      : products1;
    products1 = instock
      ? products.filter((pr) =>
          instock === "yes"
            ? pr.instock
            : instock === "no"
            ? !pr.instock
            : false
        )
      : products1;
    console.log(brands);
    return (
      <div className="container">
        <h2>Welcome to my Products Page</h2>
        <h6>
          <ShowOptions
            options={queryParams}
            onOptionChange={this.handleOptionChange}
          />
        </h6>
        {products1.map((pr) => (
          <div className="row" key={pr.id}>
            <div className="col-2 border">
              <Link to={`/product/${pr.id}`}>{pr.id}</Link>
            </div>
            <div className="col-2 border">
              <Link to={`/brand/${pr.brand}`}>{pr.brand}</Link>
            </div>
            <div className="col-2 border">
              <Link to={`/category/${pr.category}`}>{pr.category}</Link>
            </div>
            <div className="col-2 border">{pr.product}</div>
            <div className="col-2 border">{pr.price}</div>
            <div className="col-2 border">
              {pr.instock === true ? "true" : "false"}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Products;
