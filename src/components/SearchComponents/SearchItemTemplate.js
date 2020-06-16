import React,{Component} from "react";
import {Figure,Button} from "react-bootstrap";
import "../../css/style.css";

export default class SearchItemTemplate extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleListen = this.handleListen.bind(this);
    }
    handleClick(){
        if(this.props.handleAdd!==undefined){
            if(this.props.fullTitle!==undefined && this.props.fullArtists!==undefined){
                this.props.handleAdd(this.props.image,this.props.fullArtists,this.props.fullTitle,this.props.uri,this.props.id,this.props.description);
            }
            else{
                this.props.handleAdd(this.props.image,this.props.title,this.props.name,this.props.uri,this.props.id,this.props.description);
            }
        }
        if(this.props.handleSearchClick!==undefined && this.props.premium!==false){
            this.props.handleSearchClick(this.props.uri);
        }
    }
    handleListen(){
        this.props.handlePlay(this.props.uri);
    }
    render(){
        return(
            <div style={{display:"inline"}}>
            {this.props.premium ?
                <Figure style={{width:this.props.size,height:this.props.size,margin:"1%",marginBottom:"3%"}}>
                <Figure.Image onClick={this.handleClick} rounded={true} roundedCircle={this.props.circle} className="card"
                width={302}
                height={302}
                src={this.props.image}
                alt="None"/>
                <Figure.Caption>
                    <h3 style={{margin:"0",fontSize:this.props.font,color:"white"}}>{this.props.title}</h3>
                    <p style={{fontSize:"10px",color:"white"}}>{this.props.name}</p>
                    {this.props.handlePlay ?
                        <Button style={{padding:"1%"}} variant="success" onClick={this.handleListen}>Listen</Button>:<div></div>
                }
                </Figure.Caption>
            </Figure>:
            <Figure style={{width:this.props.size,height:this.props.size,margin:"1%",marginBottom:"3%"}}>
                <a href={this.props.url}>
                <Figure.Image onClick={this.handleClick} rounded={true} roundedCircle={this.props.circle} className="card"
                width={302}
                height={302}
                src={this.props.image}
                alt="None"/>
                </a>
                <Figure.Caption>
                    <h3 style={{margin:"0",fontSize:this.props.font,color:"white"}}>{this.props.title}</h3>
                    <p style={{fontSize:"10px",color:"white"}}>{this.props.name}</p>
                </Figure.Caption>
            </Figure>
            }
            </div>
        )       
    }
}