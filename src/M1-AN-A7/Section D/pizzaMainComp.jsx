import React, { Component } from "react";
import NavBar from "./navbar";
import MakeDD from "./makeDD";
class PizzaMainComp extends Component {
  state = {
    items: [
      {
        id: "MIR101",
        image: "https://i.ibb.co/SR1Jzpv/mirinda.png",
        type: "Beverage",
        name: "Mirinda",
        desc: "Mirinda",
        veg: "Yes",
      },
      {
        id: "PEP001",
        image: "https://i.ibb.co/3vkKqsF/pepsi-black.png",
        type: "Beverage",
        name: "Pepsi Black Can",
        desc: "Pepsi Black Can",
        veg: "Yes",
      },
      {
        id: "LIT281",
        image: "https://i.ibb.co/27PvTng/lit.png",
        type: "Beverage",
        name: "Lipton Iced Tea",
        desc: "Lipton Iced Tea",
        veg: "Yes",
      },
      {
        id: "PEP022",
        image: "https://i.ibb.co/1M9xDZB/pepsi-new-20190312.png",
        type: "Beverage",
        name: "Pepsi New",
        desc: "Pepsi New",
        veg: "Yes",
      },
      {
        id: "BPCNV1",
        image: "https://i.ibb.co/R0VSJjq/Burger-Pizza-Non-Veg-nvg.png",
        type: "Burger Pizza",
        name: "Classic Non Veg",
        desc: "Oven-baked buns with cheese, peri-peri chicken, tomato & capsicum in creamy mayo",
        veg: "No",
      },
      {
        id: "BPCV03",
        image: "https://i.ibb.co/Xtx43fT/Burger-Pizza-Veg-423-X420-Pixel-1.png",
        type: "Burger Pizza",
        name: "Classic Veg",
        desc: "Oven-baked buns with cheese, tomato & capsicum in creamy mayo",
        veg: "Yes",
      },
      {
        id: "BPPV04",
        image: "https://i.ibb.co/Xtx43fT/Burger-Pizza-Veg-423-X420-Pixel-1.png",
        type: "Burger Pizza",
        name: "Premium Veg",
        desc: "Oven-baked buns with cheese, paneer, tomato, capsicum & red paprika in creamy mayo",
        veg: "Yes",
      },
      {
        id: "DIP033",
        image: "https://i.ibb.co/0mbBzsw/new-cheesy.png",
        type: "Side Dish",
        name: "Cheesy Dip",
        desc: "An all-time favorite with your Garlic Breadsticks & Stuffed Garlic Bread for a Cheesy indulgence",
        veg: "Yes",
      },
      {
        id: "DIP072",
        image: "https://i.ibb.co/fY52zBw/new-jalapeno.png",
        type: "Side Dish",
        name: "Cheesy Jalapeno Dip",
        desc: "A spicy, tangy flavored cheese dip is a an absolute delight with your favourite Garlic Breadsticks",
        veg: "Yes",
      },
      {
        id: "GAR952",
        image: "https://i.ibb.co/BNVmfY9/Garlic-bread.png",
        type: "Side Dish",
        name: "Garlic Breadsticks",
        desc: "Baked to perfection. Your perfect pizza partner! Tastes best with dip",
        veg: "Yes",
      },
      {
        id: "PARCH1",
        image: "https://i.ibb.co/prBs3NJ/Parcel-Nonveg.png",
        type: "Side Dish",
        name: "Chicken Parcel",
        desc: "Snacky bites! Pizza rolls with chicken sausage & creamy harissa sauce",
        veg: "No",
      },
      {
        id: "PARVG7",
        image: "https://i.ibb.co/JHhrM7d/Parcel-Veg.png",
        type: "Side Dish",
        name: "Veg Parcel",
        desc: "Snacky bites! Pizza rolls with paneer & creamy harissa sauce",
        veg: "Yes",
      },
      {
        id: "PATNV7",
        image: "https://i.ibb.co/0m89Jw9/White-Pasta-Nvg.png",
        type: "Side Dish",
        name: "White Pasta Italiano Non-Veg",
        desc: "Creamy white pasta with pepper barbecue chicken",
        veg: "No",
      },
      {
        id: "PATVG4",
        image: "https://i.ibb.co/mv8RFbk/White-Pasta-Veg.png",
        type: "Side Dish",
        name: "White Pasta Italiano Veg",
        desc: "Creamy white pasta with herb grilled mushrooms",
        veg: "Yes",
      },
      {
        id: "DES044",
        image: "https://i.ibb.co/gvpDKPv/Butterscotch.png",
        type: "Dessert",
        name: "Butterscotch Mousse Cake",
        desc: "Sweet temptation! Butterscotch flavored mousse",
        veg: "Yes",
      },
      {
        id: "DES028",
        image: "https://i.ibb.co/nm96NZW/ChocoLava.png",
        type: "Dessert",
        name: "Choco Lava Cake",
        desc: "Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake",
        veg: "Yes",
      },
      {
        id: "PIZVDV",
        image: "https://i.ibb.co/F0H0SWG/deluxeveg.png",
        type: "Pizza",
        name: "Deluxe Veggie",
        desc: "Veg delight - onion, capsicum, grilled mushroom, corn & paneer",
        veg: "Yes",
      },
      {
        id: "PIZVFH",
        image: "https://i.ibb.co/4mHxB5x/farmhouse.png",
        type: "Pizza",
        name: "Farmhouse",
        desc: "Delightful combination of onion, capsicum, tomato & grilled mushroom",
        veg: "Yes",
      },
      {
        id: "PIZVIT",
        image: "https://i.ibb.co/sRH7Qzf/Indian-TandooriPaneer.png",
        type: "Pizza",
        name: "Indi Tandoori Paneer",
        desc: "It is hot. It is spicy. It is oh-soIndian. Tandoori paneer with capsicum, red paprika & mint mayo",
        veg: "Yes",
      },
      {
        id: "PIZVMG",
        image: "https://i.ibb.co/MGcHnDZ/mexgreen.png",
        type: "Pizza",
        name: "Mexican Green Wave",
        desc: "Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno",
        veg: "Yes",
      },
      {
        id: "PIZVPP",
        image: "https://i.ibb.co/cb5vLX9/peppypaneer.png",
        type: "Pizza",
        name: "Peppy Paneer",
        desc: "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika",
        veg: "Yes",
      },
      {
        id: "PIZVVE",
        image: "https://i.ibb.co/gTy5DTK/vegextra.png",
        type: "Pizza",
        name: "Veg Extravaganza",
        desc: "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
        veg: "Yes",
      },
      {
        id: "PIZNCP",
        image: "https://i.ibb.co/b5qBJ9d/cheesepepperoni.png",
        type: "Pizza",
        name: "Chicken Pepperoni",
        desc: "A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese",
        veg: "No",
      },
      {
        id: "PIZNCD",
        image: "https://i.ibb.co/GFtkbB1/ChickenDominator10.png",
        type: "Pizza",
        name: "Chicken Dominator",
        desc: "Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers",
        veg: "No",
      },
      {
        id: "PIZNPB",
        image: "https://i.ibb.co/GxbtcLK/Pepper-Barbeque-OnionC.png",
        type: "Pizza",
        name: "Pepper Barbecue & Onion",
        desc: "A classic favourite with pepper barbeque chicken & onion",
        veg: "No",
      },
      {
        id: "PIZNIC",
        image: "https://i.ibb.co/6Z5wBqr/Indian-Tandoori-ChickenTikka.png",
        type: "Pizza",
        name: "Indi Chicken Tikka",
        desc: "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
        veg: "No",
      },
    ],
    sizes: ["Regular", "Medium", "Large"],
    crusts: [
      "New Hand Tossed",
      "Wheat Thin Crust",
      "Cheese Burst",
      "Fresh Pan Pizza",
      "Classic Hand Tossed",
    ],
    filter: "veg pizza",
    cart: [],
    viewCart: -1,
    itemOpt: [],
    cartItemIds: [],
  };

  handleFilter = (str) => {
    this.setState({ filter: str.toLowerCase() });
  };

  isItemInCart = (itemId) => {
    const { cart } = this.state;
    return cart.some((item) => item.id === itemId);
  };

  handleCart = (id, selectedOptions) => {
    const { items, cart, itemOpt, cartItemIds } = this.state;
    let item = items.find((it) => it.id === id);
    let prevCartId = cartItemIds;

    if (!this.isItemInCart(id)) {
      let newItem = { ...item, ...selectedOptions, qty: 1 };

      if (item.type === "Pizza") {
        if (!selectedOptions.size) {
          alert("Please select a size for the pizza.");
          return;
        }

        if (!selectedOptions.crust) {
          alert("Please select a crust for the pizza.");
          return;
        }
      }

      let newCart = [...cart, newItem];
      let newItemOpt = [...itemOpt, { ...selectedOptions, id }];
      this.setState({
        cart: newCart,
        itemOpt: newItemOpt,
        viewCart: 1,
        cartItemIds: [...prevCartId, id],
      });
    }
  };

  handleDecQty = (id) => {
    const { cart, cartItemIds, viewCart } = this.state;
    let itemIndex = cart.findIndex((crt) => crt.id === id);

    if (itemIndex >= 0) {
      let updatedCart = [...cart];
      updatedCart[itemIndex].qty -= 1;

      if (updatedCart[itemIndex].qty <= 0) {
        let inx = cartItemIds.findIndex((st) => st.id === id);
        cartItemIds.splice(inx, 1);
        updatedCart.splice(itemIndex, 1);
      }
      this.setState({
        cart: updatedCart,
        viewCart: cartItemIds.length === 0 ? -1 : 1,
      });
    }
  };

  handleIncQty = (id) => {
    const { cart } = this.state;
    let itemIndex = cart.findIndex((crt) => crt.id === id);

    if (itemIndex >= 0) {
      let updatedCart = [...cart];
      updatedCart[itemIndex].qty += 1;

      this.setState({ cart: updatedCart });
    }
  };

  handleDD = (id, opt) => {
    const { itemOpt } = this.state;
    let index = itemOpt.findIndex((op) => op.id === id);

    if (index >= 0) {
      let updatedItemOpt = [...itemOpt];
      updatedItemOpt[index] = { ...opt, id };
      this.setState({ itemOpt: updatedItemOpt });
    } else {
      let newItemOpt = [...itemOpt, { ...opt, id }];
      this.setState({ itemOpt: newItemOpt });
    }
  };

  render() {
    const { items, filter, cart, viewCart, itemOpt, cartItemIds } = this.state;
    let products =
      filter !== ""
        ? filter === "veg pizza"
          ? items.filter((it) => it.type === "Pizza" && it.veg === "Yes")
          : filter === "non-veg pizza"
          ? items.filter((it) => it.type === "Pizza" && it.veg === "No")
          : filter === "side dishes"
          ? items.filter((it) => it.type === "Side Dish")
          : filter === "other items"
          ? items.filter((it) => it.type !== "Side Dish" && it.type !== "Pizza")
          : items
        : items;
    return (
      <div className="container">
        <NavBar onMenuChn={this.handleFilter} />
        <div className="row">
          <div className="col-8 border ms-0">
            <div className="row">
              {products.map((prd) => {
                const { veg, desc, name, type, id, image } = prd;
                const selectedOptions = itemOpt.find(
                  (opt) => opt.id === id
                ) || {
                  size: "",
                  crust: "",
                };

                return (
                  <React.Fragment key={id}>
                    <div className="col-6 border text-center">
                      <img
                        src={image}
                        className="p-1"
                        style={{ width: "400px", height: "auto" }}
                        alt={name}
                      />
                      {name}
                      <br />
                      {desc}
                      <br />
                      {type === "Pizza" && (
                        <MakeDD
                          options={{
                            sizes: this.state.sizes,
                            crusts: this.state.crusts,
                          }}
                          selectedOptions={selectedOptions}
                          onOptionChange={(selectedOptions) =>
                            this.handleDD(id, selectedOptions)
                          }
                          disabled={cartItemIds.includes(id)}
                        />
                      )}
                      {!cartItemIds.includes(id) ? (
                        <button
                          className="btn btn-primary btn-sm m-2"
                          onClick={() => this.handleCart(id, selectedOptions)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <React.Fragment>
                          <button
                            className="btn btn-danger btn-sm mt-2 mb-2"
                            onClick={() =>
                              this.handleDecQty(
                                cart.find((cr) => cr.id === id).id
                              )
                            }
                          >
                            -
                          </button>
                          <button
                            className="btn btn-secondary btn-sm mt-2 mb-2"
                            disabled
                          >
                            {cart.find((cr) => cr.id === id).qty}
                          </button>
                          <button
                            className="btn btn-success btn-sm mt-2 mb-2"
                            onClick={() =>
                              this.handleIncQty(
                                cart.find((cr) => cr.id === id).id
                              )
                            }
                          >
                            +
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="col-4 border">
            {viewCart === 1 ? (
              <React.Fragment>
                <div className="row border text-center text-dark fw-bold">
                  <h5 className="text-center">Cart</h5>
                </div>
                {cart.map((crt, index) => (
                  <div className="row border" key={crt.id}>
                    <div className="col-4 mt-5">
                      <img
                        src={crt.image}
                        style={{ width: "100px", height: "auto" }}
                        alt={crt.name}
                      />
                    </div>
                    <div className="col-8">
                      {crt.name}
                      <br />
                      {crt.desc}
                      <br />
                      {crt.size ? crt.size + " | " : ""}
                      {crt.crust ? crt.crust : ""}
                      <br />

                      <button
                        className="btn btn-danger btn-sm mt-2 mb-2"
                        onClick={() => this.handleDecQty(crt.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mt-2 mb-2"
                        disabled
                      >
                        {crt.qty}
                      </button>
                      <button
                        className="btn btn-success btn-sm mt-2 mb-2"
                        onClick={() => this.handleIncQty(crt.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ) : (
              <div className="text-center fw-bold" style={{fontSize: "26px"}}>Cart is empty</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default PizzaMainComp;
