import React, {Component} from "react";
class Counter extends Component{
   

   
    render() {+
        console.log("Props", this.props);
        const { counter,onDelete,onIncrement } = this.props;
        return (
            <React.Fragment>
            <h5>Counter {counter.alphabet} Count = {counter.count}
            <button className="btn btn-primary btn-sm m-2" onClick={() => onIncrement(counter.id)}>Increment</button>
            <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(counter.id)}>Delete</button></h5>
            </React.Fragment>);
        
    }
}
export default Counter; 