import React, { Component } from "react";
import auth from "../../services/authService";
import http from "../../services/httpService";
class ProductDisplay extends Component {
  handleEditProduct = (prodCode) => {
    this.props.history.push(`/newProduct/${prodCode}`);
  };
  handleDelete = async (prodCode) => {
    try {
      let response = await http.deleteApi(`/product/${prodCode}`);
      this.props.history.push("/products");
    } catch (error) {
      console.log("error sending request");
    }
  };
  render() {
    const { data, handleCart } = this.props;
    console.log(data);
    let temp = data.length !== 0 ? data[0] : {};
    let { img, prodCode, ingredients, title, desc, category } = temp;
    console.log(data);
    const user = auth.getUser() || {};
    return (
      <div className="container">
        {user && user.role === "admin" && (
          <React.Fragment>
            <button
              className="btn btn-secondary m-1"
              onClick={() => this.handleEditProduct(prodCode)}
            >
              Edit Product
            </button>
            <button
              className="btn btn-secondary m-1"
              onClick={() => this.handleDelete(prodCode)}
            >
              Delete Product
            </button>
          </React.Fragment>
        )}
        <img src={img} alt="..." width="80%" height="80%" className="mt-4" />
        <h4>{title}</h4>
        <p>{desc}</p>
        <h5>Items in product</h5>
        {ingredients && (
          <ul>
            {ingredients.map((ingredient, index) => (
              <p key={index}>{`- ${ingredient.ingName} : ${ingredient.qty}`}</p>
            ))}
          </ul>
        )}
        {user && user.role !== "admin" && (
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleCart(prodCode)}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
  }
}

export default ProductDisplay;
