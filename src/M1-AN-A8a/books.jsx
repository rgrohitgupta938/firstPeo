import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class Books extends Component {
  state = {
    books: [],
    totalbooks: {},
    filterArr: ["ebooks", "paid-ebooks", "free-ebooks", "full", "partial"],
    orderArr: ["newest", "relevance"],
    printArr: ["all", "books", "magazines"],
    langRestictArr: ["hi", "en", "es", "fr", "zh"],
    addedBooks: this.props.addedBooks,
    leftPanelCh: this.props.leftPanelCh,
  };

  makeSearchString = (opt) => {
    let {
      q = "",
      maxResults = +this.props.leftPanelCh.entries,
      startIndex = "0",
      orderBy = "",
      printType = "",
      filter = "",
      langRestict = "",
    } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "q", q);
    searchStr = this.addToQueryString(searchStr, "maxResults", maxResults);
    searchStr = this.addToQueryString(searchStr, "startIndex", startIndex);
    searchStr = this.addToQueryString(searchStr, "orderBy", orderBy);
    searchStr = this.addToQueryString(searchStr, "printType", printType);
    searchStr = this.addToQueryString(searchStr, "filter", filter);
    searchStr = this.addToQueryString(searchStr, "langRestict", langRestict);
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
     console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`?${searchStr}`);
    let { data } = response;
    console.log(data);
    this.setState({ books: data.items, totalbooks: data.totalItems });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    let {
      q = "",
      maxResults = +this.props.leftPanelCh.entries,
      startIndex = "0",
      printType = "",
      filter = "",
      langRestict = "",
      orderBy,
    } = queryParams;
    let newPage = +startIndex + +maxResults * incr;
    queryParams.startIndex = newPage;
    queryParams.page = queryParams.page ? +queryParams.page + 1 : "";
    this.callURL("/books", {
      ...queryParams,
      orderBy, 
    });
  };
  
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  handleOptionChange = (opt) => {
    const {
      startIndex = 0,
      maxResults = +this.props.leftPanelCh.entries,
      orderBy,
      ...otherOptions
    } = opt;
    const updatedOptions = {
      ...otherOptions,
      startIndex : "0",
      maxResults :+this.props.leftPanelCh.entries,
      orderBy,
    };
    this.callURL("/books", updatedOptions);
  };
  handleAddBook = (bk) => {
    let s1 = { ...this.state };
    let { id } = bk;
    let st = s1.addedBooks.findIndex((st) => st.id === id);
    let pr = st >= 0 ? s1.addedBooks.splice(st, 1) : s1.addedBooks.push(bk);
    this.setState(s1);
  };
  render() {
    const {
      books,
      totalbooks,
      orderArr,
      printArr,
      filterArr,
      langRestictArr,
      addedBooks,
    } = this.state;
    let { entries } = this.props.leftPanelCh;
    let queryParams = queryString.parse(this.props.location.search);
    let { q = "", maxResults = +entries, startIndex = "0" } = queryParams;
    let currentPage = 1;
    let maxpage = totalbooks / +maxResults;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              options={queryParams}
              onOptionChange={this.handleOptionChange}
              orderArr={orderArr}
              filterArr={filterArr}
              printArr={printArr}
              langRestictArr={langRestictArr}
              leftPanelCh={this.props.leftPanelCh}
            />
          </div>
          <div className="col-9">
            <h6>
              {books && books.length > 0
                ? `Entires${+startIndex + 1}-${
                    startIndex >= 0 ? +maxResults + +startIndex : maxResults
                  }`
                : ""}
            </h6>
            <div className="row">
              {books && books.length > 0 ? (
                books.map((bk) => {
                  let { volumeInfo, id } = bk;
                  let { title, categories, authors, imageLinks } = volumeInfo;
                  return (
                    <div className="col-3 text-center bg-success border border-light">
                      {imageLinks?.smallThumbnail ? (
                        <img
                          src={imageLinks.smallThumbnail}
                          alt={title}
                          className="m-2"
                        />
                      ) : (
                        <img
                          src="/path/to/placeholder-image.jpg"
                          alt="No image available"
                          className="m-2"
                        />
                      )}
                      <br />
                      <strong>{title}</strong>
                      <br />
                      {authors}
                      <br />
                      {categories ? categories : "NA"}
                      <br />
                      <button
                        className="btn btn-secondary btn-sm m-2"
                        onClick={() => this.handleAddBook(bk)}
                      >
                        {addedBooks.findIndex((st) => st.id === id) >= 0
                          ? "Remove book from Mybooks"
                          : "Add to MyBooks"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div
                  className="col-12 text-center text-warning fw-bold"
                  style={{ fontSize: "20px" }}
                >
                  No data Found
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-2">
                {(startIndex > 0 ? +maxResults + +startIndex : startIndex) /
                  +startIndex >
                1 ? (
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
                {currentPage < maxpage ? (
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
export default Books;
