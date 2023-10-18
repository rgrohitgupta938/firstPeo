import React, { Component } from "react";
class MyBooks extends Component {
  state = {
    books: this.props.addedBooks,
  };
  handleRemoveBook = (id) => {
    let s1 = {...this.state};
    let inx = s1.books.findIndex((st) => st.id === id);
    s1.books.splice(inx,1);
    this.setState(s1);
  }
  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        <div
          className="row justify-content-center"
          style={{
            backgroundColor: "lightskyblue",
            fontWeight: "600px",
            color: "yellow",
            fontSize: "24px",
          }}
        >
          {books.length === 0
            ? "No books are added in MyBooks"
            : "My Books List"}
        </div>
        <div className="container">
          <div className="row m-2">
            {books &&
              books.map((bk) => {
                let { volumeInfo, id } = bk;
                let { title, categories, authors, imageLinks } = volumeInfo;
                return (
                  <div className="col-3 text-center bg-success border border-light">
                    {imageLinks?.smallThumbnail ? (
                      <img
                        src={imageLinks.smallThumbnail}
                        alt={title}
                        className="m-2"
                      />
                    ) : (
                      <img
                        src="/path/to/placeholder-image.jpg"
                        alt="No image available"
                        className="m-2"
                      />
                    )}
                    <br />
                    <strong>{title}</strong>
                    <br />
                    {authors}
                    <br />
                    {categories ? categories : "NA"}
                    <br />
                    <button
                      className="btn btn-secondary btn-sm m-2"
                      onClick={() => this.handleRemoveBook(id)}
                    >
                      {" "}
                      Remove Book from Mybooks
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MyBooks;
