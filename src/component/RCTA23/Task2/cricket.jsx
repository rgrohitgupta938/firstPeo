import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import { Link } from "react-router-dom";
import LeftCompCH from "./leftCompCH";
class Cricket extends Component {
  state = {
    stars: [],
    pageInfo: [],
    countries: [
      "India",
      "Australia",
      "Portugal",
      "Argentina",
      "Brazil",
      "France",
    ],
  };
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1", countries } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.callURL("/stars/Cricket", queryParams);
  };

  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page, countries } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "page", page);
    searchStr = this.addToQueryString(searchStr, "countries", countries);
    return searchStr;
  };

  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/sporticons/stars/Cricket?${searchStr}`);
    console.log(response);
    let { data } = response;
    this.setState({
      stars: data.stars,
      pageInfo: data.pageInfo,
    });
    console.log(this.state);
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleOptionChange = (opt) => {
    opt.page = "1";
    this.callURL("/stars/Cricket", opt);
  };
  render() {
    const { stars, pageInfo,countries } = this.state;
    let { pageNumber, numberOfPages, numOfItems, totalItemCount } = pageInfo;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftCompCH
              options={queryParams}
              countriesArr={countries}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <div className="row text-dark bg-primary">
              <div className="col-4 border">Name</div>
              <div className="col-4 border">Country</div>
              <div className="col-4 border">Sport</div>
            </div>
            {stars.map((st) => (
              <div className="row">
                <div className="col-4 border">
                  <Link to={`/details/${st.id}`}>{st.name}</Link>
                </div>
                <div className="col-4 border">{st.country}</div>
                <div className="col-4 border">{st.sport}</div>
              </div>
            ))}
            <div className="row">
              <div className="col-2">
                {pageNumber > 1 ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handlePage(-1)}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {pageNumber < numberOfPages ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handlePage(1)}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cricket;
