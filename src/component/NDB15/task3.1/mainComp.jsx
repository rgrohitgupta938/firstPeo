import React, { Component, component } from "react";
import http from "../../../services/httpService";
class MainComp extends Component {
  state = {
    methods: ["GET", "POST"],
    data: [],
    method: "",
    url: "",
    textData: "",
    msg: "",
    status: "",
    time: "",
  };
  handleChange = (e) => {
    console.log(e.currentTarget);
    let s1 = { ...this.state };
    s1[e.currentTarget.name] = e.currentTarget.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hellsub");
    let { method, textData, url } = this.state;
    this.postURL(url, textData, method);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.method !== this.state.method) {
      this.setState({
        msg: "",
        status: "",
        time: "",
        data: [],
        textData: "",
      });
    }
  }
  async postURL(url, obj, method) {
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
      let obj1 = { method, url, body: newObj };
      console.log(1, obj1);
      let response = await http.post("/myserver1/url", obj1);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      console.log(response);
      this.setState({
        data: response.data,
        msg: response.statusText,
        status: response.status,
        time: timeTaken,
      });
    } catch (err) {
      console.log("Error : ", err.response);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      this.setState({
        data: [],
        textData: "",
        msg: err.response.data.error,
        status: err.response.data.errorCode,
        time: timeTaken,
      });
    }
  }
  render() {
    const { methods, method, url, textData, data, msg, status, time } =
      this.state;
    return (
      <div className="container">
        <div className="form-group">
          <label>Methods</label>
          <select
            className="form-control"
            name="method"
            value={method}
            onChange={this.handleChange}
          >
            <option value="">Select Method</option>
            {methods.map((method) => (
              <option value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fetch URL </label>
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            onChange={this.handleChange}
            placeholder="Enter URL"
            value={url}
          />
        </div>
        {method === "POST" && (
          <div className="form-group">
            <label>Data (IN JSON object)</label>
            <textarea
              className="form-control"
              name="textData"
              onChange={this.handleChange}
              placeholder="Enter JSON Data"
              value={textData}
              rows={10}
            />
          </div>
        )}
        <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
          SUbmit
        </button>
        {status && <h6>Status : {status}</h6>}
        {msg && <h6>Response : {msg}</h6>}
        {time && <h6>Time : {time}ms</h6>}
        {data.length !== 0 && (
          <div className="form-group">
            <textarea
              className="form-control"
              name="showTxt"
              value={JSON.stringify(data)}
              readOnly="true"
              rows={10}
            />
          </div>
        )}
      </div>
    );
  }
}
export default MainComp;
