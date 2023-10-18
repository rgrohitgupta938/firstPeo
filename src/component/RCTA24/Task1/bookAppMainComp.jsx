import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Book from "./book";
import AllBooks from "./allBooks";
import NewBook from "./newBook";
class BooksAppMainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/books/:genre" component={AllBooks} />
          <Route path="/book/new" component={NewBook} />
          <Route path="/book/:id" component={Book} />
          <Route path="/books?newarrival=yes" component={AllBooks} />
          <Route path="/books" component={AllBooks} />

          <Redirect from="/" to="/books" />
        </Switch>
      </div>
    );
  }
}
export default BooksAppMainComp;
