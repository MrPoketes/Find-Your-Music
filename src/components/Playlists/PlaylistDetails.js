import React,{Component} from "react";
import ReactDOM from "react-dom";
import {InputGroup,Button,FormControl, Figure} from "react-bootstrap";
import "../../css/style.css";
export default class PlaylistDetails extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        var title = ReactDOM.findDOMNode(this.refs.title).placeholder;
        var description = ReactDOM.findDOMNode(this.refs.description).placeholder;
        let test = ReactDOM.findDOMNode(this.refs.title).value;
        if(test!==""){
            title = test;
        }
        test = ReactDOM.findDOMNode(this.refs.description).value;
        if(test!==""){
            description=test;
        }
        this.props.updateDetails(title,description);
    }
    render(){
        return(
            <div className="details">
                {/* Playlist Title */}
                <h2 style={{display:"inline",fontSize:"15px"}}>Playlist Name</h2>
                <InputGroup className="mb-3 playlistDetails">
                    <FormControl ref="title"
                    placeholder={this.props.title}
                    aria-label={this.props.title}
                    aria-describedby="basic-addon1"
                    />
                    <InputGroup.Append>
                        <Button variant="success" onClick={this.handleClick}>Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* Playlist Description */}
                <h4 style={{display:"inline",fontSize:"10px"}}>Playlist Description</h4>
                <InputGroup className="mb-3 playlistDetails">
                    <FormControl ref="description"
                    placeholder={this.props.description==="" ? "Enter a description":this.props.description}
                    aria-label={this.props.description}
                    aria-describedby="basic-addon1"
                    />
                    <InputGroup.Append>
                        <Button variant="success" onClick={this.handleClick}>Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* Playlist Owner */}
                <h4 style={{display:"inline",fontSize:"15px"}}>Playlist Owner</h4>
                <InputGroup className="mb-3 playlistDetails">
                    <FormControl disabled={true}
                    placeholder={this.props.owner}
                    aria-label={this.props.owner}
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
        )
    }
}