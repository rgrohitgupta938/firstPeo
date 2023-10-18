import React, { Component } from "react";
class Laptop extends Component{
render(){
    const {laptops} =this.props;
    const { model} = this.props.match.params;
    let laptop1 = laptops.find((lt) => lt.model === model);
    return (
        <div className="container text-center">
            <h4>Model : {laptop1.model}</h4>
            <img src={laptop1.image} />
            <h6>Brand : {laptop1.brand}</h6>
            <h6>RAM : {laptop1.ram}</h6>
            <h6>Processor : {laptop1.processor}</h6>
            <h6>Hard Disk : {laptop1.hardDisk}</h6>
            <h6>Rating : {laptop1.rating}</h6>
        </div>
    );
}
}
export default Laptop;
