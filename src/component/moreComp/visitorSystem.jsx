import React, { Component } from "react";
import Visitor from "./visitor";
class VisitorSystem extends Component {
  state = {
    visitors: [
      { id: 101, name: "Jack", status: "Outside" },
      { id: 102, name: "Tim", status: "Outside" },
      { id: 235, name: "Mary", status: "Outside" },
      { id: 107, name: "Steve", status: "Outside" },
      { id: 96, name: "Anna", status: "Outside" },
      { id: 126, name: "Kathy", status: "Outside" },
      { id: 129, name: "Meg", status: "Outside" },
      { id: 108, name: "Bob", status: "Outside" },
    ],
    queue: [],
  };

  getInsideCount = () => 
    this.state.visitors.reduce(
      (acc, curr) => acc + (curr.status === "Inside" ? 1 : 0),
      0
    );
 

  handleEnter = (id) => {
    let s1 = { ...this.state };
    let vis = s1.visitors.find((v1) => v1.id === id);
    let insideCount = this.getInsideCount();
    if(insideCount === 2){
      vis.status = "Waiting";
      s1.queue.push(vis);
    }else vis.status = "Inside";
    this.setState(s1);
  };
  handleExit = (id) => {
    let s1 = { ...this.state };
    let vis = s1.visitors.find((v1) => v1.id === id);
    vis.status = "Outside";
    if(s1.queue.length > 0){
      let v1 = s1.queue.shift();
      v1.status = "Inside";
    }
    this.setState(s1);
  };
  handleExitQueue = (id) => {
    let s1 = { ...this.state };
    let vis = s1.visitors.find((v1) => v1.id === id);
    vis.status = "Outside";
    if (s1.queue.length > 0) {
      let st = s1.queue.findIndex((k) => k.id === id);
      st >=  0  ? (s1.queue.splice(st,1)) :  "";
    }
    this.setState(s1);
  };
  

  render() {
    const { visitors,queue } = this.state;
    return (
      <div className="container">
        <h4>Inside = {this.getInsideCount()} Queue = {queue.length}</h4>
        {visitors.map((k) => (
          <Visitor
            visitor={k}
            onEnter={this.handleEnter}
            onExit={this.handleExit}
            onExitQueue={this.handleExitQueue}
          />
        ))}
        <h4>Queue</h4>
        <ul>
          {queue.map((n) => (
            <li>{n.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default VisitorSystem;
