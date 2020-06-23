import React,{Component} from "react";
import ReactDOM from "react-dom";
import {InputGroup,FormControl,Button} from "react-bootstrap";

export default class LyricsSearch extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }
    handleClick(){
        var artist = ReactDOM.findDOMNode(this.refs.artist).value;
        var title = ReactDOM.findDOMNode(this.refs.title).value;
        if(artist!=="" && title!==""){
            this.props.search(artist,title);
        }
    }
    handlePress(target){
        var artist = ReactDOM.findDOMNode(this.refs.artist).value;
        var title = ReactDOM.findDOMNode(this.refs.title).value;
        if(target.key==="Enter"){
            if(artist!=="" && title!==""){
                this.props.search(artist,title);
            }
        }
    }
    render(){
        return(
            <div style={{marginTop:"1%"}}>
                <h1>Search for Lyrics</h1>
                <InputGroup className="mb-3" onKeyPress={this.handlePress}>
                    <FormControl style={{fontFamily:'Raleway'}} ref="artist" placeholder="Enter artist name" aria-label="Search" aria-describedby="basic-addon2"/>
                    <FormControl style={{fontFamily:"Raleway"}} ref="title" placeholder="Enter song title" aria-label="Search" aria-describedby="basic-addon2"/>
                </InputGroup>
                <Button style={{fontFamily:"Raleway"}} onClick={this.handleClick} variant="success" size="lg">Search</Button>
            </div>
        )
    }
}