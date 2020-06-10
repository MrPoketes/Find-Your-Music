import React,{Component} from "react";
import {Figure} from "react-bootstrap";
import "../../css/style.css";

class SearchItemTemplate extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        if(this.props.handleAdd!==undefined){
            this.props.handleAdd(this.props.image,this.props.title,this.props.name,this.props.uri,this.props.id,this.props.description);
        }
    }
    render(){
        return(
            <Figure onClick={this.handleClick} style={{width:this.props.size,height:this.props.size,margin:"1%",marginBottom:"3%"}}>
                <a href={this.props.url}>
                <Figure.Image rounded={true} className="card"
                width={302}
                height={302}
                src={this.props.image}
                alt="None"/>
                </a>
                <Figure.Caption>
                    <h3 style={{margin:"0",fontSize:this.props.font}}>{this.props.title}</h3>
                    <p style={{fontSize:"12px"}}>{this.props.name}</p>
                </Figure.Caption>
            </Figure>
        )       
    }
}
export default SearchItemTemplate;