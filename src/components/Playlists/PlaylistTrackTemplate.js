import React,{Component} from "react";
import {Figure} from "react-bootstrap";
import "../../css/style.css";

export default class PlaylistTrackTemplate extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.remove(this.props.pos,this.props.link);
    }
    render(){
        return(
            <div className="playlistTemplate">
                <span>
                <Figure className="figure" style={{marginRight:"1%"}} onClick={this.handleClick}>
                    <div className="remove">
                        <i className="fas fa-times"></i>
                    </div>
                    <Figure.Image rounded={true} width={45} height={45} src={this.props.image} alt="none"/>
                </Figure>
                <p style={{display:"inline"}}>{this.props.name} - {this.props.title}</p>
                </span>
                
            </div>
        )
    }
}