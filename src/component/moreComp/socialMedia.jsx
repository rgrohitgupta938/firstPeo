import React, { Component } from "react";
class SocialMedia extends Component {
  state = {
    posts: [
      {
        postId: 255,
        heading: "World Cup Semi-final",
        postedBy: "Vishal",
        numOfLikes: 45,
        numOfShares: 10,
        txt: "India lost to New Zealand in the world cup. Very Bad.",
      },
      {
        postId: 377,
        heading: "What a final",
        postedBy: "Mohit",
        numOfLikes: 18,
        numOfShares: 4,
        txt: "Was anyone awake to see the final. England won by boundary count.",
      },
      {
        postId: 391,
        heading: "Was it 5 runs on 6 six runs",
        postedBy: "Preeti",
        numOfLikes: 29,
        numOfShares: 7,
        txt: "I feed sorry for New Zealand. If the ball had not hit the bat and no overthrows, New Zealand would have won.",
      },
      {
        postId: 417,
        heading: "Will Dhoni retire",
        postedBy: "Hemant",
        numOfLikes: 66,
        numOfShares: 24,
        txt: "Is this Dhoni's final match. Will be ever see Dhoni playing for India.",
      },
    ],
  };

  incLikes = (inx) => {
    let s1 = {...this.state};
    s1.posts[inx].numOfLikes+=1;
    this.setState(s1);
  }
  incShare = (inx) => {
    let s1 = {...this.state};
    s1.posts[inx].numOfShares+=1;
    this.setState(s1);
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        {posts.map((pos,index) => {
          let { postId, heading, postedBy, numOfLikes, numOfShares, txt } = pos;
         return(
            <div className="col-6 bg-light border p-2">
              <h4>{heading}</h4>
              <h6>Shared By : {postedBy}</h6>
              <p>{txt}</p>
              Likes : {numOfLikes}{" "}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.incLikes(index)}
              >
                Like
              </button>{" "}
              Shared : {numOfShares}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.incShare(index)}
              >
                Share
              </button>
            
          </div>);
        })}
      </div>
    );
  }
}
export default SocialMedia;
