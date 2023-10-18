import React,{Component} from "react";
class Product extends Component{


    render(){
        const {prod,index,onIncrease,onDecrease} = this.props;
        const {name,code,price,qty} =prod;
        return (
            <div className="col-3 pe-2 text-center colrs1">
                <h5>{name}</h5>
                Code:{code}<br/>
                Price:{price}<br/>
                Quantity:{qty}<br/>
                <button className="btn btn-light bg-light m-2" onClick={()=>onIncrease(index)}>Increase</button>
                {qty>0?<button className="btn btn-light bg-light m-2" onClick={()=>onDecrease(index)}>Decrease</button>:
                <button className="btn btn-light bg-light m-2" disabled onClick={()=>onDecrease(index)}>Decrease</button>}
            </div>
        );
    }

}
export default Product;