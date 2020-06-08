import React from "react";
import {Form,Button} from "react-bootstrap";
import "../../css/style.css";

const PlaylistForm = (props)=>{
    return(
        <Form className="form">
            <Form.Group>
                <Form.Label>Playlist Name</Form.Label>
                <Form.Control type="text" placeholder="Enter playlist name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter playlist description"/>
            </Form.Group>
            {/* <Form.Group>
                <Form.File id="exampleFormControlFile1" label="Upload an image"/>
            </Form.Group> */}
            <Button variant="success" type="submit" size="lg">Submit</Button>
        </Form>
    )
}
export default PlaylistForm;
