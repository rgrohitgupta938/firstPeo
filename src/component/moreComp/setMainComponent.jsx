import React, { Component } from "react";
import Favorites from "./favorites";
import PicViewer from "./picViewer";
class SetMainComponent extends Component {
  state = {
    pics: [
      "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/545063/pexels-photo-545063.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    favorites: [],
    currentIndex: 0,
  };
  handleCurrentIndex = (inx) => {
    let s1 = {...this.state};
    let st = s1.favorites.findIndex((k) => k === s1.pics[inx]);
    if( st >= 0) return "";
    else{
      s1.favorites.push(s1.pics[inx]);
    }
    this.setState(s1);
}
onDelete = (inx) => {
let s1 =  {...this.state};
s1.favorites.splice(inx,1);
this.setState(s1);
}

nextInx = () => {
  this.setState((prevState) => ({
    currentIndex: prevState.currentIndex === prevState.pics.length - 1 ? prevState.currentIndex : prevState.currentIndex + 1,
  }));
};

backInx = () => {
  this.setState((prevState) => ({
    currentIndex: prevState.currentIndex === 0 ? prevState.currentIndex : prevState.currentIndex - 1,
  }));
};


  render() {
    const { pics, favorites, currentIndex } = this.state;
    return (
      <div className="container mt-3">
        <PicViewer
          pics={pics}
          currentIndex={currentIndex}
          favorites={favorites}
          onAddFavorites = {this.handleCurrentIndex}
        />
        <div className="d-flex justify-content-between mt-2">
          <button className="btn btn-primary btn-lg" onClick={this.backInx}>
            Previous
          </button>
          <button className="btn btn-primary btn-lg" onClick={this.nextInx}>
            Next
          </button>
        </div>
        {favorites.length ===0 ? "" :<Favorites
        onDelete = { this.onDelete}
          favorites={favorites}
        />}
      </div>
    );
  }
}
export default SetMainComponent;
