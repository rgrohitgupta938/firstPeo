import React, { Component } from "react";
import http from "./httpService";
class NewBook extends Component {
  state = {
    errors: {},
    book: {
      author: "",
      name: "",
      description: "",
      blurb: "",
      review: "",
      price: "",
      year: "",
      publisher: "",
      genre: "",
      newarrival: "",
      bestseller: "",
      language: "",
      avgrating: "",
    },
    genreArr: ["Children", "Fiction", "Mystery", "Management"],
    langArr: ["French", "English", "Latin", "Other"],
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.book[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.postData("/booksapp/book", this.state.book);
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  validateAll = () => {
    let {
      name,
      price,
      newarrival,
      description,
      author,
      language,
      bestseller,
      avgrating,
      genre,
      year,
      blurb,
      review,
      publisher,
    } = this.state.book;
    let errors = {};
    errors.name = this.validateName(name);
    errors.author = this.validateAuthor(author);
    errors.description = this.validateDescription(description);
    errors.blurb = this.validateBlurb(blurb);
    errors.review = this.validateReview(review);
    errors.price = this.validatePrice(price);
    errors.year = this.validateYear(year);
    errors.publisher = this.validatePublisher(publisher);
    errors.avgrating = this.validateAvgrating(avgrating);
    errors.genre = this.validateGenre(genre);
    errors.language = this.validateLanguage(language);
    errors.bestseller = this.validateBestseller(bestseller);
    errors.newarrival = this.validateNewarrival(newarrival);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0 ? true : false;
  };
  validateNewarrival = (newarrival) => {
    return !newarrival ? "Select a option" : "";
  };
  validateBestseller = (bestseller) => {
    return !bestseller ? "Select a option" : "";
  };
  validateLanguage = (language) => {
    return !language ? "Select a Language" : "";
  };
  validateGenre = (genre) => {
    return !genre ? "Select a  Genre" : "";
  };
  validateAvgrating = (avgrating) => {
    return !avgrating ? "Avgrating must be entered" : "";
  };
  validatePublisher = (publisher) => {
    return !publisher ? "Publisher must be entered" : "";
  };
  validateYear = (year) => {
    return !year ? "Year must be entered" : "";
  };
  validateName = (name) => {
    return !name ? "Name must be entered" : "";
  };
  validateAuthor = (author) => {
    return !author ? "Author must be entered" : "";
  };
  validateDescription = (description) => {
    return !description ? "Description must be entered" : "";
  };
  validateDescription = (description) => {
    return !description ? "Description must be entered" : "";
  };
  validateBlurb = (blurb) => {
    return !blurb ? "Blurb must be entered" : "";
  };
  validateReview = (review) => {
    return !review ? "Review must be entered" : "";
  };
  validatePrice = (price) => {
    return !price ? "Price must be entered" : "";
  };
  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/books");
  }
  render() {
    const { book, errors, langArr, genreArr } = this.state;
    let {
      name,
      price,
      newarrival,
      description,
      author,
      language,
      bestseller,
      avgrating,
      genre,
      year,
      blurb,
      review,
      publisher,
    } = book;
    return (
      <div className="container text-center">
        <h5 className="mt-5">Create a New Book</h5>
        <div className=" form-group row mt-3">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Name</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.handleChange}
                value={name}
              />
              {errors.name ? (
                <span className="text-danger">{errors.name}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Author</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                onChange={this.handleChange}
                value={author}
              />
              {errors.author ? (
                <span className="text-danger">{errors.author}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Description</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
              {errors.description ? (
                <span className="text-danger">{errors.description}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Blurb</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="blurb"
                name="blurb"
                onChange={this.handleChange}
                value={blurb}
              />
              {errors.blurb ? (
                <span className="text-danger">{errors.blurb}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Review</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="review"
                name="review"
                onChange={this.handleChange}
                value={review}
              />
              {errors.review ? (
                <span className="text-danger">{errors.review}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Price</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                onChange={this.handleChange}
                placeholder="Enter Name"
                value={price}
              />
              {errors.price ? (
                <span className="text-danger">{errors.price}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Year</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                onChange={this.handleChange}
                value={year}
              />
              {errors.year ? (
                <span className="text-danger">{errors.year}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Publisher</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="publisher"
                name="publisher"
                onChange={this.handleChange}
                value={publisher}
              />
              {errors.publisher ? (
                <span className="text-danger">{errors.publisher}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className=" form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2">
            <label>Rating</label>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="avgrating"
                name="avgrating"
                onChange={this.handleChange}
                value={avgrating}
              />
              {errors.avgrating ? (
                <span className="text-danger">{errors.avgrating}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2 text-center">
            <label>Genre</label>
          </div>
          <div className="col-6">
            <div className="form-group">
              <select
                className="form-control"
                name="genre"
                value={genre}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Genre
                </option>
                {genreArr.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {errors.genre ? (
                <span className="text-danger">{errors.genre}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-2"></div>
          <div className="col-2 text-center">
            <label>Language</label>
          </div>
          <div className="col-6">
            <div className="form-group">
              <select
                className="form-control"
                name="language"
                value={language}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select Language
                </option>
                {langArr.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {errors.language ? (
                <span className="text-danger">{errors.language}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="form-group row">
          <div className="col-2"></div>
          <div className="col-2">
            <label>BestSeller</label>
          </div>
          <div className="col-3 text-start">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="bestseller"
                onChange={this.handleChange}
                value="Yes"
                checked={bestseller === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
          </div>
          <div className="col-3 text-start">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="bestseller"
                onChange={this.handleChange}
                value="No"
                checked={bestseller === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-2"></div>
          <div className="col-2">
            <label>NewArrival</label>
          </div>
          <div className="col-3 text-start">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="newarrival"
                onChange={this.handleChange}
                value="Yes"
                checked={newarrival === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
          </div>
          <div className="col-3 text-start">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="newarrival"
                onChange={this.handleChange}
                value="No"
                checked={newarrival === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary m-2"
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default NewBook;
