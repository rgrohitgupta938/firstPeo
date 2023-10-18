import React, { Component } from "react";
import Mobile from "./mobile";
class MobileStore extends Component {
  state = {
    mobiles: [
      {
        name: "Redmi 6",
        desc1: "Upto 64GB",
        desc2: "Dual Rear Cam",
        desc3: "3000mAh",
        price: 7499,
      },
      {
        name: "Redmi 3",
        desc1: "Upto 4GB",
        desc2: "Dual Rear Cam",
        desc3: "4230mAh",
        price: 8999,
      },
      {
        name: "Honor 7S",
        desc1: "2GB|16GB",
        desc2: "Face Unlock",
        desc3: "3020mAh",
        price: 5499,
      },
      {
        name: "Samsung J6",
        desc1: "4GB|64GB",
        desc2: "14.22cm HD",
        desc3: "Face Unlock",
        price: 9490,
      },
      {
        name: "Moto One",
        desc1: "4GB|64GB",
        desc2: "Extra 2000 off on Exchange",
        desc3: "",
        price: 13999,
      },
      {
        name: "Nokia 6.1",
        desc1: "3GB|32GB",
        desc2: "Full HD Display",
        desc3: "SD 630",
        price: 6999,
      },
    ],
    cart: [],
  };

  handleBuy = (inx) => {
    let s1 = {...this.state};
    let pr  = s1.mobiles[inx];
    let st = s1.cart.find((n) => n.name === pr.name);
    let pr1 = { name:pr.name,qty:1};
    st ? st.qty+=1 : s1.cart.push(pr1);
    this.setState(s1);   
  };
  remove = (inx) =>{
    let s1 = {...this.state};
    s1.cart[inx].qty === 1 ? s1.cart.splice(inx,1) : s1.cart[inx].qty-=1;
    
    this.setState(s1);
  }

  render() {
    const { mobiles, cart } = this.state;
    return (
      <div className="container">
        <h3 className="text-center">Exciting Deals On Mobile</h3>
        <div className="row m-auto">
          {mobiles.map((k,index) => (
            <Mobile mobile1={k} index = {index} onBuy = {this.handleBuy} />
          ))}
        </div>
        <h4>Cart</h4>
        {cart.length === 0 ? "Cart is Empty" : cart.map((l,index) => (
            <li>{l.name}, quantity:{l.qty}<button className="btn btn-warning btn-square" onClick={()=>this.remove(index)}>Remove From Cart</button></li>
        ))}
        <br/>
        Number of items in cart = {cart.reduce((i,j) => i+=j.qty,0)}<br/>
        Value of cart = {cart.map((item) => {
            const matchmob = mobiles.find(
              (prd) => prd.name === item.name
            );
            return matchmob ? matchmob.price * item.qty : 0;
          })
          .reduce((acc, price) => acc + price, 0)}
      </div>
    );
  }
}
export default MobileStore;
