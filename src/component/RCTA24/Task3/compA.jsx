import React, { Component } from "react";
class CompA extends Component {
  state = { counter: 0 };
  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  componentDidMount() {
    console.log(`AAAA : componentDidMount : counter = ${this.state.counter}`);
  }
  componentWillUnmount() {
    console.log(
      `AAAA : componentWillUnmount : counter = ${this.state.counter}`
    );
  }
  componentDidUpdate() {
    console.log(`AAAA : componentDidUpdate : counter = ${this.state.counter}`);
  }
  shouldComponentUpdate(prevProps, prevState) {
    console.log(
      `AAA : shouldComponentUpdate : counter = ${this.state.counter}`
    );
    return false;
  }
  render() {
    const { counter } = this.state;
    console.log(`AAAA : render : counter = ${this.state.counter}`);
    return (
      <div className="container bg-warning text-dark">
        Component AAAA <br />
        Counter : {counter}
        <button
          className="btn btn-danger btn-sm ms-3"
          onClick={() => this.increment()}
        >
          Increment
        </button>
        <br />
      </div>
    );
  }
}
export default CompA;
