import React, { Component } from "react";
import queryString from "query-string";
import http from "../../services/httpService";
import auth from "../../services/authService";
import LeftPanel from "./leftPanel";
class AllFaculty extends Component {
  state = {
    faculties: [],
    pageNo: "",
    totalItems: "",
    totalNum: " ",
    courses: "",
  };
  async faculty() {
    let queryParams = queryString.parse(this.props.location.search);
    let { page } = queryParams;
    page = page || 1;
    console.log(page);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/getFaculties?${searchStr}`);
    let { data } = response;
    this.setState({
      faculties: data.items,
      pageNo: page,
      totalNum: data.totalNum,
      totalItems: data.totalNum,
    });
  }
  async course() {
    let response = await http.get(`/getCourses`);
    console.log(response);
    let { data } = response;
    this.setState({
      courses: data.map((st) => {
        return st.name;
      }),
    });
    console.log(this.state.courses);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.faculty();
  }
  componentDidMount() {
    this.faculty();
    this.course();
  }
  handlePage = (n) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    console.log(page);
    let newPage = +page + n;
    queryParams.page = newPage;
    this.callURL(`/allFaculty`, queryParams);
  };
  callURL = (url, opt) => {
    let searchString = opt ? this.makeSearchString(opt) : "";
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (opt) => {
    let { page = 1, course = "" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "course", course);
    searchStr = this.addToQueryString(searchStr, "page", page);
    console.log(searchStr);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  handleOptionChange = (opt) => {
    let { page } = opt;
    opt.page = 1;
    this.callURL("/allFaculty", opt);
  };
  render() {
    const { faculties, pageNo, totalItems, totalNum, courses } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(faculties, courses);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              onOptionChange={this.handleOptionChange}
              options={queryParams}
              courses={courses}
            />
          </div>
          <div className="col-9">
            {
              <h4
                className={
                  faculties.length === 0 ? "text-danger text-center" : ""
                }
              >
                {faculties.length === 0 ? "No Faculty Found" : "All Faculties"}
              </h4>
            }
            {faculties.length !== 0 &&
              pageNo * 3 -
                2 +
                "-" +
                (totalNum > pageNo * 3 ? pageNo * 3 : totalNum) +
                " of " +
                totalNum}
            {faculties.length !== 0 && (
              <div className="row border">
                <div className="col-3 bg p-2">Id</div>
                <div className="col-4 bg p-2">Name</div>
                <div className="col-5 bg p-2">Courses</div>
              </div>
            )}
            {faculties.length !== 0 &&
              faculties.map((st) => {
                let { courses, name, id } = st;
                return (
                  <div className="row border" key={id}>
                    <div className="col-3 bg-warning p-2">{id}</div>
                    <div className="col-4 bg-warning p-2">{name}</div>
                    <div className="col-5 bg-warning p-2">
                      {courses && courses.map((st) => <div>{st}</div>)}
                    </div>
                  </div>
                );
              })}
            <div className="row">
              <div className="col-2">
                {+pageNo !== 1 && (
                  <button
                    className="btn btn-secondary fw-bold m-2"
                    onClick={() => this.handlePage(-1)}
                  >
                    Prev
                  </button>
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {+totalNum > +pageNo * 3 && (
                  <button
                    className="btn btn-secondary fw-bold m-2"
                    onClick={() => this.handlePage(1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllFaculty;
