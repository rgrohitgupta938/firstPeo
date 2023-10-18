import React, { Component } from "react";
import http from "../../../services/httpService";
class ManageProducts extends Component {
  state = {
    data: [],
    search: "",
  };
  async fetchProd() {
    let response = await http.get(`/products`);
    let { data } = response;
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fetchProd();
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleAdd = () => {
    this.props.history.push("/addProduct");
  };
  handleEdit = (id) => {
    this.props.history.push(`/product/${id}`);
  };
  handleDelete = (id) => {
    let s1 = { ...this.state };
    this.delProduct(id);
    let inx = s1.data.findIndex((st) => st.id === id);
    s1.data.splice(inx, 1);
    this.setState(s1);
  };
  async delProduct(id) {
    let response = await http.deleteApi(`/products/${id}`);
    console.log(response);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) this.fetchProd();
  }
  render() {
    const { data, search } = this.state;
    const filteredProducts = search
      ? data.filter((pr) =>
          pr.name.toLowerCase().includes(search.toLowerCase())
        )
      : data;
    return (
      <div className="container">
        <button
          className="btn btn-success m-2"
          onClick={() => this.handleAdd()}
        >
          Add a Product
        </button>
        <div className="form-group m-2">
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            onChange={this.handleChange}
            placeholder="Search ..."
            value={search}
          />
        </div>
        <strong className="mt-5">{`Showing products 1-${data.length}`}</strong>
        <div className="row p-1 text-white bg-dark">
          <div className="col-2 border">#</div>
          <div className="col-3 border">Title</div>
          <div className="col-2 border">Category</div>
          <div className="col-2 border">Price</div>
          <div className="col-3 border"></div>
        </div>
        {filteredProducts.map((pr) => (
          <div
            className="row border"
            style={{ backgroundColor: pr.id % 2 === 0 ? "white" : "#ffffe6" }}
          >
            <div className="col-2">{pr.id}</div>
            <div className="col-3">{pr.name}</div>
            <div className="col-2">{pr.category}</div>
            <div className="col-2">{pr.price}</div>
            <div className="col-3">
              <a
                style={{
                  color: "#1a75ff",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={() => this.handleEdit(pr.id)}
                className="p-1"
              >
                Edit
              </a>{" "}
              <a
                onClick={() => this.handleDelete(pr.id)}
                style={{
                  color: "#1a75ff",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                className="p-1"
              >
                Delete
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ManageProducts;
