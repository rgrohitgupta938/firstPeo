import React, { Component } from "react";
import NavBar from "./navbar";
import "./main.css";
class MainComp extends Component {
  state = {
    messages: [
      {
        id: 121,
        sent: false,
        from: "tweets@twitter.com",
        to: "jack@test.com",
        subject: "18 tweets from those you follow",
        text: "Go to your twitter page and see the tweets from those you follow.",
        folder: "Social",
      },
      {
        id: 141,
        sent: true,
        from: "jack@test.com",
        to: "mary@test.com",
        subject: "Bug 461 in Customer Flow",
        text: "When the checkbox is left unchecked and the option Important is selected in the dropdown, clicking on Submit, shows no results.",
        folder: "Sent",
      },
      {
        id: 158,
        sent: false,
        from: "email@facebook.com",
        to: "jack@test.com",
        subject: "New post from William Jones",
        text: "William Jones has just uploaded a new post -How i loved the Avengers Endgame.",
        folder: "Social",
      },
      {
        id: 177,
        sent: true,
        from: "jack@test.com",
        to: "williams@test.com",
        subject: "Movie tomorrow",
        text: "Avengers Endgame is releasing tomorrow. Wanna see.",
        folder: "Sent",
      },
      {
        id: 179,
        sent: false,
        from: "williams@test.com",
        to: "jack@test.com",
        subject: "Re: Movie tomorrow",
        text: "The movie is supposed to be a blast. Lets do the 8:30 show. Want to have a quick bite before.",
        folder: "Inbox",
      },
      {
        id: 194,
        sent: false,
        from: "retweet@twitter.com",
        to: "jack@test.com",
        subject: "Your tweet has been retweeted by Thomas",
        text: "Your tweet on the Marvel Superheroes and Avengers has been retweeted bt Thomas. It has now 41 retweets and 27 likes.",
        folder: "Social",
      },

      {
        id: 204,
        sent: true,
        from: "jack@test.com",
        to: "jack@test.com",
        subject: "To do on Friday",
        text: "Test the bugs on the employee form in Release 0.7.9 and fix them.",
        folder: "Work",
      },
      {
        id: 255,
        sent: true,
        from: "mary@test.com",
        to: "jack@test.com",
        subject: "Release 0.8.4 deployed",
        text: "Release 0.8.4 has been deployed in the test environment.",
        folder: "Inbox",
      },
      {
        id: 278,
        sent: false,
        from: "mary@test.com",
        to: "jack@test.com",
        subject: "Re: Bug 461 in Customer Flow",
        text: "The bug has been fixed in the release 0.8.7. \nPlease test the issue and close it.\nCan you do it but tomorrow\nMary",
        folder: "Work",
      },
      {
        id: 281,
        sent: true,
        from: "jack@test.com",
        to: "mary@test.com",
        subject: "Re: Re: Bug 461 in Customer Flow",
        text: "Bug 461 has been closed.\nRegards,\nJack",
        folder: "Sent",
      },
      {
        id: 289,
        sent: false,
        from: "email@facebook.com",
        to: "jack@test.com",
        subject: "5 Shares, 2 Posts from your friends",
        text: "Jack, while you were away, your friends are having fun on Facebook.\nDon't miss their posts.\nKeep up with your friends.",
        folder: "Social",
      },
    ],
    type: "",
    textSearch: "",
    view: 0,
    message: {
      id: "",
      sent: true,
      from: "jack@test.com",
      to: "",
      subject: "",
      text: "",
      folder: "Sent",
    },
    selectedMessages: [],
    mesType: ["Social", "Work", "Draft", "Sent", "Inbox"],
    selType: "",
    filteredMessages: [],
    reply: 0,
    disMsg: {},
  };
  handleType = (st) => {
    this.setState({ type: st, view: 0 });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "to" || name === "subject" || name === "text") {
      this.setState((prevState) => ({
        message: {
          ...prevState.message,
          [name]: value,
        },
      }));
    } else {
      this.setState({ [name]: value }, () => {
        console.log(e.key);
        if (e.key === "Enter") {
          const { type, textSearch, messages } = this.state;
          const filteredMessages = messages.filter((m) => {
            return (
              m.from.toLowerCase().includes(textSearch.toLowerCase()) ||
              m.to.toLowerCase().includes(textSearch.toLowerCase()) ||
              m.subject.toLowerCase().includes(textSearch.toLowerCase()) ||
              m.text.toLowerCase().includes(textSearch.toLowerCase())
            );
          });
          this.setState({ filteredMessages, view: 2 });
        }
      });
    }
  };
  handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      const { type, textSearch, messages } = this.state;
      const filteredMessages = messages.filter((m) => {
        return (
          m.from.toLowerCase().includes(textSearch.toLowerCase()) ||
          m.to.toLowerCase().includes(textSearch.toLowerCase()) ||
          m.subject.toLowerCase().includes(textSearch.toLowerCase()) ||
          m.text.toLowerCase().includes(textSearch.toLowerCase())
        );
      });

      this.setState({
        filteredMessages: filteredMessages,
        view: 2,
      });
    }
  };
  handleCompose = () => {
    this.setState({ view: 1, type: "", reply: 0 });
  };
  handleSend = () => {
    let { message, messages } = this.state;
    console.log(message);
    let maxId = messages.reduce(
      (acc, curr) => (acc > curr.id ? acc : curr.id),
      0
    );
    console.log(maxId);
    let extra = {
      id: "",
      sent: true,
      from: "jack@test.com",
      to: "",
      subject: "",
      text: "",
      folder: "Sent",
    };
    let newMessage = { ...extra, ...message, id: +maxId + 1 };
    console.log(newMessage);
    messages.push(newMessage);
    this.setState({
      messages: messages,
      view: 0,
      message: {
        id: "",
        sent: true,
        from: "jack@test.com",
        to: "",
        subject: "",
        text: "",
        folder: "Sent",
      },
    });
  };
  handleSelMessages = (id) => {
    this.setState((prevState) => {
      const selectedMessages = [...prevState.selectedMessages];
      const index = selectedMessages.indexOf(id);
      if (index === -1) {
        selectedMessages.push(id);
      } else {
        selectedMessages.splice(index, 1);
      }
      return { selectedMessages };
    });
  };
  handleMoveToFolder = (e) => {
    const { selectedMessages } = this.state;
    const selectedFolder = e.target.value;
    const updatedMessages = this.state.messages.map((message) => {
      if (selectedMessages.includes(message.id)) {
        return {
          ...message,
          folder: selectedFolder,
        };
      }
      return message;
    });

    this.setState({
      messages: updatedMessages,
      selectedMessages: [],
      selType: "",
    });
  };

  makeDropDown = (arr, value, name, label) => {
    return (
      <div className="form-group">
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={this.handleMoveToFolder}
        >
          <option value="">{label}</option>
          {arr.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    );
  };
  handleDelete = () => {
    const { selectedMessages, messages, filteredMessages } = this.state;
    const updatedMessages = messages.filter(
      (m) => !selectedMessages.includes(m.id)
    );
    const updatedFilteredMessages = filteredMessages.filter(
      (m) => !selectedMessages.includes(m.id)
    );
    this.setState({
      messages: updatedMessages,
      filteredMessages: updatedFilteredMessages,
      selectedMessages: [],
    });
  };
  handleClick = (m) => {
    console.log("In 271");
    this.setState({ view: 3, disMsg: m });
  };
  handleSearchChange = (e) => {
    const { value } = e.target;
    this.setState({ textSearch: value });
  };
  handleReply1 = (m) => {
    let replyMessage = {};
    replyMessage.to = m.from === "jack@test.com" ? m.to : m.from;
    replyMessage.subject = `Re: ${m.subject}`;
    replyMessage.text = `${m.text}`;
    this.setState({ view: 1, message: replyMessage, reply: 1 });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.lenght) {
    }
  }
  render() {
    const {
      messages,
      type,
      textSearch,
      filteredMessages,
      view,
      message,
      selectedMessages,
      selType,
      mesType,
      reply,
      disMsg,
    } = this.state;
    let messages1 = messages.filter((m) => m.folder === type) || [];
    let { id, from, sent, to, subject, text, folder } = message;
    const linesArray = disMsg.text ? disMsg.text.split("\n") : [];
    console.log(linesArray);
    console.log(this.state.filteredMessages, linesArray);
    return (
      <React.Fragment>
        <NavBar
          onSearchChange={this.handleSearchChange}
          onPressEnter={this.handleKeyPress}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <div className="container">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleCompose()}
                >
                  Compose
                </button>
                <div className="row">
                  <label
                    onClick={() => this.handleType("Inbox")}
                    className={type === "Inbox" ? "lb-txt" : ""}
                  >
                    Inbox({messages.filter((m) => m.folder === "Inbox").length})
                  </label>
                </div>
                <div className="row">
                  <label
                    onClick={() => this.handleType("Sent")}
                    className={type === "Sent" ? "lb-txt" : ""}
                  >
                    Sent({messages.filter((m) => m.folder === "Sent").length})
                  </label>
                </div>
                <div className="row">
                  <label
                    onClick={() => this.handleType("Draft")}
                    className={type === "Draft" ? "lb-txt" : ""}
                  >
                    Draft({messages.filter((m) => m.folder === "Draft").length})
                  </label>
                </div>
                <div className="row">
                  <label
                    onClick={() => this.handleType("Work")}
                    className={type === "Work" ? "lb-txt" : ""}
                  >
                    Work({messages.filter((m) => m.folder === "Work").length})
                  </label>
                </div>
                <div className="row">
                  <label
                    onClick={() => this.handleType("Social")}
                    className={type === "Social" ? "lb-txt" : ""}
                  >
                    Social(
                    {messages.filter((m) => m.folder === "Social").length})
                  </label>
                </div>
              </div>
            </div>
            <div className="col-10 pt-5">
              {view === 2 && filteredMessages.length !== 0 && (
                <p>{`Showing Messages 1-${filteredMessages.length} of ${filteredMessages.length}`}</p>
              )}
              {view === 2 && filteredMessages.length === 0 && (
                <p>There is no Message</p>
              )}
              {view === 0 &&
                messages1.map((m) => (
                  <div
                    className="row border p-2 clickable"
                    key={m.id}
                    onClick={() => this.handleClick(m)}
                  >
                    <div className="col-3 d-inline-block text-truncate">
                      {m.from === "jack@test.com" ? "me" : m.from}
                    </div>
                    <div className="col-3 d-inline-block text-truncate">
                      {m.subject}
                    </div>
                    <div className="col-6 d-inline-block text-truncate">
                      {m.text}
                    </div>
                  </div>
                ))}
              {view === 2 &&
                selectedMessages &&
                selectedMessages.length !== 0 && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-1">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => this.handleDelete()}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-1">
                        {this.makeDropDown(
                          mesType,
                          selType,
                          "selType",
                          "Move To"
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                )}
              {view === 2 &&
                filteredMessages &&
                filteredMessages.map((m) => (
                  <div className="row border p-2" key={m.id}>
                    <div className="col-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={m.id}
                        onChange={() => this.handleSelMessages(m.id)}
                        checked={selectedMessages.includes(m.id)}
                      />
                    </div>
                    <div className="col-2 d-inline-block text-truncate">
                      {m.from === "jack@test.com" ? "me" : m.from}
                    </div>
                    <div className="col-3 d-inline-block text-truncate">
                      {m.subject}
                    </div>
                    <div className="col-6 d-inline-block text-truncate">
                      {m.text}
                    </div>
                  </div>
                ))}

              {view === 1 && (
                <React.Fragment>
                  <div className="row">To</div>
                  <div className="row">
                    <input
                      type="text"
                      className="form-control"
                      id="to"
                      name="to"
                      onChange={this.handleChange}
                      placeholder=""
                      value={to}
                    />
                  </div>
                  <div className="row">Subject</div>
                  <div className="row">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      onChange={this.handleChange}
                      placeholder=""
                      value={subject}
                    />
                  </div>
                  <div className="row">Message</div>
                  <div className="row">
                    <textarea
                      rows="5"
                      className="form-control"
                      id="text"
                      name="text"
                      onChange={this.handleChange}
                      placeholder=""
                      value={text}
                    />
                  </div>

                  <button
                    className={"btn btn-primary"}
                    onClick={() => this.handleSend()}
                  >
                    {"Send"}
                  </button>
                </React.Fragment>
              )}
              {view === 3 && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-2">From</div>
                    <div className="col-2">{disMsg.from}</div>
                  </div>
                  <div className="row">
                    <div className="col-2">To</div>
                    <div className="col-2">{disMsg.to}</div>
                  </div>
                  <div className="row">
                    <div className="col-2">Subject</div>
                    <div className="col-2">{disMsg.subject}</div>
                  </div>
                  <div className="row">
                    <div className="col-2">Message</div>
                    <div className="col">
                      {linesArray.map((l) => (
                        <React.Fragment key={l}>
                          {l}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleReply1(disMsg)}
                  >
                    Reply
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MainComp;
