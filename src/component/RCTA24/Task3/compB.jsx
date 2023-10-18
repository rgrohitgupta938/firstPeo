import React, { Component } from "react";
class CompB extends Component {
  state = { counter: 0 };
  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  componentDidMount() {
    const { name } = this.props.match.params;
    const { counter } = this.state;
    console.log(`BBBB : componentDidMount : counter = ${counter} name=${name}`);
  }
  componentDidUpdate(prevProps, prevState) {
    const { counter } = this.state;
    const { name } = this.props.match.params;
    console.log(
      `BBBB : componentDidUpdate : counter = ${counter} name=${name}`
    );
    if(prevProps !== this.props){
        console.log("resetting the counter");
        this.setState({counter:0,})
    }
  }
  componentWillUnmount() {
    const { counter } = this.state;
    const { name } = this.props.match.params;
    console.log(
      `BBBB : componentWillUnmount : counter = ${counter} name=${name}`
    );
  }
  shouldComponentUpdate(prevProps, prevState) {
    const { counter } = this.state;
    const { name } = this.props.match.params;
    console.log(
      `BBBB : shouldComponentUpdate : counter = ${counter} name=${name}`
    );
    return true;
  }
  render() {
    const { counter } = this.state;
    const { name } = this.props.match.params;
    console.log(`AAAA : render : counter = ${this.state.counter}`);
    return (
      <div className="container bg-primary text-dark">
        Component BBBB <br />
        Counter : {counter}
        <button
          className="btn btn-danger btn-sm ms-3"
          onClick={() => this.increment()}
        >
          Increment
        </button>
        <br />
        Name : {name}
        <br />
      </div>
    );
  }
}
export default CompB;
