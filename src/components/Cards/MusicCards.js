import React,{Component} from "react";
import CardTemplate from "./CardTemplate";
export default class MusicCard extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(uri){
        this.props.handlePlay(uri);
    }
    render(){
        return(
            <div className="musicCard">
                {this.props.top.items.map((item,i)=>
                <CardTemplate key={i} handleClick={this.handleClick} uri={item.uri} image={item.images} url={item.url}/>
                )}
            </div>
        )
    }
}