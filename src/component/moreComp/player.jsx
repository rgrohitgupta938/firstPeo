import React, { Component } from "react";
class Player extends Component {
  render() {
    const { player1,index,onScore } = this.props;
    console.log("prop", this.props);
    return ( 
        <React.Fragment>
            <h6 className="text-primary bg-light">Name: { player1.name }<br/>Score: {player1.score}<br/>
            <button className="btn btn-success btn-sm" onClick={() => onScore(index)}>1 Point</button></h6>
        </React.Fragment>);
  }
}
export default Player;
