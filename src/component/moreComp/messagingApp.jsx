import React, { Component } from "react";
import MessagingFolder from "./messagingFolder";
import Message from "./message";
import NavBar from "./navbar";
class MessagingApp extends Component {
  state = {
    emails: [
      {
        id: 121,
        sent: false,
        from: "tweets@twitter.com",
        to: "jack@test.com",
        subject: "18 tweets from those you follow",
        text: "Go to your twitter page and see the tweets from those you follow.",
        folder: "Social",
        read: true,
      },
      {
        id: 141,
        sent: true,
        from: "jack@test.com",
        to: "mary@test.com",
        subject: "Bug 461 in Customer Flow",
        text: "When the checkbox is left unchecked and the option Important is selected in the dropdown, clicking on Submit, shows no results.",
        folder: "Sent",
        read: false,
      },
      {
        id: 158,
        sent: false,
        from: "email@facebook.com",
        to: "jack@test.com",
        subject: "New post from William Jones",
        text: "William Jones has just uploaded a new post -How i loved the Avengers Endgame.",
        folder: "Social",
        read: true,
      },
      {
        id: 177,
        sent: true,
        from: "jack@test.com",
        to: "williams@test.com",
        subject: "Movie tomorrow",
        text: "Avengers Endgame is releasing tomorrow. Wanna see.",
        folder: "Sent",
        read: false,
      },
      {
        id: 179,
        sent: false,
        from: "williams@test.com",
        to: "jack@test.com",
        subject: "Re: Movie tomorrow",
        text: "The movie is supposed to be a blast. Lets do the 8:30 show. Want to havea quick bite before.",
        folder: "Inbox",
        read: false,
      },
      {
        id: 194,
        sent: false,
        from: "retweet@twitter.com",
        to: "jack@test.com",
        subject: "Your tweet has been retweeted by Thomas",
        text: "Your tweet on the MarvelSuperheroes and Avengers has been retweeted bt Thomas. It has now 41 retweets and 27likes.",
        folder: "Social",
        read: false,
      },
      {
        id: 204,
        sent: true,
        from: "mary@test.com",
        to: "jack@test.com",
        subject: "To do on Friday",
        text: "Test the bugs on the employee form in Release 0.7.9 and fix them.",
        folder: "Inbox",
        read: false,
      },
      {
        id: 255,
        sent: true,
        from: "mary@test.com",
        to: "jack@test.com",
        subject: "Release 0.8.4 deployed",
        text: "Release 0.8.4 has been deployed in the test environment.",
        folder: "Inbox",
        read: false,
      },
      {
        id: 278,
        sent: false,
        from: "mary@test.com",
        to: "jack@test.com",
        subject: "Re: Bug 461 in Customer Flow",
        text: "The bug has been fixed in the release 0.8.7. \nPlease test the issue and close it.\nCan you do it but tomorrow\nMary",
        folder: "Inbox",
        read: false,
      },
      {
        id: 281,
        sent: true,
        from: "jack@test.com",
        to: "mary@test.com",
        subject: "Re: Re: Bug 461 in Customer Flow",
        text: "Bug 461 has been closed.\nRegards,\nJack",
        folder: "Sent",
        read: false,
      },
      {
        id: 289,
        sent: false,
        from: "email@facebook.com",
        to: "jack@test.com",
        subject: "5 Shares, 2 Posts from your friends",
        text: "Jack, while you were away, your friends are having fun on Facebook.\nDon't miss their posts.\nKeep up with yourfriends.",
        folder: "Social",
        read: true,
      },
    ],
    all:false,
    inbox:false,
    social:false,
    sent:false,
    reading:false,
    itemid:"",
    prevAll: false,
    prevPrevAll: false,
  };
  handleAll = () =>{
    let s1 = {...this.state};
    s1.all = true;
    s1.sent = false;
    s1.inbox = false;
    s1.reading = false;
    s1.social = false;
    s1.prevPrevAll = s1.prevAll;
    s1.prevAll = s1.all;
    this.setState(s1);
  }
  handleInbox = () => {
    let s1 = {...this.state};
    s1.sent = false;
    s1.inbox = true;
    s1.all = false;
    s1.reading = false;
    s1.social = false;
    s1.prevAll= false;
    s1.prevPrevAll= false;
    this.setState(s1);
  }
  handleSocial = () => {
    let s1 = {...this.state};
    s1.sent = false;
    s1.inbox = false;
    s1.all = false;
    s1.reading = false;
    s1.social = true;
    s1.prevAll= false;
    s1.prevPrevAll= false;
    this.setState(s1);
  }
  handleSent = () => {
    let s1 = {...this.state};
    s1.inbox = false;
    s1.all = false;
    s1.social = false;
    s1.reading = false;
    s1.sent = true;
    s1.prevAll= false;
    s1.prevPrevAll= false;
    this.setState(s1);
  }
  handleReading = (id) => {
    let s1 = {...this.state};
    s1.inbox = false;
    s1.all = false;
    s1.social = false;
    s1.sent = false;
    s1.reading = true;
    s1.itemid = id;
    let pr = s1.emails.find((l) => l.id === id);
    pr.read = true;
    this.setState(s1);
  }
  handlePreviousState = (str) => {
    console.log(str);
    let s1 = {...this.state};
    if (s1.prevAll || s1.prevPrevAll) {
      s1.all = true;
    }
    else if(str === "Inbox"){
      s1.inbox = true;
    }
    else if(str === "Sent"){
      s1.sent = true;
    }
    else if(str === "Social"){
      s1.social = true;
    }
    s1.reading = false;
    s1.itemid = "";
    this.setState(s1);
  }
  handleDelete1 = (id,str) => {
    let s1 = {...this.state};
    let pr = s1.emails.findIndex((g) => g.id === id);
    s1.emails.splice(pr,1);
    if (s1.prevAll || s1.prevPrevAll) {
      s1.all = true;
    }
    else if(str === "Inbox"){
      s1.inbox = true;
    }
    else if(str === "Sent"){
      s1.sent = true;
    }
    else if(str === "Social"){
      s1.social = true;
    }
    s1.reading = false;
    this.setState(s1);
  }

  render(){
    const {emails,all,inbox,social,sent,reading,itemid} = this.state;
    let pr = emails;
    let inEmails = emails.filter((j) => j.folder === "Inbox");
    return (
        <div>
            <NavBar email2 = {emails} />
        <MessagingFolder onAll = {this.handleAll} onInbox = {this.handleInbox} emails1 = {emails} all = {all} inbox = {inbox} social = {social}
        onSocial = {this.handleSocial} onSent = {this.handleSent} sent = {sent} onReading = {this.handleReading} reading = {reading}/>
       <Message reading = {reading} email1 = {emails} id = {itemid} onPreviousState = {this.handlePreviousState}
       onDelete1 = {this.handleDelete1}/>

        </div>
    );
  }


}
export default MessagingApp;
