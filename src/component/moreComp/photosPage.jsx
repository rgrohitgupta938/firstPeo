import React,{Component} from "react";
import PhotoComp from "./photoComp";
class PhotosPage extends Component{
    state = {
        photos: [
            {
                img: "https://picsum.photos/id/1032/240/160",
                like: 23,
                dislikes: 2,
                muOptions: "",
            },
            {
                img: "https://picsum.photos/id/1051/240/160",
                like: 8,
                dislikes: 0,
                muOptions: "",
            },
            {
                img: "https://picsum.photos/id/1079/240/160",
                like: 83,
                dislikes: 37,
                muOptions: "dislike",
            },
            {
                img: "https://picsum.photos/id/1084/240/160",
                like: 19,
                dislikes: 1,
                muOptions: "like",
            },
            {
                img: "https://picsum.photos/id/122/240/160",
                like: 77,
                dislikes: 16,
                muOptions: "like",
            },
            {
                img: "https://picsum.photos/id/164/240/160",
                like: 6,
                dislikes: 3,
                muOptions: "",
            },
        ]
    };

    handleLike = (inx) =>  {
        let s1 = {...this.state};
        let photo = s1.photos[inx];
        let {like,dislikes,muOptions} = photo;
        if(muOptions === "like") {
            like--;
            muOptions = ""
        }else if(muOptions === "dislike"){
            like++;
            dislikes--;
            muOptions = "like";
        }
        else{
            like++;
            muOptions ="like";
        }
        photo.like = like;
        photo.dislikes =  dislikes;
        photo.muOptions = muOptions;
        this.setState(s1);
    }
    handleDislike = (inx) => {
        let s1 = {...this.state};
        let photo = s1.photos[inx];
        let {like,dislikes,muOptions} = photo;
        if(muOptions === "dislike") {
            dislikes--;
            muOptions = ""
        }else if(muOptions === "like"){
            dislikes++;
            like--;
            muOptions = "dislike";
        }
        else{
            dislikes++;
            muOptions ="dislike";
        }
        photo.like = like;
        photo.dislikes =  dislikes;
        photo.muOptions = muOptions;
        this.setState(s1);
    };
    handleDelete = (inx) => {
        let s1 = {...this.state};
        s1.photos.splice(inx,1);
        this.setState(s1);
    }


    render(){
        const { photos} = this.state;
        return (<div className="container">
            <div className="row">
            {photos.map((k,index) => <PhotoComp photo={k} index = {index} onLike={this.handleLike} onDislike={this.handleDislike} onDelete={this.handleDelete}/>)}
            </div>
        </div>);
    }

}
export default PhotosPage;