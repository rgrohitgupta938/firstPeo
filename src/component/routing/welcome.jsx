import React, { Component } from "react";
import { Link } from "react-router-dom";
class Welcome extends Component {
  render() {
    return (
      <div className="conatiner">
        <h4>Welcome : Choose your course</h4>
        <Link to="/course/React">React</Link>
        <br />
        <Link to="/course/Angular">Angular</Link>
        <br />
        <Link to="/course/Javascript">Javascript</Link>
      </div>
    );
  }
}
export default Welcome;
