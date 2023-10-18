import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../../../services/httpService.js";
import auth from "../../../services/authService.js";
class Products extends Component {
  state = {
    products: [],
  };
  async fectchData() {
    let response = await http.get("/productApp/products");
    console.log(response);
    let { data } = response;
    this.setState({ products: data });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fectchData();
  }
  async componentDidMount() {
    this.fectchData();
  }
  handleEdit = (id) => {
    this.props.history.push(`/products/${id}/edit`);
  };
  handleDelete = (id) => {
    this.props.history.push(`/products/${id}/delete`);
  };

  render() {
    const { products } = this.state;
    const user = auth.getUser();
    return (
      <div className="conatiner">
        <h4>Welcome to the Products page</h4>
        {products.map((pr1) => (
          <div className="row" key={pr1.id}>
            <div className="col-2 border">
              <Link to={`/products/${pr1.id}`}>{pr1.id}</Link>
            </div>
            <div className="col-2 border">{pr1.name}</div>
            <div className="col-2 border">{pr1.price}</div>
            {user && user.role === "admin" && (
              <React.Fragment>
                <div className="col-2 border">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => this.handleEdit(pr1.id)}
                  >
                    Edit
                  </button>
                </div>
                <div className="col-2 border">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(pr1.id)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    );
  }
}
export default Products;
