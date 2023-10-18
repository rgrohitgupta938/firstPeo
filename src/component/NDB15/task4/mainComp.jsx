import React, { Component } from "react";
import Sidebar from "./sidebar";
import { IoMdArrowDropdown } from "react-icons/io";
import http from "../../../services/httpService";
import "./main.css";
class MainComp extends Component {
  state = {
    data: [],
    status: "",
    statusText: "",
    methods: ["GET", "POST", "DELETE", "PUT"],
    method: "",
    url: "",
    optionsArr: [
      "none",
      "form-data",
      "x-www--form-url-encoded",
      "raw",
      "binary",
      "GraphQl",
    ],
    option: "",
    textData: "",
    time: "",
    arr: "",
    view: 0,
    header1: { auth: "", authKey: "", desc: "" },
  };
  handleChange = (e) => {
    let s1 = { ...this.state };
    let { name, value } = e.currentTarget;
    if (name === "auth" || name === "authKey") {
      console.log(name, value);
      s1.header1[name] = value;
      this.setState(s1);
    } else {
      s1[name] = value;
      this.setState(s1);
    }
  };

  makeRadio = (arr, value, name, label) => {
    return (
      <React.Fragment>
        {arr &&
          arr.map((ch) => (
            <div className="col-2">
              <div className="form-check" key={ch}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  checked={value === ch}
                  value={ch}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{ch}</label>
              </div>
            </div>
          ))}
      </React.Fragment>
    );
  };
  makeText = (name, placeholder, color) => {
    console.log(name);
    return (
      <React.Fragment>
        <input
          type="text"
          className="form-control"
          id={name}
          name={name}
          onChange={this.handleChange}
          value={this.state.header1[name]}
          placeholder={placeholder}
          style={{
            color: "black",
            backgroundColor: color ? color : "white",
          }}
        />
      </React.Fragment>
    );
  };
  handleSubmit = () => {
    let { url, method, textData } = this.state;
    let obj = { method, url, textData };
    console.log(method, url, textData);
    this.postURL(url, textData, method);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.method !== this.state.method) {
      this.setState({
        status: "",
        time: "",
      });
    }
  }
  async postURL(url, obj, method) {
    const { header1 } = this.state;
    const startTime = new Date().getTime();
    try {
      let newObj = {};
      if (obj.trim()) {
        try {
          newObj = JSON.parse(obj);
        } catch (parseError) {
          console.log("Error parsing JSON:", parseError);
          return;
        }
      }
      let obj1 = { method, url, body: newObj, headers: header1 };
      console.log(1, obj1);
      let response = await http.post("/myserver1/url", obj1);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      console.log("In line 114", response);
      let type = typeof response.data;
      console.log(type);
      if (response.data.status === 404) {
        this.setState({
          data: "Not Found",
          status: response.data.status,
          time: timeTaken + "ms",
          statusText: "Not Found",
        });
      } else if (response.data.status === 401) {
        this.setState({
          data: "Not Found",
          status: response.data.status,
          time: timeTaken + "ms",
          statusText: "Unauthorized",
        });
      } else {
        this.setState({
          data: response.data,
          status: response.status,
          time: timeTaken + "ms",
          statusText: response.statusText,
        });
      }
    } catch (err) {
      console.log("Error : ", err.response);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      console.log("Catch Error line 127", err);
      this.setState({
        data: [],
        textData: "",
        statusText: err.response.data.error || "Not Found",
        status: err.response.data.errorCode || 404,
        time: timeTaken,
      });
    }
  }
  handleHeader = () => {
    this.setState({ view: 1 });
  };
  handleBody = () => {
    this.setState({ view: 0 });
  };
  render() {
    const {
      methods,
      method,
      url,
      optionsArr,
      option,
      textData,
      status,
      statusText,
      time,
      data,
      arr,
      view,
      header1,
    } = this.state;
    let { auth, authKey, desc } = header1;
    return (
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-1 text-center">
            <Sidebar />
          </div>
          <div className="col-2"></div>
          <div className="col-8">
            <div className="form-group row mt-4">
              <div className="col-2 select-container">
                <select
                  className="form-control custom-select text-center"
                  name="method"
                  value={method}
                  onChange={this.handleChange}
                >
                  <option value="">Select Method</option>
                  {methods.map((mt) => (
                    <option value={mt} key={mt}>
                      {mt}
                    </option>
                  ))}
                </select>
                <IoMdArrowDropdown className="dropdown-arrow-icon" />
              </div>
              <div className="col-8 d-flex align-items-end">
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  onChange={this.handleChange}
                  value={url}
                  style={{
                    color: "black",
                    backgroundColor: "#e6e6e6",
                  }}
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div
                className="col-2 select-container"
                style={{ width: "10px", color: "white" }}
              >
                <select
                  className="form-control custom-select bg-primary"
                  name="arr"
                  value={arr}
                  onChange={this.handleChange}
                >
                  <option></option>
                </select>
                <IoMdArrowDropdown className="dropdown-arrow-icon1" />
              </div>
            </div>

            <div className="row mt-4">
              <span>
                {" "}
                <a
                  className="ms-1 me-4"
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                >
                  Query-Params
                </a>
                <a
                  className="ms-1 me-4"
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleHeader()}
                >
                  Headers
                </a>
                <a
                  className="ms-1 me-4"
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleBody()}
                >
                  Body
                </a>
              </span>
              <div className="row">
                {this.makeRadio(optionsArr, option, "option", "")}
              </div>
              {view === 0 && (
                <div className="row">
                  <textarea
                    className="form-control"
                    name="textData"
                    onChange={this.handleChange}
                    placeholder="Enter JSON Data"
                    value={textData}
                    rows={8}
                    style={{ background: "#f2f2f2" }}
                  />
                </div>
              )}
              {view === 1 && (
                <div className="container border">
                  <div className="row">
                    <div className="col-4 border">Key</div>
                    <div className="col-5 border">Value</div>
                    <div className="col-3 border">Desc</div>
                  </div>
                  <div className="row">
                    <div className="col-4">{this.makeText("auth", "Key")}</div>
                    <div className="col-5">
                      {this.makeText("authKey", "Value")}
                    </div>
                    <div className="col-3">
                      {this.makeText("desc", "Description", "whitesmoke")}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">{this.makeText("auth1", "Key")}</div>
                    <div className="col-5">
                      {this.makeText("authKey1", "Value")}
                    </div>
                    <div className="col-3">
                      {this.makeText("desc1", "Description", "whitesmoke")}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">{this.makeText("auth2", "Key")}</div>
                    <div className="col-5">
                      {this.makeText("authKey2", "Value")}
                    </div>
                    <div className="col-3">
                      {this.makeText("desc2", "Description", "whitesmoke")}
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-6">
                  <span>Response</span>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <span className="mr-2" style={{ color: "grey" }}>
                    Status:
                  </span>{" "}
                  <span
                    style={{
                      color:
                        status === 404 || status === 401 ? "red" : "lightgreen",
                    }}
                  >
                    {status}
                  </span>
                  {"  "}
                  <span
                    style={{
                      color:
                        status === 404 || status === 401 ? "red" : "lightgreen",
                    }}
                  >
                    {statusText}
                  </span>
                  <span className="ms-3" style={{ color: "grey" }}>
                    Time:
                  </span>{" "}
                  <span style={{ color: "lightgreen" }}>{time}</span>
                </div>
              </div>
              <div className="row">
                <textarea
                  className="form-control"
                  name="textData"
                  onChange={this.handleChange}
                  value={JSON.stringify(data) || ""}
                  rows={8}
                  style={{ background: "#f2f2f2" }}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MainComp;
