import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import { Link } from "react-router-dom";
import LeftPanelCh from "./leftPanelCh";
class AllBooks extends Component {
  state = {
    books: [],
    pageInfo: [],
    langArr: ["French", "English", "Latin", "Other"],
    bestsellerArr:["Yes","No"],
    refineOptions:{},
  };
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { genre ="" } = this.props.match.params;
    let { page = "1" } = queryParams;
    let newPage = +page + incr;
    queryParams.page = newPage;
    console.log(genre);
    this.callURL(`/books/${genre}`, queryParams);
  };

  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { newarrival, page = 1,bestseller,language } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "page", page);
    searchStr = this.addToQueryString(searchStr, "newarrival", newarrival);
    searchStr = this.addToQueryString(searchStr, "bestseller", bestseller);
    searchStr = this.addToQueryString(searchStr, "language", language);
    return searchStr;
  };

  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    let { genre = "" } = this.props.match.params;
    let response = await http.get(`/booksapp/books/${genre}?${searchStr}`);
    let { data } = response;
    this.setState({
      books: data.books,
      pageInfo: data.pageInfo,
      refineOptions: data.refineOptions,
    });
    console.log(this.state);
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleOptionChange = (opt) => {
    opt.page = "1";
    let {genre =""} =  this.props.match.params;
    this.callURL(`/books/${genre}`, opt);
  };
  render() {
    const { books, pageInfo,langArr,bestsellerArr,refineOptions } = this.state;
    let { numOfItems, totalItemCount, numberOfPages, pageNumber } = pageInfo;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-3">
            <LeftPanelCh
              options={queryParams}
              languageArr={langArr}
              bestsellerArr={bestsellerArr}
              refineOptions = {refineOptions}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <strong>
              {" "}
              {pageNumber * 10 - 9} to{" "}
              {pageNumber * 10 > totalItemCount
                ? totalItemCount
                : pageNumber * 10}{" "}
              of {totalItemCount}
            </strong>
            <div
              className="row border text-dark"
              style={{ backgroundColor: "blue" }}
            >
              <div className="col-3 ">Title</div>
              <div className="col-3 ">Author</div>
              <div className="col-2 ">Language</div>
              <div className="col-2 ">Genre</div>
              <div className="col-1 ">Price</div>
              <div className="col-1 ">Bestseller</div>
            </div>
            {books.map((bk) => {
              let { name, author, language, genre, price, bestseller, bookid } =
                bk;
              return (
                <React.Fragment>
                  <div className="row">
                    <div className="col-3 border">
                      <Link to={`/book/${+bookid}`}>{name}</Link>
                    </div>
                    <div className="col-3 border">{author}</div>
                    <div className="col-2 border">{language}</div>
                    <div className="col-2 border">{genre}</div>
                    <div className="col-1 border">{price}</div>
                    <div className="col-1 border">{bestseller}</div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="row">
              <div className="col-2">
                {pageNumber > 1 ? (
                  <button
                    className="btn btn-primary btn-sm m-2"
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
                    className="btn btn-primary btn-sm m-2"
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
export default AllBooks;
