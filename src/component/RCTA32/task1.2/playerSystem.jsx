import React, { Component } from "react";
import Player from "./player";
class PlayerSystem extends Component {
  state = {
    players: [
      { name: "Jack", score: 21 },
      { name: "Steve", score: 30 },
      { name: "Martha", score: 44 },
      { name: "Bob", score: 15 },
    ],
  };
  handleScore = (name) => {
    let players = this.state.players;
    let play = players.find((p) => p.name === name);
    play.score++;
    this.setState({ players: players });
  };
  render() {
    const players = this.state.players;
    return (
      <div className="container">
        <Player players={players} onclickScore={this.handleScore} />
      </div>
    );
  }
}
export default PlayerSystem;
