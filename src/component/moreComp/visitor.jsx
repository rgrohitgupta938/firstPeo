import React, { Component } from "react";
class Visitor extends Component {
  getButton = (sta,onEnter,onExit,onExitQueue,id) => 
    sta === "Outside" ? (
      <button className="btn btn-success btn-sm" onClick={() => onEnter(id)}>Enter</button>
    ) : sta === "Inside" ? (
      <button className="btn btn-warning btn-sm" onClick={() => onExit(id)}>Exit</button>
    ) : sta === "Waiting" ? (<button className="btn btn-danger btn-sm" onClick={() => onExitQueue(id)}>Exit Queue</button>) :(
      ""
    );

    getRowCol = (sta) => 
        sta === "Outside" ? "bg-dark text-white" : sta === "Inside" ? "bg-secondary text-white" : "bg-light";
    


  render() {
    const { visitor,onEnter,onExit,onExitQueue } = this.props;
    const { id, name, status } = visitor;
    return (
      <div className={"row border m-1 "+this.getRowCol(status)}>
        <div className="col-3">{id}</div>
        <div className="col-3">{name}</div>
        <div className="col-3">{status}</div>
        <div className="col-3">{this.getButton(status,onEnter,onExit,onExitQueue,id)}</div>
      </div>
    );
  }
}
export default Visitor;
