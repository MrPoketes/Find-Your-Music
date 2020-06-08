import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Form,Button} from "react-bootstrap";
import "../../css/style.css";

export default class PlaylistForm extends Component{
    constructor(props){
        super(props);
        this.state={
            valid:true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        var name = ReactDOM.findDOMNode(this.refs.name).value;
        if(name!==""){
            this.setState({
                valid:true
            })
            // var image = ReactDOM.findDOMNode(this.refs.image).value;
            var description = ReactDOM.findDOMNode(this.refs.description).value;
            this.props.submitForm(name,description);
        }
        else{
            this.setState({
                valid:false
            })
        }
    }
    render(){
        return(
            <div>
                <Form className="form">
                    <Form.Group>
                        <Form.Label>Playlist Name</Form.Label>
                        <Form.Control ref="name" type="text" placeholder="Enter playlist name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref="description" type="text" placeholder="Enter playlist description"/>
                    </Form.Group>
                    {/* <Form.File ref="image" 
                    id="custom-file"
                    label="Custom file input"
                    custom
                    /> */}
                    <Button onClick={this.handleSubmit} variant="success" type="submit" size="lg">Submit</Button>
                </Form>
                {this.state.valid ?
                <div></div>:<h2 style={{color:"red"}}>You must enter the name of playlist</h2>
            }
            </div>
        )
    }
}
