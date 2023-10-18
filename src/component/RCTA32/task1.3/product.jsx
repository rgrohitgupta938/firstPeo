import React from "react";
function Product(props) {
  let products = props.products;
  return (
    <div>
      <div className="row text-center">
        {products.map((p) => (
          <div
            className="col-3 m-1"
            style={{
              background: "#1affff",
              width: "300px",
            }}
          >
            <h5>{p.name}</h5>
            Code: {p.code}
            <br />
            Price: {p.price}
            <br />
            Quantity : {p.quantity}
            <br />
            <button
              className="btn text-dark m-1"
              onClick={() => props.onCLickQty(1, p.code)}
              style={{ background: "white", borderRadius: "10%" }}
            >
              Increase
            </button>
            <button
              className="btn text-dark m-1"
              onClick={() => props.onCLickQty(-1, p.code)}
              style={{ background: "white", borderRadius: "10%" }}
              disabled={p.quantity === 0 ? true : false}
            >
              Decrease
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Product;
