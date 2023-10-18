import React, { Component } from "react";
class PhotoComp extends Component {
  bgColor = (par) =>
    par === "like"
      ? "bg-success"
      : par === "dislike"
      ? "bg-warning"
      : "bg-light";

  render() {
    const { photo, index, onLike, onDislike,onDelete } = this.props;
    const { like, dislikes, img, muOptions } = photo;
    return (
      <div className={"col-4 border text-center " + this.bgColor(muOptions)}>
        <img src={img}></img>
        <br />
        <i
          className={
            muOptions === "like" ? "fas fa-thumbs-up" : "far fa-thumbs-up"
          }
          onClick={() => onLike(index)}
        >
          {like}
        </i>
        <i
          className={
            muOptions === "dislike"
              ? "fas fa-thumbs-down"
              : "far fa-thumbs-down"
          }
          onClick={() => onDislike(index)}
        >
          {dislikes}
        </i>
        <i className="fa fa-trash" onClick={() =>onDelete(index)}></i>
      </div>
    );
  }
}
export default PhotoComp;
