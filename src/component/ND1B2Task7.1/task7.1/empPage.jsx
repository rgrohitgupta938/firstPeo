import React, { Component } from "react";
import http from "./httpService";
import LeftPanel from "./leftPanel";
import queryString from "query-string";
class EmpPage extends Component {
  state = {
    employees: [],
    departments: ["Finance", "Marketing", "Operations", "HR", "Technology"],
    designations: ["Manager", "Trainee", "VP"],
    genders: ["Male", "Female"],
  };
  makeSearchString = (opt) => {
    let { department = "", designation = "", gender = "" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "department", department);
    searchStr = this.addToQueryString(searchStr, "designation", designation);
    searchStr = this.addToQueryString(searchStr, "gender", gender);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  handleOptionChange = (opt) => {
    this.callURL("/employees", opt);
  };
  async fetchData() {
    let { dept, desig } = this.props.match.params;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    console.log(dept, desig, searchStr);
    let response =
      !dept && !desig
        ? await http.get(`/svr/employees?${searchStr}`)
        : dept
        ? await http.get(`/svr/employees/dept/${dept}`)
        : desig
        ? await http.get(`/svr/employees/desig/${desig}`)
        : "";
    let { data } = response;
    this.setState({
      employees: data,
    });
  }
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
    if (prevProps.match.params !== this.props.match.params) this.fetchData();
  }
  handleSort = (n) => {
    let emp1 = [...this.state.employees];
    switch (n) {
      case 0: // Name
        emp1.sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;
      case 1: // Salary
        emp1.sort((p1, p2) => p1.salary - p2.salary);
        break;
      case 2: // Department
        emp1.sort((p1, p2) => p1.department.localeCompare(p2.department));
        break;
      case 3: // EmpCode
        emp1.sort((p1, p2) => p1.empcode - p2.empcode);
        break;
      case 4: // Designation
        emp1.sort((p1, p2) => p1.designation.localeCompare(p2.designation));
        break;
      case 5: // Gender
        emp1.sort((p1, p2) => p1.gender.localeCompare(p2.gender));
        break;
      default:
        break;
    }
    this.setState({ employees: emp1 });
  };
  handleEdit = (st) => {
    this.props.history.push(`/employees/${st}`);
  };
  handleDelete = async (st) => {
    let res = await http.deleteApi(`/svr/employees/del/${st}`);
    console.log(st);
    if (res.status === 200) {
      setTimeout(() => {
        this.fetchData();
      }, 1);
    }
  };

  render() {
    const { employees, departments, designations, genders } = this.state;
    let { dept, desig } = this.props.match.params;
    let queryParams = queryString.parse(this.props.location.search);
    let { department = "", designation = "", gender = "" } = queryParams;
    let emp = employees;
    emp = department ? emp.filter((st) => st.department === department) : emp;
    emp = designation
      ? emp.filter((st) => st.designation === designation)
      : emp;
    emp = gender ? emp.filter((st) => st.gender === gender) : emp;
    return (
      <div className="container">
        <div className="row">
          {!dept && !desig && (
            <div className="col-3">
              <LeftPanel
                departments={departments}
                designations={designations}
                genders={genders}
                options={queryParams}
                onOptionChange={this.handleOptionChange}
              />
            </div>
          )}

          <div className={dept && desig ? "col-12" : "col-9"}>
            <div className="row border text-center text-white bg-dark">
              <div className="col-1" onClick={() => this.handleSort(3)}>
                EmpCode
              </div>
              <div className="col-2" onClick={() => this.handleSort(0)}>
                Name
              </div>
              <div className="col-2" onClick={() => this.handleSort(2)}>
                Department
              </div>
              <div className="col-2" onClick={() => this.handleSort(4)}>
                Designation
              </div>
              <div className="col-1" onClick={() => this.handleSort(1)}>
                Salary
              </div>
              <div className="col-2" onClick={() => this.handleSort(5)}>
                Gender
              </div>
              <div className="col-2"></div>
            </div>
            {emp.map((e) => {
              let { empcode, name, department, designation, salary, gender } =
                e;
              console.log();
              return (
                <div className="row border text-center">
                  <div className="col-1">{empcode}</div>
                  <div className="col-2">{name}</div>
                  <div className="col-2">{department}</div>
                  <div className="col-2">{designation}</div>
                  <div className="col-1">
                    {salary === 0 ? "Not Specified" : salary}
                  </div>
                  <div className="col-2">{gender}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-warning btn-sm m-1"
                      onClick={() => this.handleEdit(+empcode)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(+empcode)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default EmpPage;
