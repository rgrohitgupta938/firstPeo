import React, { Component } from "react";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";
import { PiMonitorLight } from "react-icons/pi";
import { TbStack3 } from "react-icons/tb";
import { LiaHistorySolid } from "react-icons/lia";
class Sidebar extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "60px" }}>
          <div className="col" style={{ color: "grey", cursor: "pointer" }}>
            <BsFillCollectionFill />
            <br />
            Collections
          </div>
          <div
            className="col"
            style={{ marginTop: "30px", color: "grey", cursor: "pointer" }}
          >
            <AiFillApi />
            <br />
            Api's
          </div>
          <div
            className="col"
            style={{ marginTop: "30px", color: "grey", cursor: "pointer" }}
          >
            <PiMonitorLight />
            <br />
            Monitor
          </div>
          <div
            className="col"
            style={{ marginTop: "30px", color: "grey", cursor: "pointer" }}
          >
            <TbStack3 />
            <br />
            Flow
          </div>
          <div
            className="col"
            style={{ marginTop: "30px", color: "grey", cursor: "pointer" }}
          >
            <LiaHistorySolid />
            <br />
            History
          </div>
        </div>
      </div>
    );
  }
}
export default Sidebar;
