import React, { Component } from "react";
class Message extends Component {

  render() {
    const { id, email1, reading,onPreviousState,onDelete1} = this.props;
    let msg = email1.find((l) => l.id === id);
    const texts = msg ? msg.text.split("\n") : [];
    console.log(email1);
    return (
      <div className="sty1">
        {reading ? (
          <React.Fragment>
            <hr></hr>
            <i className="fas fa-arrow-left text-start ps-2" onClick={() => onPreviousState(msg.folder)}></i>
            <span className="sty3">
              <i class="fa-solid fa-trash-can" onClick={() => onDelete1(id,msg.folder)}></i>
            </span>
            <div className="col border ps-2">
              From : {msg.from}
              <br />
              To : {msg.to}
              <br />
              Subject : {msg.subject}
              <br />
              {texts.map((line, index) => (
                <p>{line}</p>
              ))}
              
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Message;
