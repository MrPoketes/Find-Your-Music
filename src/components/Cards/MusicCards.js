import React,{Component} from "react";
import CardTemplate from "./CardTemplate";
export default class MusicCard extends Component{

    render(){
        return(
            <div className="musicCard">
                {this.props.top.items.map((item,i)=>
                <CardTemplate key={i} albumName={item.title} date={item.release_date} image={item.images} url={item.url}/>
                )}
            </div>
        )
    }
}