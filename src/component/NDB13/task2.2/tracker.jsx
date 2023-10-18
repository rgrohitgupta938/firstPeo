import React, { Component } from "react";
import http from "../../../services/httpService";
class Tracker extends Component {
  state = {
    trackers: [],
  };
  async getTrackers() {
    let response = await http.get("/tracker");
    let { data } = response;
    this.setState({ trackers: data });
    console.log(data, response);
  }
  componentDidMount() {
    this.getTrackers();
  }
  render() {
    const { trackers } = this.state;
    return (
      <div className="container">
        <div className="row border fw-bold bg-light">
          <div className="col-4">User</div>
          <div className="col-4">URL</div>
          <div className="col-4">Date</div>
        </div>
        {trackers &&
          trackers.map((tr) => (
            <div className="row border">
              <div className="col-4">{tr.user}</div>
              <div className="col-4">{tr.url}</div>
              <div className="col-4">{tr.date}</div>
            </div>
          ))}
      </div>
    );
  }
}
export default Tracker;
