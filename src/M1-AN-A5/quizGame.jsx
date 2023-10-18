import React, { Component } from "react";
import { getQuizQuestions } from "./quizqns";

class QuizGame extends Component {
  state = {
    players: [
      { name: "James", points: 0 },
      { name: "Julia", points: 0 },
      { name: "Martha", points: 0 },
      { name: "Steve", points: 0 },
    ],
    questions: getQuizQuestions(),
    currentQuestion: 0,
    playerBuzzer: null,
    winner: -1,
  };

  changeBuzzer = (index) => {
    let s1 = { ...this.state };
    s1.playerBuzzer = index;
    this.setState(s1);
  };

  correctAnswer = (questionIndex, optionIndex) => {
    let s1 = { ...this.state };
    if(s1.playerBuzzer === null) return alert ("Select any player Buzzer")
    if (s1.questions[questionIndex].answer === optionIndex + 1) {
      let playerIndex = s1.players.findIndex(
        (player) => player.name === s1.players[s1.playerBuzzer].name
      );
      if (playerIndex >= 0) {
        s1.players[playerIndex].points += 3;
        alert("Correct Answer.You get 3 points");
      }
    } else {
      let playerIndex = s1.players.findIndex(
        (player) => player.name === s1.players[s1.playerBuzzer].name
      );
      if (playerIndex >= 0) {
        s1.players[playerIndex].points -= 1;
        alert("Wong Answer.You get -1 points");
      }
    }
    if (s1.currentQuestion < 5) {
      s1.currentQuestion += 1;
    } else {
      s1.winner = 0;
      s1.currentQuestion = 0;
    }
    s1.playerBuzzer = null;
    this.setState(s1);
  };
  getColor = (inx) => {
    const { playerBuzzer } = this.state;
    return playerBuzzer === inx ? "bg-success" : "bg-warning";
  };

  render() {
    const { players, questions, currentQuestion, winner } = this.state;
    let st1 = players.reduce((prev, curr) =>
      prev.points > curr.points ? prev : curr
    );
    let st = players.map((k) => k.points === st1.points ? k.name : null);
    console.log(st1, "st+>", st);

    return (
      <div className="container text-center">
        <h1>Welcome to the Quiz Contest</h1>
        <h4>Participants</h4>
        <div className="row justify-content-center">
          {players.map((player, index) => (
            <div className={"col-2 border m-2 fw-bold " + this.getColor(index)}>
              Name: {player.name}
              <br />
              Score: {player.points}
              <br />
              <button
                className="btn btn-light m-1"
                onClick={() => this.changeBuzzer(index)}
              >
                BUZZER
              </button>
            </div>
          ))}
        </div>
        {winner !== 0 ? (
          <React.Fragment>
            <h4>Question Number: {currentQuestion + 1}</h4>
            <h5>{questions[currentQuestion].text}</h5>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                className="btn btn-info m-2"
                onClick={() => this.correctAnswer(currentQuestion, index)}
              >
                {option}
              </button>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h4>Game Over</h4>
            <h5>
              {st.length > 2
                ? "The game is Tie .The Winners are "
                : "THe Winner is"}
              {st.length === 1 ? st : st.join(" ")}
            </h5>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default QuizGame;
