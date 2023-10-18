import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanelComp from "./leftPanelComp";
class SearchComp extends Component {
  state = {
    searchRes: [],
    pages: "",
    pageSize: "",
    startIndex: "",
    total: "",
    currentPage: "",
    sectionArr: ["business", "technology", "lifeStyle", "politics"],
    orderArr: ["oldest", "newest", "relevance"],
    text: "",
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1[input.name] = input.value;
    this.setState(s1);
  };
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    this.callURL(`/search`, queryParams);
  };
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page, q, apikey, "order-by": orderby, section } = opt;
    let searchStr = "";
    console.log(1, q);
    searchStr = this.addToQueryString(searchStr, "q", q);
    searchStr =
      page === 1
        ? "q=sports&api-key=test"
        : this.addToQueryString(searchStr, "page", page);
    searchStr = this.addToQueryString(searchStr, "order-by", orderby);
    searchStr = this.addToQueryString(searchStr, "section", section);
    console.log(searchStr);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}&${"api"}-${"key"}=${"test"}`
      : str;

  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    console.log(searchStr);
    let response =
      searchStr !== "" ? await http.get(`/search?${searchStr}`) : {};
    let { data } = response;
    if (data && data.response) {
      this.setState({
        searchRes: data.response.results || [],
        total: data.response.total || "",
        pageSize: data.response.pageSize || "",
        pages: data.response.pages || "",
        startIndex: data.response.startIndex || "",
        currentPage: data.response.currentPage || "",
        text: queryParams.q,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleOptionChange = (opt) => {
    const { orderby, ...otherOptions } = opt;
    const updatedOptions = {
      ...otherOptions,
      "order-by": orderby,
    };
    this.callURL("/search", updatedOptions);
  };
  handleSearch = (str) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { q = str } = queryParams;
    queryParams.q = str;
    console.log(queryParams);
    this.callURL("/search", queryParams);
  };

  render() {
    const {
      searchRes,
      pages,
      pageSize,
      startIndex,
      total,
      currentPage,
      orderArr,
      sectionArr,
      text,
    } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(searchRes);
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-2">
            <LeftPanelComp
              options={queryParams}
              onOptionChange={this.handleOptionChange}
              orderArr={orderArr}
              sectionArr={sectionArr}
            />
          </div>
          <div className="col-9 ms-5 mt-3">
            <div className="form-group row m-2">
              <div className="col-9">
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  name="text"
                  onChange={this.handleChange}
                  placeholder="Enter Search Text"
                  value={text}
                />
              </div>
              <div className="col-3">
                <button
                  className="btn btn-light"
                  onClick={() => this.handleSearch(text)}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row">
              {currentPage &&
                `${currentPage * pageSize - 9}-${
                  total > currentPage * pageSize
                    ? currentPage * pageSize
                    : total
                } of ${total}`}
            </div>

            <div className="row">
              {searchRes &&
                searchRes.map((res) => {
                  let { webTitle, sectionName, webPublicationDate, webUrl } =
                    res;
                  return (
                    <React.Fragment>
                      <div
                        className="col-4 m-2 text-center"
                        style={{
                          width: "240px",
                          height: "auto",
                          backgroundColor: "#c1f0f0",
                        }}
                      >
                        {webTitle}
                        <br />
                        <strong>
                          Source : {sectionName} {webPublicationDate}
                        </strong>
                        <br />
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Preview
                        </a>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
            <div className="row">
              <div className="col-2">
                {currentPage > 1 ? (
                  <button
                    className="btn btn-danger btn-sm m-2"
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
                {currentPage < pages ? (
                  <button
                    className="btn btn-danger btn-sm m-2"
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
export default SearchComp;
