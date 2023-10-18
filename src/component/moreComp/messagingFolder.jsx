import React,{Component} from "react";
class MessagingFolder extends Component{

    render(){
        const {onAll,onInbox,onSocial,onSent,emails1,all,inbox,social,sent,onReading} = this.props;
        let inEmail = emails1.filter((j) => j.folder === "Inbox");
        let soEmail = emails1.filter((j) => j.folder === "Social");
        let seEmail = emails1.filter((j) => j.folder === "Sent");
        return (
            <React.Fragment>
                <div className="w3-sidebar w3-grey w3-bar-block sty">
                    <h3 className="w3-bar-item">Folders</h3>
                    <a href="#" className="w3-bar-item w3-button" onClick={()=>onAll()}>All</a>
                    <a href="#" className="w3-bar-item w3-button" onClick={()=>onInbox()}>Inbox</a>
                    <a href="#" className="w3-bar-item w3-button" onClick={()=>onSocial()}>Social</a>
                    <a href="#" className="w3-bar-item w3-button" onClick={()=>onSent()}>Sent</a>
                </div>
                <div className="sty1">
            {all?emails1.map((k) => {
                return( 
                <div className={k.read ? "row border p-2" : "row border p-2 sty2" } onClick={() => onReading(k.id)}>
                    <div className="col-2">{k.read?<i className="fa fa-envelope-open-o ps-3"></i> : <i className="fa fa-envelope-o ps-3"></i>}</div>
                    <div className="col-4">{k.from}</div>
                    <div className="col-6">{k.subject}</div>
                </div>
                );
  }) : ""} 
           {inbox?inEmail.map((k) => {
                return( 
                <div className={k.read ? "row border p-2" : "row border p-2 sty2" } onClick={() => onReading(k.id)}>
                    <div className="col-2">{k.read?<i className="fa fa-envelope-open-o ps-3"></i> : <i className="fa fa-envelope-o ps-3"></i>}</div>
                    <div className="col-4">{k.from}</div>
                    <div className="col-6">{k.subject}</div>
                </div>
                );
  }) : ""} 
           {social?soEmail.map((k) => {
                return( 
                <div className={k.read ? "row border p-2" : "row border p-2 sty2" } onClick={() => onReading(k.id)}>
                    <div className="col-2">{k.read?<i className="fa fa-envelope-open-o ps-3"></i> : <i className="fa fa-envelope-o ps-3"></i>}</div>
                    <div className="col-4">{k.from}</div>
                    <div className="col-6">{k.subject}</div>
                </div>
                );
  }) : ""} 
          {sent?seEmail.map((k) => {
                return( 
                <div className={k.read ? "row border p-2" : "row border p-2 sty2" } onClick={() => onReading(k.id)}>
                    <div className="col-2">{k.read?<i className="fa fa-envelope-open-o ps-3"></i> : <i className="fa fa-envelope-o ps-3"></i>}</div>
                    <div className="col-4">{k.from}</div>
                    <div className="col-6">{k.subject}</div>
                </div>
                );
  }) : ""}
  
        </div> 
        
            </React.Fragment>
        );
    }
}
export default MessagingFolder;