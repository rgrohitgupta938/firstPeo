import React,{Component} from "react";
class Book extends Component{

    render(){
        const {book1,index,onIssue} = this.props;
        console.log(index);
        const {name,author} = book1
        return (
            
        <div className="col-5 m-2 text-center bg-danger">
            <h5>{name}</h5>
            {author}<br/>
            <button className="btn btn-white bg-light" onClick={() => onIssue(index)}>Issue</button>
        </div>);
    }
}
export default Book;