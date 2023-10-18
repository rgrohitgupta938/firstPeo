import React, { Component } from "react";
import Book from "./book";
import NavBar from "./navbar";
class LibrarySystem extends Component {
  state = {
    books: [
      { name: "Harry Potter", author: "JK Rowling", issued: false },
      { name: "War and Peace", author: "Leo Tolstoy", issued: false },
      { name: "Malgudi Days", author: "RK Narayan", issued: false },
      { name: "Gitanjali", author: "RN Tagore", issued: false },
    ],
  };

  handleIssue = (index) => {
    let s1 = {...this.state};
    console.log(index);
    s1.books[index].issued = true;
    this.setState(s1);
  }
  chnage = (str) => {
    let s1 = {...this.state};
    let index = s1.books.findIndex((k) => k.name === str);
    s1.books[index].issued = false;
    this.setState(s1);
  }


  render(){
    const { books } = this.state;
    let st = books.filter((j) => j.issued === true);
    console.log(st);
    let st1 = books.filter((j) => j.issued === false);
    console.log(st1);
    return (
    <div className="container">
        <NavBar count={st.length} /> 
        <h4 className="text-center">Books in Library</h4>
        <div className="row">
            {st1.length === 0 ? <h4>Library is Empty</h4> : st1.map((k,index) => <Book book1={k} index ={index} onIssue = {this.handleIssue} />)}
        </div>
        <h5>Issued Books</h5>
        { st.map((l) => <li>{l.name}<button className="btn btn-light" onClick={()=>this.chnage(l.name)}>Return</button></li>)  }
    </div>
    );
  }
}
export default LibrarySystem;
