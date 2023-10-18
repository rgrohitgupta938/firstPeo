import React, { Component } from "react";
import Counter from "./counter";
class CountingMachine extends Component {
  state = {
    counters: [
      {id: 12, alphabet: "A", count: 1},
      {id: 23, alphabet: "B", count: 2},
      {id: 7, alphabet: "C", count: 0},
      {id: 16, alphabet: "D", count: 0},
    ],
    data: "",
  };

  handleDel = (id) => {
    let s1 = {...this.state};
    let st = s1.counters.findIndex((k) => k.id === id);
    s1.counters.splice(st,1);
    this.setState(s1);
  };
  handleRes = () => {
    let s1 = {...this.state};
    let st = s1.counters.map((k) => ({id:k.id ,alphabet: k.alphabet,count:0}));
    s1.counters = st;
    s1.data = "";
    this.setState(s1);
  }
  handleInc = (id) => {
    let s1 = {...this.state};
    let st = s1.counters.find((k) => k.id === id);
    st.count++;
    s1.data += st.alphabet;
    this.setState(s1);
  }


  render(){
    const { counters,data} = this.state;
   return (
    <React.Fragment>
      {counters.map((n1) => (
        <Counter counter = {n1} onDelete={this.handleDel} onIncrement={this.handleInc} />
      ))}
      <button className="btn btn-primary btn-sm" onClick={() => this.handleRes()}>Reset All</button>
      <h6>Alphabets: {data}</h6>
    </React.Fragment>
   );
  }
}

export default CountingMachine;
