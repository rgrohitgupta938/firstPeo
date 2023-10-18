import React, { Component } from "react";
import Player from "./player";
class PlayerSystem extends Component {
  state = {
    players: [{name:"Jack",score:21},{name:"Steve",score:30},{name:"Martha",score:44},{name:"Bob",score:15},{name:"Katherine",score:28}],
  };

  handleScore = (index) => {
    let s1 = {...this.state};
    let pr = s1.players[index];
    pr.score++;
    this.setState(s1);
  }

  render() {
    const { players } = this.state;
    return (
      <React.Fragment>
        <h4>List of Names</h4>
        {players.map((k,index) => (
          <Player player1={k} index ={index} onScore = {this.handleScore} />
        ))}
      </React.Fragment>
    );
  }
}
export default PlayerSystem;
