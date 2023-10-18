import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import pic from "./pic1.avif";
import Books from "./books";
import SearchgPage from "./searchPage";
import MyBooks from "./mybooks";
import SettingPage from "./settingPage";
class GoogleBookMainComp extends Component {
  state = {
    addedBooks: [],
    leftPanelCh: {
      printTy: true,
      lang: true,
      fil: true,
      order: true,
      entries:8,
    },
  };
  handleOptionChange = (opt) => {
    console.log(opt);
    this.setState((prevState) => ({
      leftPanelCh: {
        ...prevState.leftPanelCh,
        ...opt,
      },
    }));
  };
  
  render() {
    const {addedBooks,leftPanelCh} = this.state;
    return (
      <React.Fragment>
        <NavBar  leftPanelCh={leftPanelCh}/>

        <Switch>
          <Route path="/books" render={ (props) => <Books {...props} addedBooks={addedBooks} leftPanelCh={leftPanelCh} />} />
          <Route path="/mybooks" render={ (props) => <MyBooks {...props} addedBooks={addedBooks} />} />
          <Route path="/settings" render={ (props) => <SettingPage {...props} leftPanelCh={leftPanelCh} onOptionChange={this.handleOptionChange}  />} />
          <Route path="/" render={ (props) => <SearchgPage {...props} leftPanelCh={leftPanelCh} />} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default GoogleBookMainComp;
