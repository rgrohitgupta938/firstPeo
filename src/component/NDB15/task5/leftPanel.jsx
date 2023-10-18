import React, { Component } from "react";
import "./main.css"; // Import the CSS file
class LeftPanel extends Component {
  state = {
    activeCategory: null,
  };
  handleCl = (ot) => {
    console.log(ot);
    this.props.history.push(`/main/${ot}`);
    this.setState({ activeCategory: ot });
  };
  render() {
    const { optionsArr } = this.props;
    const { activeCategory } = this.state;
    return (
      <div className="container">
        {optionsArr.map((ot) => (
          <div
            key={ot}
            className={`label ${ot === activeCategory ? "active" : ""}`}
            onClick={() => this.handleCl(ot)}
          >
            {ot}
          </div>
        ))}
      </div>
    );
  }
}
export default LeftPanel;
