import React, {Component} from "react";
import {Card} from "react-bootstrap";

class MusicCard extends Component{
    render(){
        return(
            <Card style={{ width: '18rem', height:'18rem',color:"black",margin:"2%",marginTop:"5%"}}>
                    <Card.Img variant="top" src=""/>
                    <Card.Body>
                        <Card.Title>Album Name</Card.Title>
                        <Card.Text>By: Artist Name</Card.Text>
                        <Card.Text>Released: </Card.Text>
                    </Card.Body>
            </Card>
        )
    }

}
export default MusicCard;