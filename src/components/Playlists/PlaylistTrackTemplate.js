import React,{Component} from "react";
import {Figure} from "react-bootstrap";
import "../../css/style.css";
export default class PlaylistTrackTemplate extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log(this.props.pos);
        this.props.remove(this.props.pos)
    }
    render(){
        return(
            <div className="playlistTemplate">
                <span>
                <Figure style={{marginRight:"1%"}} onClick={this.handleClick}>
                    <Figure.Image rounded={true} width={45} height={45} src={this.props.image} alt="none"/>
                </Figure>
                <p style={{display:"inline"}}>{this.props.name} - {this.props.title}</p>
                </span>
            </div>
        )
    }
}